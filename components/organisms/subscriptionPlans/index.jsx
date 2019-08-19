import React, { Fragment } from "react";
import dynamic from "next/dynamic";
import {
  Paragraph,
  TitleSection,
  Label,
  SubscriptionCardWBenefits
} from "components";
import Select from "components/Select";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import { setFinalPrice } from "../../../reducers/checkout";
import { isItFeatured } from "utils/common";
import {
  Container,
  ContentContainer,
  PlansContainer,
  MainContent,
  HidePlanOnMobile,
  ShowTabPlanOnMobile,
  TabHeader,
  Tab
} from "./styles";

import mock from "./mock";

const APRENDIENDO_PROVIDER = "aprendiendo";
const DescriptionPlan = dynamic(() => import("./components/DescriptionPlan"));

const renderPlanSelected = (
  plans,
  tabPlanSelected,
  actionButtonText,
  noPrice,
  checkoutRoute,
  accessType
) => {
  const planSelected = plans.find(
    ({ provider_id }) => provider_id === tabPlanSelected
  );

  if (!planSelected) return null;
  return (
    <div>
      <SubscriptionCardWBenefits
        id={planSelected.provider_id}
        nickname={planSelected.nickname}
        amount={planSelected.amount}
        metadata={planSelected.metadata}
        isFeatured={isItFeatured(planSelected.metadata)}
        intervalCount={planSelected.interval_count}
        actionButtonText={actionButtonText}
        noPrice={noPrice}
        checkoutRoute={checkoutRoute}
        benefits={planSelected.features}
        freeprice={planSelected.provider_name === APRENDIENDO_PROVIDER}
        accessType={accessType}
        noStyle
      />
    </div>
  );
};

const getPlanWithMoreFeatures = plans => {
  let maxFeaturesPlan = plans[0];

  const maxFeaturesCount = maxFeaturesPlan.features
    ? maxFeaturesPlan.features.length
    : 0;

  plans.forEach(element => {
    if (!element.features) return;
    if (element.features.length > maxFeaturesCount) {
      maxFeaturesPlan = element;
    }
  });

  return maxFeaturesPlan;
};

const SubscriptionPlans = ({
  title,
  subTitle,
  plans,
  tabPlanSelected,
  onTabPlanClick,
  actionButtonText,
  noPrice,
  checkoutRoute,
  customSubtitle,
  subtitleStringOnly,
  accessType,
  weightSubTitle,
  noDash
}) => {
  return (
    <Container>
      <ContentContainer>
        <MainContent>
          <TitleSection
            title={
              title || (
                <Fragment>
                  Elige el
                  <b
                    style={{
                      color: "#0fa3f4",
                      fontWeight: "900",
                      margin: "0 5px"
                    }}
                  >
                    Plan Premium
                  </b>
                  que más te acomode
                </Fragment>
              )
            }
            subTitle={subTitle}
            paddingBottom="16px"
            paddingTop="33px"
            weightSubTitle={weightSubTitle}
            noDash={noDash}
          />
          {!customSubtitle ? (
            <Paragraph
              center
              style={{ maxWidth: "600px" }}
              centerOnMobile
              fontSize="20px"
              color="#626262"
              textAlign="center"
              margin="auto"
            >
              {subtitleStringOnly || ""}
            </Paragraph>
          ) : (
            customSubtitle
          )}
          <PlansContainer
            style={{
              maxWidth: "1620px",
              position: "relative",
              alignItems: "initial",
            }}
          >
            {Array.isArray(plans) && (
              <DescriptionPlan
                features={getPlanWithMoreFeatures(plans).features}
              />
            )}
            {plans.map(
              ({
                active,
                id,
                provider_id,
                provider_name,
                nickname,
                amount,
                metadata,
                interval_count: intervalCount,
                registerText,
                features
              }) => {
                if (!active) return null;
                return (
                  <HidePlanOnMobile
                    style={{ maxWidth: "337px", width: "100%" }}
                  >
                    <SubscriptionCardWBenefits
                      id={provider_id}
                      nickname={nickname || "Lorem"}
                      amount={amount}
                      metadata={metadata}
                      isFeatured={isItFeatured(metadata)}
                      intervalCount={intervalCount}
                      actionButtonText={
                        intervalCount > 0 ? actionButtonText : registerText
                      }
                      noPrice={noPrice}
                      checkoutRoute={checkoutRoute}
                      benefits={features}
                      freeprice={provider_name === APRENDIENDO_PROVIDER}
                      accessType={accessType}
                    />
                  </HidePlanOnMobile>
                );
              }
            )}
          </PlansContainer>
          {plans && (
            <ShowTabPlanOnMobile>
              <TabHeader>
                <Select
                  id="Plans"
                  handleChange={e => onTabPlanClick(e.target.value)}
                  value={tabPlanSelected}
                  placeholder="Selecciona tu plan"
                  items={plans.map(({ nickname, provider_id }) => ({ id: provider_id, name: nickname }))}
                  style={{ minWidth: "250px" }}
                />
              </TabHeader>
              {renderPlanSelected(
                plans,
                tabPlanSelected,
                actionButtonText,
                noPrice,
                checkoutRoute,
                accessType,
                weightSubTitle
              )}
            </ShowTabPlanOnMobile>
          )}
        </MainContent>
      </ContentContainer>
    </Container>
  );
};

const mapDispatchToProps = {
  storePriceToPay: (finalPrice, items) => setFinalPrice(finalPrice, items)
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(SubscriptionPlans));
