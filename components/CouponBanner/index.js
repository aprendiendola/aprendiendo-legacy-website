import React, { Fragment, Component } from 'react';
import Router, { withRouter } from 'next/router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { REFERRAL_COUPONS } from "constants";
import { BannerContainer, BannerInfoContainer, TextSection, CloseIcon } from './styles';
import service from 'services';
import premiumIcon from 'static/images/free-trial-premium.svg';
import closeBanner from 'static/images/close-banner.svg';


const SUBSCRIBED = 'subscribed';
const ENROLLED = 'enrolled';
const SUSPENDED = 'suspended';
const FREEZED = 'freezed';

class Banner extends React.Component {
  state = {
    showBanner: false
  }

  componentDidMount() {
    this.setState({
      showBanner: true
    });
  }

  hideBanner() {
    this.setState({ showBanner: false });
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
                <h3>Vuélvete Premium Gratis</h3>
                <p>Y obtén un descuentazo adicional con el código <span style={{ color: '#87e400' }}>{couponCode.toUpperCase()}</span></p>
              </TextSection>
              <div>
                <button
                  onClick={() => {
                    Router.pushRoute(`/${service.getCountry().countryCode}/pruebalo#pricing`);
                  }
                }
                >Únete Ahora
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
});

export default compose(
  connect(
    mapStateToProps
  ),
)(withRouter(Banner));
