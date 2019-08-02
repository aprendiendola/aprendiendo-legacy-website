/* eslint import/no-unresolved: 0 */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { CustomLink, Paragraph, TitleSection } from 'components';
import { withRouter } from 'next/router';
import LoginForm from 'components/LoginForm';
import { getUrlParams } from 'utils/common';
import FacebookButton from 'components/FacebookButton';
import GoogleButton from 'components/GoogleButton';
import MessageError from 'components/MessageError';
import service from 'services';
import flyingGuy from 'assets/images/flying-guy.svg';
import { SignContainer, FlyingGuy } from '../Register/styles';

import { Router } from 'routes';

import { login, loginFacebook, loginGoogle, authToInitialState } from '../../reducers/auth';

import { getCartContent } from '../../reducers/shoppingCart';

import './styles.scss';

const { pushRoute } = Router;

class Login extends Component {
  state = {
    extraQuery: ''
  }

  componentDidMount() {
    const { clearState, router } = this.props;

    const { referral_id: referralId } = getUrlParams(
      router.asPath
    );

    if (referralId) {
      this.setState({
        extraQuery: `?referral_id=${referralId}`
      });
      localStorage.setItem('referral_id', referralId);
    }

    clearState();
  }

  componentWillReceiveProps(nextProps) {
    const { loginSuccess, redirectToRegister, history } = nextProps;

    if (loginSuccess) {
      const route = history ? history.route : `/${service.getCountry().countryCode}/cursos`;
      pushRoute(route);
    }

    if (redirectToRegister) {
      pushRoute(`/${service.getCountry().countryCode}/registro`);
    }
  }

  signIn = async user => {
    const { login: isAuth } = this.props;
    await isAuth({
      email: user.email,
      password: user.password
    });
  };

  render() {
    const {
      loginFacebook: loginWithFb,
      loginGoogle: loginWithGoogle,
      facebookAppId,
      googleClientId,
      authError,
      loading
    } = this.props;
    const { extraQuery } = this.state;

    return (
      <div className="login-general">
        <SignContainer>
          <FlyingGuy src={flyingGuy} />

          <div className="login-inner">
            {authError && <MessageError error={authError} />}
            <TitleSection
              center
              title="Inicia sesión con"
              extraTitle
              centerOnMobile
              fontSizeMobile="33px"
              style={{ maxWidth: 'initial' }}
              paddingBottom="23px"
            />
            <div className="login-social">
              <div className="login-fb">
                <FacebookButton onLogin={loginWithFb} appId={facebookAppId} />
              </div>
              <div className="login-gl">
                <GoogleButton onLogin={loginWithGoogle} onFailure={() => {}} clientId={googleClientId} />
              </div>
            </div>
            <div className="login-email">
              <h2 className="login-email-title">O con tu correo</h2>
              <LoginForm onSubmit={this.signIn} loading={loading} />
            </div>
            <div className="login-register">
              <Paragraph style={{ fontSize: '16px' }} color="#626262" textAlign="left" marginBottom="30px">
                ¿Aún no tienes cuenta?
                <CustomLink path={`/registro${extraQuery}`}>
                  <span className="email-label-register" style={{ marginLeft: '3px' }} role="presentation">
                    {'Regístrate'}
                  </span>
                </CustomLink>
              </Paragraph>
            </div>
          </div>
        </SignContainer>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, history }) => ({
  authError: auth.authError,
  token: auth.token,
  history: history.lastRoute,
  googleClientId: auth.googleClientId,
  facebookAppId: auth.facebookAppId,
  redirectToRegister: auth.redirectToRegister,
  loginSuccess: auth.userSignIn,
  loading: auth.loading
});

const mapDispatchToProps = {
  clearState: () => authToInitialState(),
  login,
  loginFacebook,
  loginGoogle,
  getCartContent
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(withRouter(Login));
