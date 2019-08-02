/* eslint import/no-unresolved: 0 */
import React from 'react';
import { connect } from 'react-redux';
import './styles.scss';
import SubscriptionPlan from './SubscriptionPlan';

const Plans = ({
  plans,
  onTabPlanClick,
  tabPlanSelected
}) => {
  return (
    <div className="packages-plans">
      <div className="packages-plans-list">
        <SubscriptionPlan
          plans={plans}
          onTabPlanClick={onTabPlanClick}
          tabPlanSelected={tabPlanSelected}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({ checkout }) => ({
  items: checkout.items
});

export default connect(mapStateToProps)(Plans);
