import React from 'react';
import { LargeButton } from 'components';
import Router from 'next/router';
import service from 'services';

const FreemiumAlert = () => {
  return (
    <div
      style={{
        background: 'linear-gradient(90deg, rgb(37,76,155, 1) 0%, rgba(66,103,178,1) 100%)',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '12px 25px',
        borderRadius: '10px',
        fontWeight: 900,
        color: '#fff',
        fontSize: '15px',
        margin: '20px 0px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>Estás suscrito al plan gratuito</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <LargeButton
          style={{
            background: '#87E400',
            width: 190,
            height: 35,
            padding: 0
          }}
          handleClick={() => Router.pushRoute(`/${service.getCountry().countryCode}/suscripcion#precios`)}
          large
        >
          Mejora tu plan
        </LargeButton>
      </div>
    </div>
  );
};

export default FreemiumAlert;
