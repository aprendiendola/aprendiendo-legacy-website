import React from 'react';

const NextPaymentAlert = ({ amount }) => {
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
        marginBottom: 20
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {`Se te hará un descuento de S/${amount} en
       tu siguiente pago. Gracias por recomendarnos a tus amigos!`}
      </div>
    </div>
  );
};

export default NextPaymentAlert;
