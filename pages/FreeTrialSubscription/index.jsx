import React, { Fragment, Component } from "react";
import loop from "assets/images/Infinito.svg";
import snowMan from "assets/images/snow_man.svg";
import student from "assets/images/Blanquito.svg";
import pig from "assets/images/pig-icon.svg";
import loadingSvg from "assets/images/loading.svg";
import { withRouter } from "next/router";
import service from "services";
import { connect } from "react-redux";
import { Router } from "routes";
import { setCouponCode, validateCouponCode } from "reducers/coupons";
import {
  getUrlParams,
  getLowestPriceFromPlans,
  objectCopy
} from "utils/common";
import {
  Learn,
  Contact,
  SubscriptionPlans,
  TitleSection,
  Button,
  Feedback,
  Label,
  Paragraph,
  CourseFlatList
} from "components";
import { setFinalPrice, setTrialDaysAction } from "../../reducers/checkout";
import {
  EllipseContainer,
  SpaceContainer,
  Rocket,
  ButtonContainer,
  Planets
} from "./styles";

const isFeatured = planSelected => {
  const isMetadataObject = !Array.isArray(planSelected.metadata);
  return isMetadataObject && planSelected.metadata.is_featured === "true";
};

class Subscription extends Component {
  state = {
    plans: [],
    tabPlanSelected: ""
  };

  componentDidMount() {
    Router.pushRoute(`/${service.getCountry().countryCode}/suscripcion`);
    this.loadPlans();

    const { setDiscountCoupon, router, isValidCouponCode, token } = this.props;

    const {
      ref_coupon: discountCoupon,
      utm_source: utmSource,
      utm_medium: utmMedium
    } = getUrlParams(router.asPath);

    if (discountCoupon) {
      setDiscountCoupon({
        code: discountCoupon,
        source: utmSource || "direct",
        medium: utmMedium
      });
    }
    window.addEventListener("load", this.handleLoad);
  }

  componentWillUnmount() {
    window.removeEventListener("load", this.handleLoad);
  }

  handleLoad = () => {
    const { setTrialDays } = this.props;
    if (
      typeof window !== "undefined" &&
      typeof window.google_optimize !== "undefined"
    ) {
      const variant = parseInt(
        window.google_optimize.get(process.env.EXPERIMENT_ID)
      );
      if (variant) {
        setTrialDays(3);
      }
    }
  };

  loadPlans = async () => {
    try {
      const response = await service.getPlans();
      const activePlans = response.data
        .filter(e => e.active)
        .map(e => Object.assign({}, e, { isFeatured: isFeatured(e) }))
        .slice(0, 3);

      const activePlansCopy = objectCopy(activePlans);

      const sortedFeatured = activePlansCopy.sort(
        (x, y) => y.isFeatured - x.isFeatured
      );

      const freemiumPlan = {
        id: "freemium",
        nickname: "Gratis",
        metadata: {
          is_featured: false
        },
        interval_count: 0,
        registerText: "Regístrate",
        freeprice: true,
        object: "plan",
        active: true
      };

      sortedFeatured.push(freemiumPlan);

      const featuredPlan = activePlansCopy.find(e => e.isFeatured);

      this.setState({
        plans: activePlansCopy,
        tabPlanSelected: featuredPlan.id
      });
    } catch (err) {
      return err;
    }
  };

  customTitle = () => {
    const { token, user } = this.props;

    let subtitle = "Todos tus cursos por un pago mensual";

    if (token) {
      subtitle = (
        <p>
          Accede a tus cursos <span style={{ color: "#00afef" }}>GRATIS</span>
        </p>
      );
    }

    return (
      <TitleSection
        paddingTop="70px"
        paddingBottom="37px"
        title="Clases online de refuerzo"
        extraSubtitle={subtitle}
      />
    );
  };

  customSubtitle = () => (
    <Fragment>
      <Paragraph
        fontSize="20px"
        color="#626262"
        textAlign="center"
        margin="auto"
        style={{
          display: "initial",
          maxWidth: "780px",
          textAlign: "center",
          marginBottom: "5px"
        }}
      >
        No esperes más, prueba nuestro plan Básico y mira todas tus
        <strong> clases gratis</strong> por un tiempo limitado, no te quedes y
        rómpela en tus examenes.
      </Paragraph>
    </Fragment>
  );

  handlerTabPlan = id => {
    this.setState({ tabPlanSelected: id });
  };

  showPlans = () => {
    const { plans, tabPlanSelected } = this.state;

    const justBasicPlan = plans.filter(e => e.id === "plan_EgKWzDC043Loao");

    return plans.length > 0 ? (
      <Fragment>
        <SubscriptionPlans
          plans={justBasicPlan}
          tabPlanSelected={tabPlanSelected}
          onTabPlanClick={this.handlerTabPlan}
          actionButtonText="Pruébalo gratis"
          noPrice
          checkoutRoute="/freetrial/checkout/"
        />
      </Fragment>
    ) : (
      <div style={{ textAlign: "center", padding: "100px 0px" }}>
        <img src={loadingSvg} alt="loading" />
      </div>
    );
  };

  render() {
    const { storePriceToPay } = this.props;
    const { plans } = this.state;

    return (
      <Fragment style={{ marginTop: "77px" }}>
        <EllipseContainer hideOnMobile backgroundPositionY="-42px" />
        <Learn
          customTitle={this.customTitle()}
          withButton
          customSubtitle={this.customSubtitle()}
          icon1={{
            iconImg: loop,
            iconTitle: "Acceso a todos tus cursos",
            iconSubtitle:
              "Accede a los mismos videos y materiales que nuestros demás planes."
          }}
          icon2={{
            iconImg: snowMan,
            iconTitle: "Cancela cuando quieras",
            iconSubtitle:
              "Puedes cancelar tu plan Premium cuando no lo necesites."
          }}
          icon3={{
            iconImg: pig,
            iconTitle: "Paga menos, aprende más",
            iconSubtitle: `Deja de pagar S/100 para un examen. Ahora paga S/${getLowestPriceFromPlans(
              plans
            )} por todos.`
          }}
          icon4={{
            iconImg: student,
            iconTitle: "Disponible siempre",
            iconSubtitle:
              "Mira tus clases donde quieras, a la hora que quieras y todas las veces que necesites."
          }}
          styleContainer={{ minHeight: "195px" }}
          hideBackground
        />

        <ButtonContainer>
          <Button
            onClick={() => {
              document.querySelector("#pricing").scrollIntoView({
                block: "start",
                behavior: "smooth"
              });
            }}
            style={{ background: "#87e400" }}
          >
            <Label weight="black" fontSize="20px" color="#fff" isClickable>
              Accede gratis
            </Label>
          </Button>
        </ButtonContainer>
        <Feedback />
        <div
          id="pricing"
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative"
          }}
        >
          {this.showPlans()}
          <CourseFlatList defaultSelectedUniversityId={2} />
          <SpaceContainer>
            <Planets />
            <Rocket />
          </SpaceContainer>
        </div>
        <Contact
          title="¿Tienes alguna pregunta?"
          paragraph1="No te quedes con la duda,"
          paragraph2="te responderemos con gusto."
        />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    token: auth.token,
    user: auth.user
  };
};

const mapDispatchToProps = {
  setTrialDays: trialDays => setTrialDaysAction(trialDays),
  storePriceToPay: (finalPrice, items) => setFinalPrice(finalPrice, items),
  setDiscountCoupon: coupon => setCouponCode(coupon),
  isValidCouponCode: (couponCode, token) =>
    validateCouponCode(couponCode, token)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Subscription));
