import React from 'react';
import PropTypes from 'prop-types';
import CheckIcon from 'assets/images/pet-recover-password.svg';
import { Label } from 'components';
import {
  Container, Icon, Title, SubTitle, Button
} from './styles';


const SuccessMessage = props => {
  const { handleWasSent } = props;
  return (
    <Container>
      <Title>
      RECUPERA TU CONTRASEÑA
      </Title>
      <Icon img={CheckIcon} />
      <SubTitle>
      Te hemos enviado un correo para recuperar tu contraseña.
      Asegúrate de revisar tu bandeja de spam si no puedes encontrar el correo.
      </SubTitle>
      <Button onClick={() => { handleWasSent(false); }} style={{ cursor: 'pointer' }}>
        Volver
      </Button>
    </Container>
  );
};

SuccessMessage.propTypes = {
  handleWasSent: PropTypes.func
};

export default SuccessMessage;
