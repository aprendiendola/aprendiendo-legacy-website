import React, { Fragment } from "react";
import { Router } from "routes";
import service from "services";
import DefaultModal from "components/atoms/DefaultModal";
import { connect } from "react-redux";
import { TitleSection, Label, LargeButton } from "components";
import listItemIcon from "assets/images/list-item-icon.svg";
import closeIcon from "assets/images/close-icon.png";
import { setChangePlanModal } from "reducers/auth";
import {
  ChangePlanContainer,
  PlansContainer,
  SubscriptionContainer,
  Tag,
  Header,
  MainTitle,
  PriceContainer,
  MoneySymbol,
  Price,
  MonthlyText,
  Subtitle,
  CurrentPlanLabel,
  StyledButton,
  ButtonLabel,
  DescriptionTitle,
  BenefitsGrid,
  RestrictContainer,
  PremiumLogo
} from "./styles";

const intervalCount = 4;
const accessType = false;

class ChangePlanModal extends React.Component {
  goToSubscriptions = () => {
    const { setChangePlanModal } = this.props;
    setChangePlanModal({});

    Router.pushRoute(
      `/${service.getCountry().countryCode}/suscripcion#precios`
    );
  };

  render() {
    const {
      modalActive,
      onOk,
      showPlans,
      title,
      subTitle,
      toggleActive
    } = this.props;

    return (
      <DefaultModal active={modalActive} removeOverflow fullScreen>
        <ChangePlanContainer className="box">
          <div
            style={{ display: "flex", justifyContent: "flex-end" }}
            onClick={() => toggleActive()}
          >
            <img
              src={closeIcon}
              style={{ width: 15, height: 15, cursor: "pointer" }}
              alt="clos-icon"
            />
          </div>
          <TitleSection
            title={
              showPlans ? "Cámbiate a un Plan Premium y obtenlo todo" : title
            }
            subTitle={!showPlans ? subTitle : ""}
            paddingBottom="48px"
          />
          {!showPlans && (
            <RestrictContainer>
              <PremiumLogo />
              <span
                style={{
                  color: "#626262",
                  fontWeight: "900",
                  textAlign: "center",
                  marginBottom: "10px",
                  fontSize: "20px"
                }}
              >
                Cámbiate a un Plan Premium y obtén{" "}
                <span
                  style={{
                    color: "#0fa3f4",
                    fontWeight: "900"
                  }}
                >
                  acceso ilimitado
                </span>
              </span>
              <LargeButton
                large
                handleClick={this.goToSubscriptions}
                style={{
                  marginBottom: "initial",
                  minWidth: "250px",
                  height: 40,
                  background: "#87e400"
                }}
              >
                <ButtonLabel fontSize="20px" isFeatured isClickable>
                  Mejora tu plan
                </ButtonLabel>
              </LargeButton>
            </RestrictContainer>
          )}
          {showPlans && (
            <PlansContainer>
              <SubscriptionContainer>
                <Tag isFeatured>
                  <Label fontSize="12px" color="#4267b2" weight="black">
                    Recomendado
                  </Label>
                </Tag>
                <Header isFeatured>
                  <MainTitle isFeatured>Pro</MainTitle>
                  <PriceContainer>
                    <MoneySymbol isFeatured>S/</MoneySymbol>
                    <Price style={{ height: "48px" }} isFeatured>
                      {9900 / 100}
                    </Price>
                    <MonthlyText isFeatured>/mes</MonthlyText>
                  </PriceContainer>
                  <Subtitle isFeatured>
                    {intervalCount >= 1
                      ? `Acceso por ${intervalCount} me${
                          intervalCount === 1 ? "s" : "ses"
                        }`
                      : "Acceso limitado"}
                  </Subtitle>
                  {accessType === "freemium" ? (
                    <CurrentPlanLabel>Plan actual</CurrentPlanLabel>
                  ) : (
                    <StyledButton isFeatured>
                      <ButtonLabel isFeatured isClickable>
                        {intervalCount >= 1
                          ? `Vuélvete ${"Pro"}`
                          : "Regístrate"}
                      </ButtonLabel>
                    </StyledButton>
                  )}
                </Header>
              </SubscriptionContainer>
              <SubscriptionContainer>
                <Tag>
                  <Label fontSize="12px" color="#4267b2" weight="black">
                    Recomendado
                  </Label>
                </Tag>
                <Header>
                  <MainTitle>Pro</MainTitle>
                  <PriceContainer>
                    <MoneySymbol>S/</MoneySymbol>
                    <Price style={{ height: "48px" }}>{9900 / 100}</Price>
                    <MonthlyText>/mes</MonthlyText>
                  </PriceContainer>
                  <Subtitle>
                    {intervalCount >= 1
                      ? `Acceso por ${intervalCount} me${
                          intervalCount === 1 ? "s" : "ses"
                        }`
                      : "Acceso limitado"}
                  </Subtitle>
                  {accessType === "freemium" ? (
                    <CurrentPlanLabel>Plan actual</CurrentPlanLabel>
                  ) : (
                    <StyledButton>
                      <ButtonLabel isClickable>
                        {intervalCount >= 1
                          ? `Vuélvete ${"Pro"}`
                          : "Regístrate"}
                      </ButtonLabel>
                    </StyledButton>
                  )}
                </Header>
              </SubscriptionContainer>
              <SubscriptionContainer>
                <Tag>
                  <Label fontSize="12px" color="#4267b2" weight="black">
                    Recomendado
                  </Label>
                </Tag>
                <Header>
                  <MainTitle>Pro</MainTitle>
                  <PriceContainer>
                    <MoneySymbol>S/</MoneySymbol>
                    <Price style={{ height: "48px" }}>{9900 / 100}</Price>
                    <MonthlyText>/mes</MonthlyText>
                  </PriceContainer>
                  <Subtitle>
                    {intervalCount >= 1
                      ? `Acceso por ${intervalCount} me${
                          intervalCount === 1 ? "s" : "ses"
                        }`
                      : "Acceso limitado"}
                  </Subtitle>
                  {accessType === "freemium" ? (
                    <CurrentPlanLabel>Plan actual</CurrentPlanLabel>
                  ) : (
                    <StyledButton>
                      <ButtonLabel isClickable>
                        {intervalCount >= 1
                          ? `Vuélvete ${"Pro"}`
                          : "Regístrate"}
                      </ButtonLabel>
                    </StyledButton>
                  )}
                </Header>
              </SubscriptionContainer>
            </PlansContainer>
          )}
          <DescriptionTitle>Mejora tu plan y obtén:</DescriptionTitle>
          <BenefitsGrid>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: 12 }}>
                <img
                  style={{ paddingBottom: 1 }}
                  src={listItemIcon}
                  alt="listicon"
                />
              </div>
              <div>Acceso ilimitado.</div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: 12 }}>
                <img
                  style={{ paddingBottom: 1 }}
                  src={listItemIcon}
                  alt="listicon"
                />
              </div>
              <div>Videos diarios ilimitados.</div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: 12 }}>
                <img
                  style={{ paddingBottom: 1 }}
                  src={listItemIcon}
                  alt="listicon"
                />
              </div>
              <div>Soporte al cliente.</div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: 12 }}>
                <img
                  style={{ paddingBottom: 1 }}
                  src={listItemIcon}
                  alt="listicon"
                />
              </div>
              <div>Sin anuncios.</div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: 12 }}>
                <img
                  style={{ paddingBottom: 1 }}
                  src={listItemIcon}
                  alt="listicon"
                />
              </div>
              <div>Contacto con el profesor.</div>
            </div>
          </BenefitsGrid>
        </ChangePlanContainer>
      </DefaultModal>
    );
  }
}

const mapDispatchToProps = {
  setChangePlanModal: barrier => setChangePlanModal(barrier)
};

export default connect(
  null,
  mapDispatchToProps
)(ChangePlanModal);
