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
  isExperimentRunning
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
  CustomLink,
  CourseFlatList
} from "components";
import Experiment from "components/Experiment";
import { setFinalPrice } from "../../reducers/checkout";
import {
  MainSection,
  LearnTitle,
  Strong,
  SpaceContainer,
  Rocket,
  ButtonContainer,
  Planets,
  ContactContainer
} from "./styles";

const { pushRoute } = Router;

const UNIVERSITY_PUPC_ID = 8;

const isFeatured = planSelected => {
  const isMetadataObject = !Array.isArray(planSelected.metadata);
  return (
    isMetadataObject &&
    planSelected.metadata &&
    planSelected.metadata.is_featured === "true"
  );
};

const isPackage = planSelected => {
  const isMetadataObject = !Array.isArray(planSelected.metadata);
  return (
    isMetadataObject &&
    planSelected.metadata &&
    planSelected.metadata.is_package === "true"
  );
};

const isPUPC = planSelected => {
  const isMetadataObject = !Array.isArray(planSelected.metadata);
  return (
    isMetadataObject &&
    planSelected.metadata &&
    parseInt(planSelected.metadata.university_id) === 8
  );
};

const sortByOrder = (x, y) => {
  const xIsMetadataObject = !Array.isArray(x.metadata);
  const yIsMetadataObject = !Array.isArray(y.metadata);

  if (xIsMetadataObject && x.metadata && yIsMetadataObject && y.metadata) {
    return Number(x.metadata.order) - Number(y.metadata.order);
  }
  return 0;
};

class Subscription extends Component {
  state = {
    plans: [],
    tabPlanSelected: ""
  };

  componentDidMount() {
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
  }

  loadPlans = async () => {
    const isExperiment = await isExperimentRunning();
    try {
      const response = await service.getInhousePlans();
      const activePlans = this.plansFilter(response.data);
      let sortedPlans = activePlans.sort((a, b) => sortByOrder(a, b));

      if (isExperiment) {
        sortedPlans = sortedPlans.filter(
          e =>
            (e.metadata && e.metadata.is_experiment === "true") ||
            (e.metadata &&
              e.metadata.is_experiment === "true" &&
              e.provider_name === "aprendiendo") ||
            e.provider_name === "aprendiendo"
        );
      } else {
        sortedPlans = sortedPlans.filter(
          e => e.metadata && e.metadata.is_experiment !== "true"
        );
      }

      const featuredPlan = sortedPlans.find(e => isFeatured(e));

      this.setState({
        plans: sortedPlans,
        tabPlanSelected: featuredPlan.provider_id
      }, () => {
        if (this.props.router.asPath.search("#pricing")) {
          document.querySelector("#pricing").scrollIntoView();
        }
      });
    } catch (err) {
      return err;
    }
  };

  plansFilter = plans => {
    const { user } = this.props;

    let activePlans = [];

    if (user) {
      if (user.university_id === UNIVERSITY_PUPC_ID) {
        activePlans = plans
          .filter(
            e =>
              e.active === 1 && (isPUPC(e) || e.provider_name === "aprendiendo")
          )
          .map(e => Object.assign({}, e, { isFeatured: isFeatured(e) }));
      } else {
        activePlans = plans
          .filter(
            e => e.active === 1 && !isPUPC(e) && e.provider_name === "stripe"
          )
          .map(e => Object.assign({}, e, { isFeatured: isFeatured(e) }));

        const activePackages = plans.filter(
          e => e.active === 1 && isPackage(e)
        );
        if (activePackages.length > 0) {
          activePlans = [...activePlans, activePackages[0]];
        }
      }
    } else {
      activePlans = plans
        .filter(e => {
          return (
            e.active === 1 && (!isPUPC(e) || e.provider_name === "aprendiendo")
          );
        })
        .map(e => Object.assign({}, e, { isFeatured: isFeatured(e) }));
    }

    return activePlans;
  };

  customTitle = () => {
    const { token, user } = this.props;

    let extraSubtitle = "Todos tus cursos por un pago mensual";

    if (token) {
      const university = (
        <CustomLink
          path={`/cursos/search?university=${user.university_shortname}`}
          key={user.university_id}
        >
          <a style={{ color: "#00afef" }}>{user.university_shortname}</a>
        </CustomLink>
      );
      extraSubtitle = (
        <p>Todos tus cursos de la {university} por un pago mensual</p>
      );
    }

    return (
      <TitleSection
        paddingTop="70px"
        paddingBottom="37px"
        title="Como Netflix"
        extraSubtitle={extraSubtitle}
        subTitle={this.customSubtitle()}
      />
    );
  };

  customSubtitle = () => {
    const { token, user } = this.props;
    const { plans } = this.state;

    if (plans.length === 0) return;

    let university = "tu universidad";

    if (token) {
      university = `la ${user && user.university_shortname}`;
    }

    const isPUPC = user && user.university_id === UNIVERSITY_PUPC_ID;

    const lowestPrice = getLowestPriceFromPlans(plans, !isPUPC);

    const message = () => {
      return lowestPrice ? (
        ` desde S/${lowestPrice} mensuales`
      ) : (
        <span style={{ fontWeight: 900 }}> {isPUPC ? "gratis" : ""}</span>
      );
    };

    return (
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
          {`Accede a todos los cursos disponibles 
            para ${university}`}
          {message()}
        </Paragraph>
      </Fragment>
    );
  };

  handlerTabPlan = id => {
    this.setState({ tabPlanSelected: id });
  };

  showPlans = () => {
    const { plans, tabPlanSelected } = this.state;

    return plans.length > 0 ? (
      <Fragment>
        <SubscriptionPlans
          title={
            <Fragment>
              Los planes Premium incluyen
              <b
                style={{ color: "#0fa3f4", fontWeight: "900", margin: "0 5px" }}
              >
                todos los cursos
              </b>
            </Fragment>
          }
          customSubtitle={
            <p style={{ margin: "15px auto 30px", textAlign: "center" }}>
              <b
                role="presentation"
                style={{
                  color: "#0fa3f4",
                  fontWeight: "900",
                  margin: "0 5px",
                  cursor: "pointer"
                }}
                onClick={() => {
                  document.querySelector("#courses-included").scrollIntoView({
                    block: "start",
                    behavior: "smooth"
                  });
                }}
              >
                Ver cursos incluidos
              </b>
            </p>
          }
          plans={plans}
          tabPlanSelected={tabPlanSelected}
          onTabPlanClick={this.handlerTabPlan}
          noDash
        />
      </Fragment>
    ) : (
      <div style={{ textAlign: "center", padding: "100px 0px" }}>
        <img src={loadingSvg} alt="loading" />
      </div>
    );
  };

  render() {
    const { user } = this.props;
    const { plans } = this.state;

    const isPUPC = user && user.university_id === UNIVERSITY_PUPC_ID;

    const subscribed = user && user.access_type === "subscribed";

    let buttonPath = subscribed ? "/cursos" : "/suscripcion#precios";
    let buttonLabel = subscribed ? "Mira tus cursos" : "Mira los planes";

    if (!user) {
      buttonPath = "/registro";
      buttonLabel = "Regístrate Gratis";
    }

    return (
      <div>
        <MainSection>
          {this.customTitle()}
          <CustomLink path={buttonPath}>
            <Button style={{ backgroundColor: "#87e400" }}>
              <Label weight="black" fontSize="20px" isClickable>
                {buttonLabel}
              </Label>
            </Button>
          </CustomLink>
        </MainSection>
        <Learn
          title={
            <LearnTitle>
              ¿Por qué ser
              <Strong>Premium</Strong>?
            </LearnTitle>
          }
          withButton
          icon1={{
            iconImg: loop,
            iconTitle: "Acceso a todos tus cursos",
            iconSubtitle:
              "Accede a los mismos videos y materiales que nuestros demás planes."
          }}
          icon2={{
            iconImg: snowMan,
            iconTitle: "Congela cuando quieras",
            iconSubtitle:
              "Puedes congelar tu Plan Premium cuando no lo necesites."
          }}
          icon3={{
            iconImg: pig,
            iconTitle: "Paga menos, aprende más",
            iconSubtitle: `Deja de pagar S/100 para un examen. Ahora paga S/${getLowestPriceFromPlans(
              plans,
              !isPUPC
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
        <div id="precios" style={{ height: 10, marginBottom: 10 }} />
        <div
          id="pricing"
          style={{
            marginTop: 60,
            display: "flex",
            flexDirection: "column",
            position: "relative"
          }}
        >
          {this.showPlans()}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "14px",
              padding: 16,
              textAlign: "center"
            }}
          >
            <p style={{ maxWidth: 600 }}>
              *Los planes Pro y Básico se renuevan automáticamente (excepto los
              seminarios). Puedes cancelar tu suscripción desde tu perfil hasta
              un día antes de vencer.
            </p>
          </div>
          <CourseFlatList
            defaultSelectedUniversityId={(user && user.university_id) || 1}
            callToActionTitle={
              <p
                style={{ fontWeight: 900, fontSize: "22px", color: "#626262" }}
              >
                Ya lo sabes,
                <b
                  style={{
                    color: "#0fa3f4",
                    fontWeight: "900",
                    margin: "0 5px"
                  }}
                >
                  elige tu plan
                </b>
                y comienza a aprender
              </p>
            }
            callToAction="Vuélvete Premium Gratis"
          />
          <Feedback />
          <SpaceContainer>
            <Planets />
            <Rocket />
          </SpaceContainer>
        </div>
        <Contact
          title="¿Tienes dudas?"
          paragraph1="Mira nuestra sección de"
          paragraph2="preguntas frecuentes."
        />
      </div>
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
  storePriceToPay: (finalPrice, items) => setFinalPrice(finalPrice, items),
  setDiscountCoupon: coupon => setCouponCode(coupon),
  isValidCouponCode: (couponCode, token) =>
    validateCouponCode(couponCode, token)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Subscription));
