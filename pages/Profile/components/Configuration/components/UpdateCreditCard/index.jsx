import React, { Fragment } from 'react';
import service from 'services';
import { Router } from 'routes';
import Label from 'components/atoms/label';
import Spinner from 'components/atoms/spinner';
import { Container, CardIcon } from './styles';

const { pushRoute } = Router;

const UpdateCreditCard = ({ billingInfo: { card_type: cardType, card_number: cardNumber } }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Container>
        {!cardNumber
          ? (
            <Spinner />
          )
          : (
            <Fragment>
              <CardIcon cardType={cardType} />
              <Label
                color="#626262"
                fontSize="16px"
                weight="black"
                isClickable
              >
                {`**** **** **** ${cardNumber}`}
              </Label>
            </Fragment>
          )
        }
      </Container>
      <Container
        onClick={() => {
          pushRoute(`/${service.getCountry().countryCode}/premium/checkout/1`);
        }}
      >
        <Label
          color="#0fa3f4"
          fontSize="16px"
          isClickable
        >
          Agregar nueva tarjeta de crédito o débito
        </Label>
      </Container>
    </div>
  );
};

export default UpdateCreditCard;
