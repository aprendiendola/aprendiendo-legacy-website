import React from 'react'; // eslint-disable-next-line
import errorImage from 'assets/images/pet-page-not-found.svg';
import service from 'services';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { Router } from 'routes';

const { pushRoute } = Router;

const ErrorPageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
`

const ErrorImage = styled.div`
  background-image: url(${({ img }) => img || 'http://via.placeholder.com/350x150'});
  background-size: 205px auto;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 30px;
  width: 205px;
  height: 182px;
  ${breakpoint('sm')`
    background-size: 320px auto;
    width: 320px;
    height: 286px;
  `}
  ${breakpoint('md')`
    background-size: 319px auto;
    width: 319px;
    height: 286px;
  `}
`

const ErrorLabel = styled.label`
  display: flex;
  font-family: ${({ fontFamily }) => fontFamily || 'Lato'};
  line-height: normal;
  padding-top: ${({ paddingTop }) => paddingTop || 'initial'};
  padding-bottom: ${({ paddingBottom }) => paddingBottom || 'initial'};
  font-size: ${({ fontSize }) => fontSize || '12px'};
  font-weight: ${({ fontWeight }) => fontWeight || 'normal'};
  color: ${({ color }) => color || '#414042'};
  ${breakpoint('sm')`
  font-size: ${({ fontSize }) => fontSize || '14px'};
  `}
`

const Button = styled.button`
  width: 150px;
  height: 35px;
  background-color: ${({ backgroundColor }) => backgroundColor || '#1178f2'};
  border-radius: 50px;
  color: #fff;
  border: none;
  cursor: pointer;
  ${breakpoint('sm')`
    width: 170px;
  `}
`

const PageNotFound = () => {
  return (
    <ErrorPageContainer>
      <ErrorImage img={errorImage} />
      <ErrorLabel fontSize="20px" fontWeight="bold" paddingBottom="14px">
        PÁGINA NO ENCONTRADA
      </ErrorLabel>
      <ErrorLabel fontFamily="Lato" paddingBottom="27px">
        ¡Ups! No encontramos la página que estás buscando
      </ErrorLabel>
      <Button onClick={() => pushRoute(`/${service.getCountry().countryCode}/cursos/`)}>
Volver
      </Button>
    </ErrorPageContainer>
  );
};

export default PageNotFound;
