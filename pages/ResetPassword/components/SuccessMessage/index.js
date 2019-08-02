import React from 'react';
import CheckIcon from 'assets/images/pet-password-updated.svg';
import { Router } from 'routes';
import service from 'services';
import {
  Container, Icon, Title, Button
} from './styles';

const { pushRoute } = Router;

const SuccessMessage = () => {
  return (
    <Container>
      <Title>
      ¡TU CONTRASEÑA SE ACTUALIZÓ CON ÉXITO!
      </Title>
      <Icon img={CheckIcon} />
      <Button onClick={() => { pushRoute(`/${service.getCountry().countryCode}/login`); }}>
        Inicia sesión
      </Button>
    </Container>
  );
};

export default SuccessMessage;
