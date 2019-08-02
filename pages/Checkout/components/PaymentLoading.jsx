import React from 'react';
import Loader from 'components/Loader';
import { LoaderContainer, LoaderContent } from './styles';

const LoadingPayment = () => (
  <LoaderContainer>
    <LoaderContent>
      <Loader visible />
      <p>
Estamos procesando tu pago, por favor espera
      </p>
    </LoaderContent>
  </LoaderContainer>
);

export default LoadingPayment;
