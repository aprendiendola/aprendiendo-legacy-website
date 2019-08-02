import React, { Fragment } from 'react';
import loading from 'assets/images/loading.gif';
import { Alert } from 'components';
import moment from 'moment';
import {
  BillingInfoContainer,
  InfoSection,
  KeyLabel,
  FreezeSubscriptionSection,
  ValueSection,
  Card,
  Loading,
  UnsubscribeButton,
  P1,
  P6,
  CARD_ICONS,
  WarningText
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
  billingInfo, subscription, toggleModal, justUnfreezed, isFreemium
}) => {
  if (billingInfo) {
    return (
      <BillingInfoContainer>
        {justUnfreezed && (
          <Alert fontWeight="800" height={62}>
            Tu plan Premium ha sido descongelado
          </Alert>
        )}
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
            <InfoSection>
              <KeyLabel>Próximo cobro</KeyLabel>
              <ValueSection>
                <label>{subscription.next_payment_date}</label>
              </ValueSection>
            </InfoSection>
            <FreezeSubscriptionSection>
              <strong>Congelar Plan Premium</strong>
              <P1>
                Sabemos que no siempre estás estudiando, por eso te damos la opción de pausar tu Plan Premium
                durante tus vacaciones o cuando no lo necesites.
              </P1>
              <P1>
                Cuando congelas tu Plan Premium, pausas automáticamente tus pagos. No tendrás acceso a los
                cursos pero podrás retomarlos cuando quieras dentro de los 30 días después de haber congelado.
              </P1>
              <P1>Mantendremos el precio de tu Plan Premium y todo tu progreso</P1>
              <P6>
                *Tienes {daysNumber(subscription.next_payment_date)} días restantes de tu pago anterior, si
                congelas, no los perderás ya que extenderemos tu pago por{' '}
                {daysNumber(subscription.next_payment_date)} días después de que se reactive tu plan.
              </P6>
              <strong>¿Cómo puedo descongelar?</strong>
              <P1>
                Simplemente ingresa a esta misma sección y dale clic al botón Descongelar de tu Plan Premium.
              </P1>
              <strong>¿Cuándo puedo descongelar?</strong>
              <P1>
                En cualquier momento dentro de los 30 días posteriores a la fecha en la que congelaste tu Plan
                Premium.
              </P1>
              <strong>Condiciones</strong>
              <P1>
                -Puedes pausar tu Plan Premium hasta por 30 días, luego de éstos se reiniciará
                automáticamente.
                <br />- Solo puedes congelar 2 veces dentro del año a partir del día en que adquiriste tu Plan
                Premium.
              </P1>
              <UnsubscribeButton disabled={subscription.freeze_count >= 2} onClick={() => toggleModal()}>
                Congelar
              </UnsubscribeButton>
              <WarningText>
                {subscription.freeze_count >= 2 && '*Ya has congelado tu subscripción el máximo de veces (2)'}
              </WarningText>
            </FreezeSubscriptionSection>
          </Fragment>
        )}
      </BillingInfoContainer>
    );
  }
  return <div />;
  // return <Loading src={loading} alt="loading gif" />;
};

export default SubscribedUserSection;
