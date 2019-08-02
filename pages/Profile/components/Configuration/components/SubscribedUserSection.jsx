import React, { Fragment } from 'react';
import Link from 'next/link';
import loading from 'assets/images/loading.gif';
import moment from 'moment';
import service from 'services';
import { LargeButton, CustomLink } from 'components';
import { Router } from 'routes';

import {
  BillingInfoContainer,
  InfoSection,
  KeyLabel,
  CancelSubscriptionContainer,
  ValueSection,
  Card,
  Loading,
  UnsubscribeButton,
  CARD_ICONS
} from '../styles';

const daysNumber = date => {
  const nextPaymentDate = moment(date, 'DD/MM/YYYY');
  return nextPaymentDate.diff(moment(), 'days') + 1;
};

const RemainingDays = ({ date }) => {
  return (
    <InfoSection>
      <KeyLabel>Días restantes</KeyLabel>
      <ValueSection>
        <label>{daysNumber(date)} días</label>
      </ValueSection>
    </InfoSection>
  );
};

const SubscribedUserSection = ({
  billingInfo, subscription, toggleModal, hasCancellation, isAccountFreezed
}) => {
  if (billingInfo) {
    return (
      <BillingInfoContainer>
        {subscription && (
          <Fragment>
            <RemainingDays date={subscription.next_payment_date} />
            <InfoSection>
              <KeyLabel>Tipo de plan</KeyLabel>
              <ValueSection>
                <label>{subscription.plan.name}</label>
              </ValueSection>
            </InfoSection>
            <InfoSection>
              <KeyLabel>Tarjeta Afiliada</KeyLabel>
              <ValueSection>
                <Card src={CARD_ICONS[billingInfo.card_type]} alt={billingInfo.card_type} />
                <label>**** **** ****</label>
                <label> {billingInfo.card_number}</label>
              </ValueSection>
            </InfoSection>
            {subscription.cancellation_date === undefined && (
              <InfoSection>
                <KeyLabel>Próximo cobro</KeyLabel>
                <ValueSection>
                  <label>{subscription.next_payment_date}</label>
                </ValueSection>
              </InfoSection>
            )}
            <CancelSubscriptionContainer>
              {hasCancellation ? (
                <div>
                  <p>
                    {`Tu suscripción ha sido cancelada, pero aún tienes acceso a tus cursos hasta el ${moment(
                      subscription.next_payment_date,
                      'DD-MM-YYYY'
                    ).format('LL')}`}
                  </p>
                  <br />
                  <LargeButton
                    large
                    handleClick={() =>
                      Router.pushRoute(`/${service.getCountry().countryCode}/premium/checkout/1`)
                    }
                  >
                    Vuélvete Premium
                  </LargeButton>
                </div>
              ) : (
                <div>
                  <p>
                    Si deseas cancelar tu suscripción, esta se hará efectiva al finalizar tu periodo actual de
                    facturación:{' '}
                    <p>
                      <strong>{subscription.next_payment_date}</strong>
                    </p>
                  </p>
                  <UnsubscribeButton onClick={() => toggleModal()}>Cancelar</UnsubscribeButton>
                  <p>Puedes reactivar tu suscripción cuando quieras.</p>
                </div>
              )}
            </CancelSubscriptionContainer>
          </Fragment>
        )}
      </BillingInfoContainer>
    );
  }

  return <Loading src={loading} alt="loading gif" />;
};

export default SubscribedUserSection;
