import React, { Component } from 'react';
import Accordion from 'components/Accordion';
import { Alert, CustomLink } from 'components';
import { withRouter } from 'next/router';
import { getUrlParams, withoutAccent } from 'utils/common';
import { connect } from 'react-redux';
import facebookPixel from 'utils/facebook';
import ReactGA from 'react-ga';
import service from 'services';
import CheckoutErrorModal from 'components/CheckoutErrorModal';
import { setDinero, applyPercentDiscount, applyAmountDiscount } from 'utils/dinero';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { Router } from 'routes';
import PAYMENT_METHODS from './consts';
import { ERROR_MESSAGES, CONTACT_NUMBER } from '../../../constants';
import '../styles.scss';
import Heading from './PaymentHeadings';
import CouponForm from './CouponForm';
import CheckoutForm from './CheckoutForm';
import { validateCouponCode, clearCouponError } from '../../../reducers/coupons';
import { REFERRAL_COUPONS } from 'constants';
import { setCouponCode } from 'reducers/coupons';

const { pushRoute } = Router;

class Payment extends Component {
  state = {
    modalActive: false
  };

  componentDidMount() {
    const { user, plan, couponCode } = this.props;
    const newPlan = plan.amount / 100;

    mixpanel.track('InitiateCheckout', {
      content_type: [withoutAccent(plan.nickname)],
      content_category: user.university_name,
      content_ids: [0],
      contents: [withoutAccent(plan.nickname)],
      num_items: 1,
      value: newPlan,
      currency: service.getCountry().currency
    });
    facebookPixel.checkoutStarted({
      content_type: [withoutAccent(plan.nickname)],
      content_category: user.university_name,
      content_ids: [0],
      contents: [withoutAccent(plan.nickname)],
      num_items: 1,
      value: newPlan,
      currency: service.getCountry().currency
    });

    if (couponCode) {
      this.handleCouponSubmit({ couponCode });
    } else {
      this.loadReferredCoupon();
    }
  }

  loadReferredCoupon = () => {
    const { user, setDiscountCoupon } = this.props;
    const hasReferrer = user && Array.isArray(user.referrer) && user.referrer.length > 0;

    const couponCode = REFERRAL_COUPONS().referral20;

    if (hasReferrer) {
      setDiscountCoupon(couponCode);
      this.handleCouponSubmit({ couponCode });
    }
  }

  getDiscountedPrice = () => {
    const { coupon, plan } = this.props;

    let discountedAmount = 0;

    if (coupon.percent_off) {
      discountedAmount = applyPercentDiscount(plan.amount, coupon.percent_off);
    } else {
      discountedAmount = applyAmountDiscount(plan.amount, coupon.amount_off);
    }

    return discountedAmount;
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

  toggleModal = (errorText = false) => {
    const { modalActive } = this.state;
    this.setState({ modalActive: !modalActive, errorText });
  };

  afterSubmit = async response => {
    const { plan, token } = this.props;

    const referredIds = JSON.parse(localStorage.getItem('referredIds'));
    if (referredIds && referredIds.length > 0) {
      await service.applyNextMonthDiscount(token, referredIds, true);
      localStorage.removeItem('referredIds');
      facebookPixel.referralSubscribed({
        status: true
      });
    }
    
    facebookPixel.referralSubscribed({
      content_category: PAYMENT_METHODS.STRIPE,
      content_ids: [0],
      num_items: 1,
      value: plan.amount / 100,
      currency: service.getCountry().currency
    });

    if (response.status === 201) {
      const { data } = response;
      const {
        user, updateUser, router, token
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
      }

      await updateUser(token);

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

  showErrorOnForm(errorText = false) {
    this.toggleModal(errorText);
  }

  renderCouponAlert = (showCouponForm) => {
    const { coupon } = this.props;
    return (
      coupon && (
        <div style={{ marginTop: '10px' }}>
          <Alert fontWeight={600}>
            { showCouponForm ? 
              'Bien hecho, ¡Se ha aplicado el cupón con éxito para tu primer pago de suscripción! A partir del segundo pago se cobrará el precio normal.'
              : 'Bien hecho, ¡Has obtenido un descuento en tu primer pago! Gracias por confiar en nosotros.'
            }
          </Alert>
        </div>
      )
    );
  };

  render() {
    const {
      user,
      couponCode,
      couponError,
      coupon,
      couponSource,
      couponMedium,
      router,
      plan,
      token
    } = this.props;

    const {
      modalActive, couponResponse, loadingCoupon, errorText
    } = this.state;

    const migrate = getUrlParams(router.asPath).migrate !== undefined;

    const couponApplied = coupon
      ? {
        id: coupon.code,
        trackingData: {
          source: couponSource,
          medium: couponMedium
        }
      }
      : null;

    const modalProps = {
      active: modalActive,
      errorText,
      closeModal: () => this.toggleModal()
    };

    let showCouponForm = true;
    const referralCoupons = Object.values(REFERRAL_COUPONS());

    if (referralCoupons.includes(couponCode)) {
      showCouponForm = false;
    }

    return (
      <div className="checkout-payment" style={{ marginTop: migrate ? '20px' : 'initial' }}>
        {!migrate && (
          <div className="payment-header">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="total-price-span">Total a pagar:</span>
              <div>
                <span className="total-price">
                  {service.getCountry().currencySymbol}
                  {coupon ? this.getDiscountedPrice() : setDinero(plan.amount)}
                </span>
                <span className="total-price-before" style={{ visibility: !coupon && 'hidden' }}>
                  {service.getCountry().currencySymbol}
                  {setDinero(plan.amount)}
                </span>
              </div>
            </div>
            {showCouponForm && (
              <div>
                <CouponForm
                  onSubmit={this.handleCouponSubmit}
                  couponCode={couponCode}
                  couponResponse={couponResponse}
                  couponError={couponError}
                  loading={loadingCoupon}
                />
              </div>
            )}
          </div>
        )}
        {this.renderCouponAlert(showCouponForm)}
        <div className="checkout-option">
          <Accordion
            heading={<Heading name="PAYU" setCurrentMethod={() => {}} />}
            content={
              <StripeProvider apiKey={process.env.STRIPE_API_KEY}>
                <div style={{ padding: '16px 5px' }}>
                  <Elements>
                    <CheckoutForm
                      onSubmit={this.onSubmit}
                      planId={plan.id}
                      coupon={couponApplied}
                      user={user}
                      countryCode={service.getCountry().countryCode}
                      afterSubmit={this.afterSubmit}
                      token={token}
                    />
                  </Elements>
                </div>
              </StripeProvider>
            }
            type="checkbox"
            isExpanded
          />
          <div className="checkout-payment-footer">
            <div className="checkout-payment-help checkout-footer-section hide-number">
              <p>¿Necesitas ayuda? Escríbenos</p>
              <p className="whatsapp-number">
                <img src="/static/images/icons/whatsapp@2x.png" alt="whatsapp" />{' '}
                <a href={`https://wa.me/51${CONTACT_NUMBER}`} target="blank">
                  {CONTACT_NUMBER}
                </a>
              </p>
            </div>
            <CustomLink path="/condiciones-de-uso">
              <div className="checkout-payment-help checkout-footer-section">
                <p>
                  <small className="small-text">
                    Al confirmar tu compra aceptas los <a>Términos y condiciones</a>
                  </small>
                </p>
              </div>
            </CustomLink>
          </div>
        </div>

        <CheckoutErrorModal {...modalProps} />
      </div>
    );
  }
}

const mapStateToProps = ({ coupons }) => ({
  couponCode: coupons.couponCode,
  couponError: coupons.couponError,
  coupon: coupons.coupon,
  couponSource: coupons.couponSource,
  couponMedium: coupons.couponMedium
});

const mapDispatchToProps = {
  isValidCouponCode: (couponCode, token) => validateCouponCode(couponCode, token),
  clearCouponErrorMessage: () => clearCouponError(),
  setDiscountCoupon: coupon => setCouponCode(coupon)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Payment));
