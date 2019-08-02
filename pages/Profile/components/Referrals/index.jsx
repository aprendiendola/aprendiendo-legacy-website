import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';
import Swal from 'sweetalert2';
import { ErrorModal } from 'components';
import Router from 'next/router';
import { ReferralSuccessModal } from "components";
import { setCouponCode } from 'reducers/coupons';
import { updateUser } from 'reducers/auth';
import { REFERRAL_COUPONS } from 'constants';
import ReferralLinkSection from './components/ReferralLinkSection';
import Conditions from './components/Conditions';
import TopConditions from './components/TopConditions';
import DiscountSection from './components/DiscountSection';
import service from 'services';
import { PageContainer, SectionTitle, SubscriptionSection, SectionSubtitle } from './styles';
import NextPaymentAlert from './components/NextPaymentAlert';
import { MAX_DISCONT_AMOUNT } from "constants";
import facebookPixel from 'utils/facebook';

class Referrals extends Component {
  state = {
    errorModalActive: false,
    shortenLink: '',
    nextPaymentDiscount: null,
    successModalActive: false
  };

  componentDidMount () {
    this.updateUserState();
    this.getBitlyLink();
    this.getNextPaymentAmount();
  }

  closeErrorModal = () => {
    const { errorModalActive } = this.state;

    this.setState({
      errorModalActive: !errorModalActive
    });
  };

  toggleModal = () => {
    const { successModalActive } = this.state;

    this.setState({
      successModalActive: !successModalActive
    });
  };

  handleUpdatePasswordSubmit = async values => {
    const { token } = this.props;

    const response = await service.updatePassword(token, values);

    if (!response.status) {
      ReactGA.ga('send', 'pageview', '/virtual/profile/update-password');
      Swal.fire({
        title: 'Has cambiado tu contraseña',
        type: 'success',
        showCloseButton: true
      });
    } else if (response.status === 500) {
      this.setState({
        errorModalActive: true
      });
    }
    return response.status;
  };

  getBitlyLink = async () => {
    const { user } = this.props;
    if (user) {
      const response = await service.getBitlyLink(user.id);
      
      if(response.id) {
        this.setState({
          shortenLink: response.link
        })
      }
    }
  }

  handleApplyDiscount = async referredIds => {
    const { token, user, setDiscountCoupon } = this.props;

    if(user && !user.subscription) {
      let coupon = '';
      switch (referredIds.length) {
        case 1: coupon = REFERRAL_COUPONS().referral20; break;
        case 2: coupon = REFERRAL_COUPONS().referral40; break;
        case 3: coupon = REFERRAL_COUPONS().referral60; break;
        case 4: coupon = REFERRAL_COUPONS().referral80; break;
      }
      setDiscountCoupon({ code: coupon });
      localStorage.setItem('referredIds', JSON.stringify(referredIds));

      facebookPixel.referralDiscountApplied({
        status: true
      });

      Router.pushRoute(`/${service.getCountry().countryCode}/suscripcion#precios`);
      return false;
    }

    const response = await service.applyNextMonthDiscount(token, referredIds);

    if (this.isObject(response)) {
      if (response.status === 409) {
        Swal.fire({
          title: 'Tienes un descuento aplicado',
          text: 'Ya cuentas con un descuento aplicado para este periodo de facturación.',
          type: 'info',
          showCloseButton: true
        });
        return false;
      }

      if (response.status === 500) {
        Swal.fire({
          title: 'Ups. Ocurrio algo que no estaba planeado!',
          type: 'error',
          showCloseButton: true
        });
        return false;
      }
    }

    facebookPixel.referralDiscountApplied({
      status: true
    });

    this.updateUserState();
    this.getNextPaymentAmount();

    this.setState({
      successModalActive: true
    });
  }

  updateUserState = async () => {
    const { token, updateUserState } = this.props;
    const userResponse = await service.getAuthenticatedUser(token);

    updateUserState(token, userResponse);
  }

  getNextPaymentAmount = async () => {
    const { token, user } = this.props;

    // TODO: CREATE FLOW FOR CANCELLED USERS
    if(user && !user.subscription) {
      return false;
    }

    if(user.subscription.cancellation_date || user.subscription.state === 'cancelled' || user.subscription.state === 'freezed') {
      return false;
    }

    const nextPaymentResponse = await service.getNextPaymentAmount(token);

    if (this.isObject(nextPaymentResponse)) {
      if(nextPaymentResponse.status === 404) {
        Swal.fire({
          title: 'No se encontró la factura del siguiente mes. Tu cuenta podría estar cancelada.',
          type: 'error',
          showCloseButton: true
        });
        return false;
      }
      
      if(nextPaymentResponse.status === 500) {
        Swal.fire({
          title: 'Ups. Ocurrio algo que no estaba planeado!',
          type: 'error',
          showCloseButton: true
        });
        return false;
      }
    }

    const { data } = nextPaymentResponse;

    if (data.regular_amount > data.final_amount) {
      this.setState({
        nextPaymentDiscount: data.regular_amount - data.final_amount
      });
    }
  }

  isObject = function (value) {
    return value && typeof value === 'object' && value.constructor === Object;
  }

  render() {
    const { user } = this.props;
    const { errorModalActive, shortenLink, nextPaymentDiscount, successModalActive } = this.state;

    return (
      <Fragment>
        <PageContainer>
          {nextPaymentDiscount && <NextPaymentAlert amount={nextPaymentDiscount} />}
          <SectionTitle>Referidos</SectionTitle>
          <SubscriptionSection>
            <TopConditions />
            <SectionSubtitle>Tu link de referidos</SectionSubtitle>
            <ReferralLinkSection link={shortenLink} totalReferrals={user.referreds.length} />
            {
              user && user.referreds.length > 0 && (
                <DiscountSection
                  maxDiscountAllowed={MAX_DISCONT_AMOUNT(user.university_id)}
                  referreds={user.referreds}
                  applyDiscount={this.handleApplyDiscount}
                /> 
              )
            }
            {user && <Conditions maxDiscountAllowed={MAX_DISCONT_AMOUNT(user.university_id)}/>}
          </SubscriptionSection>
          <ReferralSuccessModal
            amount={nextPaymentDiscount}
            toggleModal={this.toggleModal}
            modalActive={successModalActive}
          />
          <ErrorModal
            active={errorModalActive}
            closeModal={this.closeErrorModal}
            title="Algo salió mal..."
            subtitle="Ocurrió un error inesperado"
            info="Si no se resuelve, intente de nuevo más tarde o comuníquese con nosotros"
          />
        </PageContainer>
      </Fragment>
    );
  }
}

const mapDispatchToProps = {
  setDiscountCoupon: coupon => setCouponCode(coupon),
  updateUserState: (token, user) => updateUser(token, user)
};

export default connect(
    null,
    mapDispatchToProps
)(Referrals);

