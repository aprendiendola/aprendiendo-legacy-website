import React, { Fragment } from "react";
import { connect } from "react-redux";
import PlanCard from "../planCard";
import { setFinalPrice } from "../../../reducers/checkout";
import { Router } from "routes";
import service from "services";
import { Button } from "components";
import blueCheck from "assets/images/icons/blue-check.svg";
import closeIcon from "assets/images/icons/close-icon.svg";
import { setCouponCode } from "reducers/coupons";
import {
  Container,
  SubscriptionText,
  BenefitList,
  BlueCheck,
  LiText,
  OfferContainer
} from "./styles";

const LiStyle = {
  father: {
    display: "flex",
    marginBottom: "15px",
    alignItems: "baseline"
  }
};

const SubscriptionCard = ({
  id,
  nickname,
  amount,
  isFeatured,
  metadata,
  intervalCount,
  noStyle,
  storePriceToPay,
  user,
  actionButtonText,
  noPrice,
  checkoutRoute
}) => {
  const amountToShow = metadata.monthly_price;
  const newCheckoutRoute = checkoutRoute || "/premium/checkout/";

  return (
    <PlanCard
      key={id}
      title={nickname}
      subtitle={
        <OfferContainer style={{ fontSize: "16px" }}>
          {intervalCount === 1 ? (
            <span>{noPrice ? "Acceso por 1 mes" : "Mensuales"}</span>
          ) : (
            <Fragment>
              <span>
                {noPrice ? "Acceso por" : "Facturado cada"}
                <b
                  style={{
                    color: isFeatured ? "#fff" : "#414042",
                    fontWeight: "500",
                    margin: "0 5px",
                    textTransform: "lowercase"
                  }}
                >
                  {intervalCount} MESES
                </b>
              </span>
              {!noPrice && (
                <span style={{ marginTop: "9px" }}>
                  {"Ahorra"}
                  <b
                    style={{
                      color: isFeatured ? "#fff" : "#414042",
                      fontWeight: "900",
                      margin: "0 5px"
                    }}
                  >
                    S/ {(99 - amountToShow / 100) * intervalCount}
                  </b>
                </span>
              )}
            </Fragment>
          )}
        </OfferContainer>
      }
      price={noPrice ? null : amountToShow / 100}
      isHighlight={isFeatured}
      backgroundSize="375px auto"
      noStyle={noStyle}
      noPrice={noPrice}
    >
      <Container>
        <Button
          style={{
            cursor: "pointer",
            minWidth: "initial",
            padding: "10px 20px",
            margin: "0 auto 25px",
            backgroundColor: isFeatured ? "#87E400" : "#fff",
            border: isFeatured ? "none" : "1px solid #1178f2"
          }}
          onClick={() => {
            storePriceToPay(amount / 100);
            Router.pushRoute(
              `/${service.getCountry().countryCode}${newCheckoutRoute}${id}`
            );
          }}
        >
          <SubscriptionText
            color={isFeatured ? "#fff" : "#1178f2"}
            weight="black"
            isClickable
          >
            {actionButtonText ||
              (user && user.access_type === "freezed"
                ? "Congelar"
                : "Vuélvete Premium")}
          </SubscriptionText>
        </Button>
        {noPrice && (
          <span
            style={{ position: "relative", bottom: "18px", fontSize: "15px" }}
          >
            O bien{" "}
            <a
              onClick={() => {
                storePriceToPay(amount / 100);
                Router.pushRoute(
                  `/${service.getCountry().countryCode}/premium/checkout/${id}`
                );
              }}
            >
              cómpralo ahora
            </a>
          </span>
        )}
        <BenefitList>
          <li style={LiStyle.father}>
            <span style={{ width: "12px", marginRight: "5px" }}>
              <BlueCheck src={blueCheck} />
            </span>
            <LiText>
              Acceso a{" "}
              <b style={{ fontWeight: "900" }}>todos nuestros cursos</b> de tu
              universidad por{" "}
              {intervalCount === 1
                ? `${intervalCount} mes`
                : `${intervalCount} meses`}
              .
            </LiText>
          </li>
          <li style={LiStyle.father}>
            <span style={{ width: "12px", marginRight: "5px" }}>
              <BlueCheck src={blueCheck} />
            </span>
            <LiText>
              <b style={{ fontWeight: "900" }}>Recursos y guías resueltas</b>{" "}
              para descargar.
            </LiText>
          </li>
          <li style={{ display: "flex", alignItems: "baseline" }}>
            <span style={{ marginRight: "5px", width: "12px" }}>
              <BlueCheck
                src={intervalCount === 1 && !noPrice ? closeIcon : blueCheck}
              />
            </span>
            <LiText isBasicPlan={intervalCount === 1 && !noPrice}>
              {noPrice ? (
                <Fragment>
                  Cancela tu Plan Premium cuando no lo necesites.
                </Fragment>
              ) : (
                <Fragment>
                  Se{" "}
                  <b style={{ fontWeight: "900" }}>congela automáticamente</b>{" "}
                  en tus vacaciones.
                </Fragment>
              )}
            </LiText>
          </li>
        </BenefitList>
      </Container>
    </PlanCard>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    token: auth.token,
    user: auth.user
  };
};

const mapDispatchToProps = {
  storePriceToPay: (finalPrice, items) => setFinalPrice(finalPrice, items),
  setDiscountCoupon: coupon => setCouponCode(coupon)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionCard);
