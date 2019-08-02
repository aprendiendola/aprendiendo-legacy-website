import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const Container = styled.div`
  width: 538px;
  border: 1px solid #dadada;
  border-radius: 10px;
  padding: 20px;
  ${breakpoint('sm')`
    width: 724px;
  `}
  ${breakpoint('md')`
    width: 538px;
  `}
`;

const CashPaymentAdvise = () => {
  return (
    <Container>
      <h1 style={{ fontWeight: 900, fontSize: '21px' }}>¿No cuentas con una tarjeta de crédito o débito?</h1>
      <p>
        Si no tienes una tarjeta o tienes errores en tu pago, escríbenos al siguiente número{' '}
        <strong>977 136 971</strong> o haz click{' '}
        <a href="https://wa.me/51977136971" target="_blank">
          aquí para ayudarte.
        </a>
      </p>
    </Container>
  );
};

export default CashPaymentAdvise;
