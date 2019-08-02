import React from "react";
import { connect } from "react-redux";
import { setFinalPrice } from "../../../reducers/checkout";
import { setRegisterSource } from "reducers/register";
import { Label } from "components";
import { PACKAGE_PRICE } from "constants";
import { Router } from "routes";
import service from "services";
import facebookPixel from "utils/facebook";
import ReactGA from "react-ga";
import {
  SubscriptionContainer,
  Tag,
  Header,
  MainTitle,
  PriceContainer,
  Price,
  MoneySymbol,
  MonthlyText,
  Subtitle,
  StyledButton,
  ButtonLabel,
  CurrentPlanLabel,
  InformationContainer,
  InfoContent,
  InfoValueContainer,
  InfoValue,
  DividerContainer,
  Divider
} from "./styles";

const APRENDIENDO_PROVIDER = "aprendiendo";

const SubscriptionCardWBenefits = ({
  id,
  nickname,
  freeprice,
  metadata,
  isFeatured,
  intervalCount,
  storePriceToPay,
  benefits,
  accessType,
  checkoutRoute,
  user,
  setRegisterSourceToState
}) => {
  const amountToShow = metadata && Number(metadata.monthly_price);
  const isPackage = metadata && metadata.is_package;
  const isPUPC = metadata && metadata.university_id === "8";
  // TODO: remove hardcoded maxPlanValue
  const maxPlanValue = isPUPC ? 89 : 99;

  const safe =
    !freeprice && (maxPlanValue - amountToShow / 100) * intervalCount;
  const newCheckoutRoute = checkoutRoute || "/premium/checkout/";
  let freemiumText = "Pruébanos";

  if (intervalCount >= 1 && !freeprice) {
    freemiumText = `Comprar`;
  } else if (user) {
    freemiumText = "Seleccionar";
  }

  let packagePrice = null;
  let planName = freeprice ? "Gratis" : nickname;

  if (isPackage) {
    freemiumText = "Comprar";
    packagePrice = PACKAGE_PRICE;
    planName = nickname;
  }

  return (
    <SubscriptionContainer key={id} isFeatured={isFeatured}>
      <Tag isFeatured={isFeatured}>
        <Label fontSize="14px" color="#4267b2" weight="black">
          Recomendado
        </Label>
      </Tag>
      <Header isFeatured={isFeatured}>
        <MainTitle isFeatured={isFeatured}>{planName || "Pro"}</MainTitle>
        <PriceContainer>
          <MoneySymbol isFeatured={isFeatured}>S/</MoneySymbol>
          {packagePrice ? (
            <Price style={{ height: "48px" }} isFeatured={isFeatured}>
              {packagePrice}
            </Price>
          ) : (
            <div>
              <Price style={{ height: "48px" }} isFeatured={isFeatured}>
                {freeprice ? 0 : amountToShow / 100}
              </Price>
            </div>
          )}
        </PriceContainer>
        {packagePrice ? (
          <Subtitle isFeatured={isFeatured}>Por evaluación</Subtitle>
        ) : (
          <Subtitle isFeatured={isFeatured}>
            {intervalCount >= 1 && !freeprice ? "Mensuales" : "-"}
          </Subtitle>
        )}
        {user &&
        !packagePrice &&
        ((user.subscription && user.subscription.stripe_plan === id) ||
          (user.access_type === "freemium" && freeprice)) ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "47px",
              margin: "0 auto 25px"
            }}
          >
            <CurrentPlanLabel>Plan actual</CurrentPlanLabel>
          </div>
        ) : (
          <StyledButton
            isFeatured={isFeatured}
            onClick={() => {
              if (packagePrice) {
                Router.pushRoute(
                  `/${service.getCountry().countryCode}/paquetes/pagar`
                );
                return false;
              }
              if (intervalCount >= 1 && !freeprice) {
                storePriceToPay(amountToShow / 100);
                Router.pushRoute(
                  `/${service.getCountry().countryCode}${newCheckoutRoute}${id}`
                );
              } else if (user) {
                Router.pushRoute(
                  `/${
                    service.getCountry().countryCode
                  }/perfil?subscription=true`
                );
              } else {
                facebookPixel.freemiumInterest({
                  status: true
                });
                ReactGA.ga("send", {
                  hitType: "event",
                  eventCategory: "freemiumInterest",
                  eventAction: "register",
                  eventLabel: "Freemium Interest"
                });
                setRegisterSourceToState("freemium");
                Router.pushRoute(
                  `/${service.getCountry().countryCode}/registro`
                );
              }
            }}
          >
            <ButtonLabel isFeatured={isFeatured} isClickable>
              {freemiumText}
            </ButtonLabel>
          </StyledButton>
        )}
      </Header>
      <InformationContainer>
        <InfoContent style={{ width: "120px" }} hideOnDesktop>
          Renovación Automática
        </InfoContent>
        <InfoValueContainer style={{ width: "100px" }}>
          {packagePrice ? (
            <InfoValue
              hasValue={Boolean(intervalCount >= 1)}
              hasBenefit={false}
            >
              -
            </InfoValue>
          ) : (
            <InfoValue
              hasValue={Boolean(intervalCount >= 1)}
              hasBenefit={false}
            >
              {intervalCount >= 1 && !freeprice
                ? `Cada ${intervalCount > 1 ? `${intervalCount} meses` : "mes"}`
                : "-"}
            </InfoValue>
          )}
        </InfoValueContainer>
      </InformationContainer>
      <InformationContainer>
        <InfoContent style={{ width: "120px" }} hideOnDesktop>
          Ahorro
        </InfoContent>
        <InfoValueContainer style={{ width: "100px" }}>
          {packagePrice ? (
            <InfoValue hasValue={Boolean(safe)} hasBenefit={false}>
              -
            </InfoValue>
          ) : (
            <InfoValue hasValue={Boolean(safe)} hasBenefit={false}>
              {safe > 0 ? (
                <span>
                  Ahorra <span style={{ fontWeight: "900" }}>S/{safe}</span>
                </span>
              ) : (
                "-"
              )}
            </InfoValue>
          )}
        </InfoValueContainer>
      </InformationContainer>
      <DividerContainer>
        <Divider>
          <Label fontSize="20px" weight="black" color="#414042">
            Incluye
          </Label>
        </Divider>
      </DividerContainer>
      {Array.isArray(benefits) &&
        benefits
          .filter(e => e.active)
          .map(benefit => {
            const benefitCheck =
              typeof benefit.value === "boolean"
                ? benefit.value
                : benefit.value === "true";
            return (
              <InformationContainer>
                <InfoContent hideOnDesktop>{benefit.name}</InfoContent>
                <InfoValueContainer>
                  <InfoValue hasBenefit={benefitCheck}>
                    {benefitCheck ? "" : benefit.value}
                  </InfoValue>
                </InfoValueContainer>
              </InformationContainer>
            );
          })}
    </SubscriptionContainer>
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
  setRegisterSourceToState: payload => setRegisterSource(payload)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionCardWBenefits);
