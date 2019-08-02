import React from 'react';
import Router from 'next/router';
import service from 'services';
import '../styles.scss';
import Button from 'components/Button';
import Input from 'components/Input';
import styled from 'styled-components';

const TextContainer = styled.div`
  width: 402;
  p {
    color: #626262;
    font-size: 14px;
    margin-bottom: 10px;
  }
`;

const YapeContent = ({ toggleModal }) => (
  <div className="checkout-option-content">
    <TextContainer>
      <p>Paga de forma segura con la app Yape desde tu celular</p>
    </TextContainer>
    <div className="checkout-option-action">
      <Button type="submit" styleClass="is-blue" onClick={toggleModal}>
        SIGUIENTE
      </Button>
    </div>
    <p>
      <small className="small-text">
        Al confirmar tu compra aceptas los{' '}
        <a
          onClick={() => Router.push('/pe/condiciones-de-uso')}
        >
        Términos y condiciones
        </a>
      </small>
    </p>
  </div>
);

export default YapeContent;
