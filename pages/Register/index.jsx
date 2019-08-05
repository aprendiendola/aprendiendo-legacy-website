import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { CustomLink } from "components";
import Router, { withRouter } from "next/router";
import service from "services";
import facebookPixel from "utils/facebook";
import { getUrlParams } from "utils/common";
import ReactGA from "react-ga";
import RegisterForm from "components/RegisterForm";
import MessageError from "components/MessageError";
import FacebookButton from "components/FacebookButton";
import GoogleButton from "components/GoogleButton";
import flyingGuy from "assets/images/flying-guy.svg";
import { Label, TitleSection, Paragraph } from "components";
import {
  registerActionCreator,
  clearErrorMessages,
  clearUserCreated,
  setRegisterSource
} from "../../reducers/register";
import { login, loginFacebook, loginGoogle } from "../../reducers/auth";
import { SignContainer, FlyingGuy } from "./styles";

import "./styles.scss";

const registerMethods = Object.freeze({
  FACEBOOK: "FACEBOOK",
  GOOGLE: "GOOGLE",
  EMAIL: "EMAIL"
});

class Register extends Component {
  state = {
    universities: [],
    careers: [],
    formInitialValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
      cellphone: "",
      university: "",
      career: "",
      facebookId: "",
      googleId: ""
    },
    registerMethod: null,
    userCredentials: {},
    extraQuery: ""
  };

  componentDidMount() {
    const { clearErrors, router } = this.props;

    const { referral_id: referralId } = getUrlParams(router.asPath);

    if (referralId) {
      this.setState({
        extraQuery: `?referral_id=${referralId}`
      });
    }

    // Router.pushRoute(`/${service.getCountry().countryCode}/exito-freemium`);
    this.loadUniversities();
    clearErrors();
  }

  componentWillReceiveProps(nextProps) {
    const {
      registerSuccess,
      loginSuccess,
      clearRegister,
      socialData,
      history,
      user,
      registerSource,
      setRegisterSourceToState
    } = nextProps;

    if (registerSuccess) {
      this.autoLogin().then(() => clearRegister());
    }

    if (loginSuccess) {
      if (registerSource) {
        facebookPixel.freemiumRegister({
          status: true
        });
        ReactGA.ga("send", {
          hitType: "event",
          eventCategory: "freemiumRegister",
          eventAction: "register",
          eventLabel: "Freemium Register"
        });
        setRegisterSourceToState(null);
      }

      const isPUPC = user && user.university_id === 8;
      const welcomePath = isPUPC ? "/exito-freemium" : "/cursos";
      const route = history
        ? history.route
        : `/${service.getCountry().countryCode}${welcomePath}`;

      Router.pushRoute(route);
    }

    if (socialData) {
      const { formInitialValues } = this.state;
      formInitialValues.name = socialData.name;
      formInitialValues.lastname = socialData.lastName;
      formInitialValues.email = socialData.email;
      formInitialValues.facebookId = socialData.facebookId;
      formInitialValues.googleId = socialData.googleId;

      this.setState({
        formInitialValues,
        registerMethod: socialData.googleId
          ? registerMethods.GOOGLE
          : registerMethods.FACEBOOK
      });
    }
  }

  signUp = async user => {
    const { register, router } = this.props;

    const { referral_id: referralId } = getUrlParams(router.asPath);

    user.referral_id = referralId;

    this.setState({
      userCredentials: user
    });

    await register(user);
  };

  autoLogin = async () => {
    const { userCredentials, registerMethod } = this.state;
    const {
      loginFacebook: loginWithFb,
      loginGoogle: loginWithGoogle,
      login: auth,
      socialData
    } = this.props;

    switch (registerMethod) {
      case registerMethods.GOOGLE:
        await loginWithGoogle({
          googleId: socialData.googleId,
          accessToken: socialData.accessToken,
          profileObj: {
            givenName: socialData.name,
            familyName: socialData.lastName,
            email: socialData.email,
            imageUrl: socialData.avatar
          }
        });
        break;
      case registerMethods.FACEBOOK:
        await loginWithFb({
          userID: socialData.googleId
            ? socialData.googleId
            : socialData.facebookId,
          accessToken: socialData.accessToken,
          first_name: socialData.name,
          email: socialData.email,
          picture: socialData.avatar,
          last_name: socialData.lastName
        });
        break;
      case registerMethods.EMAIL:
        await auth({
          email: userCredentials.email,
          password: userCredentials.password
        });
        break;
      default: // Not register method allowed
    }
  };

  loadUniversities = async () => {
    const { data } = await service.getUniversities();
    this.setState({
      universities: data || []
    });
  };

  loadCareers = async universityId => {
    const { data } = await service.getCareers(universityId);
    this.setState({
      careers: data || []
    });
  };

  registerByEmailText = () => (
    <Paragraph
      style={{ fontSize: "16px" }}
      color="#626262"
      textAlign="left"
      marginBottom="30px"
    >
      O también puedes usar tu{" "}
      <span
        className="email-label-register"
        style={{ marginLeft: "3px" }}
        onClick={() => this.setState({ registerMethod: registerMethods.EMAIL })}
        role="presentation"
      >
        {"Correo"}
      </span>
    </Paragraph>
  );

  clearRegisterOption = () => {
    this.setState({ registerMethod: null });
  };

  isSocial = () => {
    const { registerMethod } = this.state;
    return (
      registerMethod === registerMethods.FACEBOOK ||
      registerMethod === registerMethods.GOOGLE
    );
  };

  render() {
    const {
      universities,
      careers,
      formInitialValues,
      registerMethod,
      extraQuery
    } = this.state;
    const {
      errorMessages,
      loading,
      loginFacebook: loginWithFb,
      loginGoogle: loginWithGoogle,
      facebookAppId,
      googleClientId,
      isCheckoutViewed,
    } = this.props;

    const optionSelected = registerMethod !== null;

    return (
      <div className="register-general">
        <SignContainer>
          <FlyingGuy src={flyingGuy} />
          <div className="register-inner">
            {errorMessages.length > 0 &&
              errorMessages.map(message => (
                <MessageError error={message} key={message} />
              ))}
            <div className="page-heading-register">
              {optionSelected && (
                <TitleSection
                  center
                  title="Regístrate con tu correo"
                  style={{
                    maxWidth: "initial",
                    fontSize: "33px",
                    textAlign: "center"
                  }}
                  extraTitle
                  centerOnMobile
                  fontSizeMobile="33px"
                />
              )}
              {!optionSelected && (
                <Fragment>
                  <TitleSection
                    center
                    title={isCheckoutViewed ? "Regístrate" : "Regístrate y ten tu primera clase GRATIS"}
                    style={{ maxWidth: "initial" }}
                    extraTitle
                    centerOnMobile
                    fontSizeMobile="33px"
                  />
                  <Paragraph
                    fontSize="20px"
                    fontSizeMobile="16px"
                    color="#626262"
                    centerOnMobile
                    marginBottom="42px"
                  >
                    En Aprendiendo.la encontrarás cursos para ayudarte en los
                    examenes de tu universidad.
                  </Paragraph>
                  <Paragraph
                    style={{ fontSize: "16px", width: "100%" }}
                    color="#626262"
                    textAlign="left"
                    centerOnMobile
                    marginBottom="30px"
                  >
                    Puedes registrarte con tus redes sociales
                  </Paragraph>
                </Fragment>
              )}
              {!optionSelected && (
                <div className="login-social-register">
                  <div className="login-fb-register">
                    <FacebookButton
                      onLogin={loginWithFb}
                      appId={facebookAppId}
                    />
                  </div>
                  <div className="login-gl-register">
                    <GoogleButton
                      onLogin={loginWithGoogle}
                      onFailure={() => {}}
                      clientId={googleClientId}
                    />
                  </div>
                </div>
              )}
              <div className="page-subtitle-register">
                {optionSelected ? "" : this.registerByEmailText()}
              </div>
            </div>
            {optionSelected && (
              <RegisterForm
                universities={universities}
                onUniversityChange={this.loadCareers}
                careers={careers}
                onSubmit={this.signUp}
                loading={loading}
                initialValues={formInitialValues}
                isSocial={this.isSocial()}
              />
            )}
            <div className="register-login">
              <Paragraph
                style={{ fontSize: "16px" }}
                color="#626262"
                textAlign="left"
                marginBottom="30px"
              >
                ¿Ya tienes cuenta?
                <CustomLink path={`/login${extraQuery}`}>
                  <span
                    className="email-label-register"
                    style={{ marginLeft: "3px" }}
                    onClick={() =>
                      this.setState({ registerMethod: registerMethods.EMAIL })
                    }
                    role="presentation"
                  >
                    {"Inicia sesión"}
                  </span>
                </CustomLink>
              </Paragraph>
              {optionSelected && (
                <p
                  className="back-text-register"
                  onClick={this.clearRegisterOption}
                  role="presentation"
                >
                  {"Volver"}
                </p>
              )}
            </div>
          </div>
        </SignContainer>
      </div>
    );
  }
}

const mapStateToProps = ({
  register, auth, history, checkout
}) => ({
  errorMessages: register.registerErrorMessages,
  registerSuccess: register.userCreated,
  loading: register.loading,
  registerSource: register.registerSource,
  socialData: auth.socialData,
  googleClientId: auth.googleClientId,
  history: history.lastRoute,
  facebookAppId: auth.facebookAppId,
  loginSuccess: auth.userSignIn,
  user: auth.user,
  isCheckoutViewed: checkout.isCheckoutViewed
});

const mapDispatchToProps = {
  register: user => registerActionCreator(user),
  clearRegister: () => clearUserCreated(),
  clearErrors: () => clearErrorMessages(),
  setRegisterSourceToState: () => setRegisterSource(),
  loginFacebook,
  loginGoogle,
  login
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
