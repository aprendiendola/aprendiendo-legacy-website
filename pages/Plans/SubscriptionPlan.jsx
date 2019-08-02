/* eslint import/no-unresolved: 0 */
import React, { Fragment } from 'react';
import { Label, SubscriptionCardWBenefits } from 'components';
import { isItFeatured } from 'utils/common';
import { HidePlanOnMobile, ShowTabPlanOnMobile, TabHeader, Tab } from './styles';

const APRENDIENDO_PROVIDER = 'aprendiendo';

const renderPlanSelected = (plans, tabPlanSelected) => {
  const planSelected = plans.find(({ id }) => id === tabPlanSelected);

  if (!planSelected) return null;

  return (
    <div
      style={{
        border: '1px solid #d0d2d3',
        borderTop: 'initial',
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px'
      }}
    >
      <SubscriptionCardWBenefits
        id={planSelected.provider_id}
        amount={planSelected.amount}
        isFeatured={isItFeatured(planSelected.metadata)}
        metadata={planSelected.metadata}
        intervalCount={planSelected.interval_count}
        noStyle
        freeprice={planSelected.provider_name === APRENDIENDO_PROVIDER}
      />
    </div>
  );
};

const SubscriptionPlan = ({ plans, onTabPlanClick, tabPlanSelected }) => (
  <Fragment>
    {plans.map(
      ({
        active,
        id,
        provider_id,
        provider_name,
        nickname,
        amount,
        metadata,
        benefits,
        interval_count: intervalCount
      }) => {
        if (!active) return null;

        return (
          <HidePlanOnMobile>
            <SubscriptionCardWBenefits
              id={provider_id}
              freeprice={provider_name === APRENDIENDO_PROVIDER}
              nickname={nickname || 'Lorem'}
              amount={amount}
              isFeatured={isItFeatured(metadata)}
              metadata={metadata}
              intervalCount={intervalCount}
            />
          </HidePlanOnMobile>
        );
      }
    )}
    {plans && (
      <ShowTabPlanOnMobile>
        <TabHeader>
          {plans.map(({
 active, nickname, metadata, id
}) => {
            if (!active) return null;

            const isFeatured = isItFeatured(metadata);

            return (
              <Tab
                isHighlight={isFeatured}
                isActive={id === tabPlanSelected || isFeatured}
                onClick={() => onTabPlanClick(id)}
              >
                <Label fontSize="19px" color={isFeatured ? '#fff' : '#414042'} weight="black" isClickable>
                  {nickname || 'Lorem'}
                </Label>
              </Tab>
            );
          })}
        </TabHeader>
        {renderPlanSelected(plans, tabPlanSelected)}
      </ShowTabPlanOnMobile>
    )}
  </Fragment>
);
export default SubscriptionPlan;
