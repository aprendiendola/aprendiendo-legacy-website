import React, { Fragment, Component } from 'react';
import Router, { withRouter } from 'next/router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { REFERRAL_COUPONS } from "constants";
import { BannerContainer, BannerInfoContainer, TextSection, CloseIcon } from './styles';
import service from 'services';
import premiumIcon from 'static/images/free-trial-premium.svg';
import closeBanner from 'static/images/close-banner.svg';
import { handleCouponBanner } from '../../reducers/coupons';


const SUBSCRIBED = 'subscribed';
const ENROLLED = 'enrolled';
const SUSPENDED = 'suspended';
const FREEZED = 'freezed';

class Banner extends React.Component {
  state = {
    showBanner: false
  }

  componentDidMount() {
    if (!this.props.isCouponBannerViewed || this.props.router.asPath === '/pe/suscripcion') {
      this.setState({
        showBanner: true
      });
    }
  }

  hideBanner() {
    this.setState({ showBanner: false });
    this.props.handleCouponBanner(true);
  }

  render() {
    const { showBanner } = this.state;
    const { couponCode } = this.props;

    const referralCoupons = Object.values(REFERRAL_COUPONS());

    if (referralCoupons.includes(couponCode)) {
      return false;
    }

    if (showBanner && couponCode) {
      return (
        <Fragment>
          <BannerContainer>
            <CloseIcon src={closeBanner} alt="" onClick={() => this.hideBanner()} />
            <BannerInfoContainer>
              <img src={premiumIcon} alt="" />
              <TextSection>
                <h3>¡SOLO POR HOY!</h3>
                <p>Utiliza el cupón <span style={{ color: '#87e400' }}>{couponCode.toUpperCase()} al momento de comprar y obtén un super descuento.</span></p>
              </TextSection>
              <div>
                <button
                  onClick={() => {
                    Router.pushRoute(`/${service.getCountry().countryCode}/pruebalo#pricing`);
                  }
                }
                >USAR
                </button>
              </div>
            </BannerInfoContainer>

          </BannerContainer>
        </Fragment>
      );
    }
    return <div />;
  }
}


const mapStateToProps = ({ coupons }) => ({
  couponCode: coupons.couponCode,
  isCouponBannerViewed: coupons.isCouponBannerViewed,
});

const mapDispatchToProps = {
  handleCouponBanner: bool => handleCouponBanner(bool)
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
)(withRouter(Banner));
