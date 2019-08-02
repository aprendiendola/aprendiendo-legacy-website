import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { splitUrl, getUrlParams, withoutAccent } from 'utils/common';
import { Router } from 'routes';
import service from 'services';
import loadingSvg from 'static/images/loading.svg';
import mastercardWhite from 'static/images/icons/mastercard_white.svg';
import visaWhite from 'static/images/icons/visa_white.svg';
import CheckoutForm from './components/CheckoutForm';
import PAYMENT_METHODS from './components/consts';
import { TitleSection } from 'components';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { setDinero, applyPercentDiscount, applyAmountDiscount } from 'utils/dinero';
import CheckoutErrorModal from 'components/CheckoutErrorModal';
import { ERROR_MESSAGES } from '../../constants';
import './styles.scss';
import facebookPixel from 'utils/facebook';
import ReactGA from 'react-ga';
import { checkoutInitialState } from '../../reducers/checkout';
import { updateUser } from 'reducers/auth';
import { updateRoute } from 'reducers/history';
import FreeTrial from './components/FreeTrial';
import CheckoutWrapper from './components/CheckoutWrapper';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import CouponForm from '../PremiumCheckout/components/CouponForm';
import { validateCouponCode, clearCouponError } from '../../reducers/coupons';

const CheckoutCointainer = styled.div`
  ${breakpoint('lg')`
    display: flex;
    justify-content: center;
    align-items: flex-end;
  `}
`;

const TopCheckoutContainer = styled.div`
  width: 82%;
  margin: 0 auto;
  ${breakpoint('md')`
    position: relative;
    top: 20px;
  `}
`;

const TopCheckoutInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${breakpoint('md')`
  flex-direction:row;
  justify-content: space-between;
  `}
`;

const { pushRoute } = Router;

class Checkout extends PureComponent {
  state = {
    plan: null,
    loading: true,
    modalActive: false,
    controlledSubmit: false,
    formError: false,
    formLoading: false,
    loadingCoupon: false,
    couponResponse: ''
  };

  componentDidMount() {
    const { token, router, setRoute } = this.props;

    if (!token) {
      setRoute(router.asPath);
      pushRoute(`/${service.getCountry().countryCode}/login`);
    }

    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }

    const urlParams = splitUrl(router.asPath);
    const planId = urlParams[urlParams.length - 1];

    this.loadPlan(planId);
  }

  loadPlan = async planId => {
    try {
      const response = await service.getPlan(planId);

      if (response.status === 404) {
        pushRoute(`/${service.getCountry().countryCode}/404`);
      }

      this.setState({ plan: response, loading: false });
    } catch (err) {
      return err;
    }
  };

  afterSubmit = response => {
    const { plan } = this.state;
    facebookPixel.addPaymentInfo({
      content_category: PAYMENT_METHODS.STRIPE,
      content_ids: [0],
      num_items: 1,
      value: plan.amount / 100,
      currency: service.getCountry().currency
    });

    if (response.status === 201) {
      const { data } = response;
      const {
        user, updateUserState, router, token
      } = this.props;

      const migrate = getUrlParams(router.asPath).migrate !== undefined;

      if (migrate) {
        facebookPixel.migrate();
      } else {
        mixpanel.track('Payment confirmation', { suscriptionId: data.id });
        facebookPixel.orderCompleted({
          content_category: PAYMENT_METHODS.STRIPE,
          suscription_id: data.id,
          content_ids: [0],
          contents: withoutAccent(plan.nickname),
          content_type: withoutAccent(plan.nickname),
          num_items: 1,
          value: plan.amount / 100,
          currency: service.getCountry().currency
        });
        facebookPixel.freeTrial({
          content_category: PAYMENT_METHODS.STRIPE,
          suscription_id: data.id,
          content_ids: [0],
          contents: withoutAccent(plan.nickname),
          content_type: withoutAccent(plan.nickname),
          num_items: 1,
          value: plan.amount / 100,
          currency: service.getCountry().currency
        });
        ReactGA.plugin.require('ecommerce');
        ReactGA.plugin.execute('ecommerce', 'addItem', {
          id: data.id,
          name: withoutAccent(plan.nickname),
          sku: data.id, // seems to be required
          price: plan.amount / 100,
          category: 'Plan',
          quantity: '1'
        });
        ReactGA.plugin.execute('ecommerce', 'addTransaction', {
          id: data.id,
          affiliation: withoutAccent(plan.nickname),
          revenue: plan.amount / 100,
          shipping: '0',
          tax: '0'
        });
        ReactGA.plugin.execute('ecommerce', 'send');
        ReactGA.ga('send', {
          hitType: 'event',
          eventCategory: 'FreeTrial',
          eventAction: 'click'
        });
      }

      user.access_type = 'subscribed';

      updateUserState(token, user);

      pushRoute(`/${service.getCountry().countryCode}/exito/${withoutAccent(plan.nickname).toLowerCase()}`);
    } else {
      let errorMessage = ERROR_MESSAGES.default_payment_error;

      if (response.status === 409) {
        errorMessage = ERROR_MESSAGES.user_already_subscribed;
      }

      if (response.data) {
        errorMessage = ERROR_MESSAGES[response.data.message]
          ? ERROR_MESSAGES[response.data.message]
          : errorMessage;
      }

      this.showErrorOnForm(errorMessage);
    }
  };

  handleCouponSubmit = async ({ couponCode }) => {
    const { token, isValidCouponCode } = this.props;

    this.setState({
      loadingCoupon: true
    });

    await isValidCouponCode(couponCode, token);

    this.setState({
      loadingCoupon: false
    });
  };

  showErrorOnForm(errorText = false) {
    this.toggleModal(errorText);
  }

  toggleModal = (errorText = false) => {
    const { modalActive } = this.state;
    this.setState({ modalActive: !modalActive, errorText });
  };

  handleFormError = value => {
    this.setState({ formError: value, controlledSubmit: false });
  };

  submitting = value => {
    this.setState({
      formLoading: value
    });
  };

  getDiscountedPrice = () => {
    const { coupon } = this.props;

    const { plan } = this.state;

    let discountedAmount = 0;

    if (coupon.percent_off) {
      discountedAmount = applyPercentDiscount(plan.amount, coupon.percent_off);
    } else {
      discountedAmount = applyAmountDiscount(plan.amount, coupon.amount_off);
    }

    return discountedAmount;
  };

  render() {
    const {
      user,
      token,
      couponCode,
      couponError,
      coupon,
      couponSource,
      couponMedium,
      trialDays
    } = this.props;
    const {
      plan,
      loading,
      modalActive,
      errorText,
      controlledSubmit,
      formError,
      formLoading,
      loadingCoupon,
      couponResponse
    } = this.state;

    const modalProps = {
      active: modalActive,
      errorText,
      closeModal: () => this.toggleModal()
    };

    const couponApplied = coupon
      ? {
        id: coupon.code,
        trackingData: {
          source: couponSource,
          medium: couponMedium
        }
      }
      : null;

    return loading ? (
      <div style={{ textAlign: 'center', padding: '100px 0px' }}>
        <img src={loadingSvg} alt="loading" />
      </div>
    ) : (
      <div className="wrapper-checkout">
        <TitleSection
          title="ESTÁS A UN PASO DE SER PREMIUM"
          titleFontSize="30px"
          dashBorderSize="4px"
          dashBorderWidth="64px"
          paddingTop="20px"
          paddingBottom="0px"
        />
        <div
          style={{
            marginTop: 60
          }}
        >
          <div>
            <TopCheckoutContainer>
              <TopCheckoutInnerContainer>
                <span className="total-price-span-free">Total a pagar:</span>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ textDecoration: 'line-through', color: '#969696', fontSize: '32px' }}>
                    {service.getCountry().currencySymbol}
                    {coupon ? this.getDiscountedPrice() : setDinero(plan.amount)}
                  </span>
                  <span className="total-price" style={{ marginLeft: '10px' }}>
                    {' '}
                    GRATIS
                  </span>
                </div>
                <CouponForm
                  onSubmit={this.handleCouponSubmit}
                  couponCode={couponCode}
                  couponResponse={couponResponse}
                  couponError={couponError}
                  loading={loadingCoupon}
                />
              </TopCheckoutInnerContainer>
            </TopCheckoutContainer>
            <CheckoutCointainer>
              <div>
                <CheckoutWrapper hasError={formError}>
                  <StripeProvider apiKey={process.env.STRIPE_API_KEY}>
                    <div>
                      <div
                        style={{
                          background:
                            'linear-gradient(to right, #4e87d0, #00a2db, #00bad6, #34cec7, #7edfb5)',
                          padding: '15px 30px',
                          color: '#fff',
                          fontSize: '15px',
                          fontWeight: 900,
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <p>Ingresa los datos de tu tarjeta</p>
                        <div style={{ marginLeft: 10, display: 'flex' }}>
                          <img style={{ marginRight: 10 }} src={mastercardWhite} alt="mastercard" />
                          <img src={visaWhite} alt="visa" />
                        </div>
                      </div>
                      <div style={{ padding: '15px 30px' }}>
                        <Elements>
                          <CheckoutForm
                            planId={plan.id}
                            coupon={couponApplied}
                            user={user}
                            countryCode={service.getCountry().countryCode}
                            afterSubmit={this.afterSubmit}
                            token={token}
                            noSubmitButton
                            activeControlledSubmit={controlledSubmit}
                            onFormError={this.handleFormError}
                            submitting={this.submitting}
                            trialDays={trialDays}
                          />
                        </Elements>
                      </div>
                    </div>
                  </StripeProvider>
                </CheckoutWrapper>
              </div>
              <FreeTrial
                planId={plan.id}
                onSubmit={() => this.setState({ controlledSubmit: true })}
                loading={formLoading}
                amount={plan.amount}
                planName={plan.nickname}
                trialDays={trialDays}
              />
            </CheckoutCointainer>
          </div>
        </div>
        <CheckoutErrorModal {...modalProps} />
      </div>
    );
  }
}

const mapStateToProps = ({ auth, checkout, coupons }) => ({
  token: auth.token,
  user: auth.user,
  trialDays: checkout.trialDays !== undefined ? checkout.trialDays : 3,
  finalPrice: checkout.finalPrice,
  finalItems: checkout.finalItems,
  couponCode: coupons.couponCode,
  couponError: coupons.couponError,
  coupon: coupons.coupon,
  couponSource: coupons.couponSource,
  couponMedium: coupons.couponMedium
});

const mapDispatchToProps = {
  checkoutInitialState,
  updateUserState: (token, user) => updateUser(token, user),
  setRoute: route => updateRoute(route),
  isValidCouponCode: (couponCode, token) => validateCouponCode(couponCode, token),
  clearCouponErrorMessage: () => clearCouponError()
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(withRouter(Checkout));
