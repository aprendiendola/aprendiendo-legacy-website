import React, { Fragment, Component } from 'react';
import Router from 'next/router';
import { LargeButton } from 'components';
import { DesktopContainer, MobileContainer, MobileContent } from './black-friday';
import service from 'services';
import { setUnFreezeModal } from 'reducers/auth';
import facebookPixel from 'utils/facebook';
import bannerImg from 'assets/images/banner_img.svg';

class Banner extends Component {
  render() {
    const {
      showBanner,
      isSubscribed,
      loggedIn
    } = this.props;

    const actionButtonUrl = loggedIn ? 'perfil?referrals=true' : 'login';
    const subscribedText  = isSubscribed ? 'en tu próximo mes' : 'en tu primer mes';
    const subscribedTextDesktop  = isSubscribed ? 'en tu siguiente pago' : 'en el primer mes de cualquier Plan Premium';

    if (showBanner) {
      return (
        <Fragment>
            <DesktopContainer>
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ textAlign: 'left', width: 370, marginRight: 100 }}>
                    <h3 style={{ fontWeight: 900, fontSize: '34px' }}>Paga hasta S/80 menos {subscribedText}</h3>
                    <div style={{ marginTop: 15 }}>
                      <p style={{ fontSize: 14, fontWeight: 900 }}>Tú ganas</p>
                    </div>
                    <div>
                      <p style={{ fontSize: 14 }}>
                        Por cada amigo que compre un plan con tu link obtendrás <span style={{ color: '#fff', fontWeight: 900 }}>S/20 de descuento</span> y podrás
                        acumular hasta <span style={{ color: '#fff', fontWeight: 900 }}>S/80</span> para usarlos {subscribedTextDesktop}.
                      </p>
                    </div>
                    <div style={{ marginTop: 15 }}>
                      <p style={{ fontSize: 14, fontWeight: 900 }}>Tu amigo también gana</p>
                    </div>
                    <div>
                      <p style={{ fontSize: 14 }}>
                        <span style={{ color: '#fff', fontWeight: 900 }}>S/20 de descuento</span> en su primer mes de cualquier plan.
                      </p>
                    </div>
                    <div style={{ paddingTop: 20 }}>
                      <LargeButton
                        handleClick={() => {
                          facebookPixel.referralClickBanner({ status: true });
                          Router.push(`/${service.getCountry().countryCode}/${actionButtonUrl}`);
                        }}
                        large
                        style={{ background: '#87e400', width: 260, height: 39 }}
                      >
                        Invita a tus amigos
                      </LargeButton>
                    </div>
                  </div>
                  <div>
                    <img src={bannerImg} alt="referrals" />
                  </div>
                </div>
              </div>
            </DesktopContainer>
            <MobileContainer>
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <MobileContent>
                  <div>
                    <h3 style={{ fontWeight: 900 }}>Paga hasta S/80 menos</h3>
                    <p style={{ fontSize: 14, fontWeight: 600 }}>{subscribedText}</p>
                  </div>
                  <div>
                    <LargeButton
                      handleClick={() => {
                        facebookPixel.referralClickBanner({ status: true });
                        Router.push(`/${service.getCountry().countryCode}/${actionButtonUrl}`);
                      }}
                      large
                      style={{ background: '#87e400', maxWidth: 240, maxHeight: 39, padding: '0px 20px' }}>
                      Invita a tus amigos
                    </LargeButton>
                  </div>
                </MobileContent>
              </div>
            </MobileContainer>
        </Fragment>
      );
    }
    return <div />;
  }
}

const mapDispatchToProps = {
  setUnFreezeModal: bool => setUnFreezeModal(bool)
};

const mapStateToProps = ({ auth, courses }) => ({
  token: auth.token,
  user: auth.user,
  userEnrollments: courses.userEnrollments,
});

export default Banner;
