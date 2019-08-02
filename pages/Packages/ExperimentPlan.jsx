/* eslint import/no-unresolved: 0 */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { SmallButton, PlanCard } from 'components';
import service from 'services';
import blueCheck from 'assets/images/icons/blue-check.svg';
import { setFinalPrice } from '../../reducers/checkout';
import { Router } from 'routes';
import {
  ExperimentPriceTitle as PriceTitle, Container, PriceSubtitle, BenefitList, BlueCheck
} from './styles';

const intervals = {
  DAY: 'Diario',
  MONTH: 'Mensual'
};

const { pushRoute } = Router;

const ExperimentPlan = ({ plans, storePriceToPay }) => (
  <Fragment>
    {plans.map(plan => (
      <PlanCard
        key={plan.id}
        maxWidth="240px"
        height="340px"
        title={plan.name}
        price={plan.value}
        labelMarginBottom="23px"
        backgroundSize="375px auto"
      >
        <Container>
          <PriceTitle>
            {`${service.getCountry().currencySymbol} ${plan.value}`}
          </PriceTitle>
          <PriceSubtitle>
            {intervals[plan.interval]}
          </PriceSubtitle>
          <BenefitList>
            <li style={{ display: 'flex', marginBottom: '15px', alignItems: 'baseline' }}>
              <span style={{ width: '12px', marginRight: '5px' }}>
                <BlueCheck src={blueCheck} />
              </span>
              <span style={{ fontSize: '14px', lineHeight: '15px', width: '100%' }}>
                Acceso a todo el contenido de todos los cursos de tu universidad.
              </span>
            </li>
            <li style={{ display: 'flex', marginBottom: '15px', alignItems: 'baseline' }}>
              <span style={{ width: '12px', marginRight: '5px' }}>
                <BlueCheck src={blueCheck} />
              </span>
              <span style={{ fontSize: '14px', lineHeight: '15px', width: '100%' }}>
                Puedes congelar tu suscripción cuando quieras.
              </span>
            </li>
            <li style={{ display: 'flex', alignItems: 'baseline' }}>
              <span style={{ marginRight: '5px', width: '10px' }}>
                <BlueCheck src={blueCheck} />
              </span>
              <span style={{ fontSize: '14px' }}>
                Recursos para descargar.
              </span>
            </li>
          </BenefitList>

          <SmallButton
            onClick={() => {
              storePriceToPay(plan.value);
              pushRoute(`/${service.getCountry().countryCode}/premium/checkout/${plan.id}`);
            }}
          >
            {'Vuélvete Premium'}
          </SmallButton>
        </Container>
      </PlanCard>
    ))}
  </Fragment>
);

const mapDispatchToProps = {
  storePriceToPay: (finalPrice, items) => setFinalPrice(finalPrice, items)
};

export default connect(
  null,
  mapDispatchToProps
)(ExperimentPlan);