import React, { Fragment } from 'react';
import { IconsContainer, BankIcons } from './styles';
import visa from 'assets/images/icons/visa@2x.png';
import masterCard from 'assets/images/icons/mc@2x.png';
import bcp from 'assets/images/icons/bcp.svg';
import yape from 'assets/images/icons/yape@2x.png';
import PAYMENT_METHODS from './consts';

import '../styles.scss';

const PaymentMethodsNames = {
  [PAYMENT_METHODS.PAYU]: 'Paga con tarjeta de Crédito o Débito',
  [PAYMENT_METHODS.CASH]: 'Depósito o transferencia bancaria',
  [PAYMENT_METHODS.YAPE]: 'Paga con Yape (solo BCP)'
};

const getIconsByMethod = name => {
  if (name === PAYMENT_METHODS.PAYU) {
    return (
      <Fragment>
        <img src={visa} alt="Visa" />
        <img src={masterCard} alt="Master Card" />
      </Fragment>
    );
  }
  if (name === PAYMENT_METHODS.CASH) {
    return (
      <IconsContainer>
        <BankIcons src={bcp} alt="bcp" />
        {/* <BankIcons src={scotia} alt="scotia" />
        <BankIcons src={banbif} alt="banbif" />
        <BankIcons src={interbank} alt="interbank" />
        <BankIcons src={bbva} alt="bbva" /> */}
      </IconsContainer>
    );
  }
  if (name === PAYMENT_METHODS.YAPE) {
    return <img src={yape} alt="Yape" />;
  }
};

const Heading = ({ name, setCurrentMethod }) => (
  <div className="checkout-option-heading" onClick={() => setCurrentMethod(name)} role="button">
    <h4 className="checkout-option-title">{PaymentMethodsNames[name]}</h4>
    {getIconsByMethod(name)}
  </div>
);

export default Heading;
