import React from 'react';
import { connect } from 'react-redux';
import { TitleSection, LargeButton } from 'components';
import { Router } from 'routes';
import service from 'services';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import moment from 'moment';
import { setFinalPrice } from '../../../reducers/checkout';

moment.locale('es');

const Container = styled.div`
  margin: 0;
  border: 1px solid ${({ hasError }) => (hasError ? '#F6635A' : '#d1d3d4')};
  padding: 15px 30px;
  margin-top: 20px;
  text-align: left;
  width: 100%;

  ${breakpoint('lg')`
    width: 450px;
    height: 400px;
    text-align: 'left';
    box-shadow: 'rgba(234, 233, 232, 0.74) 0px 3px 3px 2px';
    margin-left: 20px;
  `}
`;

const FreeTrial = ({
  onSubmit, loading, planId, amount, storePriceToPay, planName, trialDays
}) => {
  return (
    <Container>
      <TitleSection
        title={`Disfruta ${trialDays} días totalmente gratis`}
        textAlign="left"
        titleFontSize="46px"
        dashBorderSize="4px"
        dashBorderWidth="64px"
        dashPosition="flex-start"
      />
      <p>
        Tu prueba gratuita caduca el{' '}
        {moment()
          .add(trialDays, 'days')
          .format('dddd, MMMM Do YYYY')}
        {`. Si no cancelas la prueba gratuita antes de esa fecha, te cobraremos S/${amount /
          100} por el plan ${planName}.`}
      </p>
      <p
        style={{
          marginTop: '12px',
          marginBottom: '14px',
          fontSize: '12px',
          color: '#626262'
        }}
      >
        Al confirmar aceptas los{' '}
        <a style={{ color: '#0fa3f4' }} href="https://premium.aprendiendo.la/pe/condiciones-de-uso">
          Términos y condiciones
        </a>
      </p>
      <LargeButton
        large
        style={{
          color: '#fff',
          fontWeight: 900,
          background: loading ? '#969696' : '#87e400',
          boxShadow: 'none',
          cursor: loading ? 'wait' : 'pointer',
          paddingTop: '10px',
          paddingBottom: '7px',
          height: 'auto'
        }}
        handleClick={onSubmit}
      >
        ÚNETE GRATIS
      </LargeButton>
      <p
        style={{
          marginTop: '14px',
          marginBottom: '16px'
        }}
      >
        O bien{' '}
        <a
          style={{ color: '#0fa3f4' }}
          onClick={() => {
            storePriceToPay(amount / 100);
            Router.pushRoute(`/${service.getCountry().countryCode}/premium/checkout/${planId}`);
          }}
        >
          cómpralo aquí
        </a>
      </p>
    </Container>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    token: auth.token,
    user: auth.user
  };
};

const mapDispatchToProps = {
  storePriceToPay: (finalPrice, items) => setFinalPrice(finalPrice, items)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FreeTrial);
