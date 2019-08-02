import React, { Fragment } from 'react';
import { CustomLink } from 'components';
import { Container, OptionContainer, Arrow } from './styles';

const LogoutPopover = ({ isVisible, onMouseLeave, onLogout }) => {
  return (
    isVisible && (
      <Fragment>
        <Container onMouseLeave={() => onMouseLeave()}>
          <CustomLink path="/perfil">
            <OptionContainer>
              <span>Mi cuenta</span>
            </OptionContainer>
          </CustomLink>
          <OptionContainer onClick={() => onLogout()}>
            <span>Cerrar sesión</span>
          </OptionContainer>
        </Container>
        <Arrow />
      </Fragment>
    )
  );
};

export default LogoutPopover;
