import React from 'react';
import styled from 'styled-components';
import couponIcon from 'assets/images/icons/coupon_icon.svg';

const Container = styled.div`
  border-radius: 4px;
  background: rgb(136, 0, 255);
  background: linear-gradient(90deg, rgba(136, 0, 255, 1) 0%, rgba(182, 5, 255, 1) 100%);
  padding: 15px 28px;
  color: #fff;
  font-weight: 600;
`;

const Title = styled.p`
  font-size: 18px;
  color: #9de1f6;
  font-weight: 900;
`;

const index = ({ coupon, couponCode }) => {
  const couponText = coupon
    ? `Tienes un cupón ${coupon.amount_off ? `de S/${coupon.amount_off / 100}` : `del ${coupon.percent_off}%`}`
    : `Tienes el cupón ${couponCode}`;
  return (
    <Container>
      <div style={{ display: 'flex', alignItems: 'center', paddingBottom: 5 }}>
        <div style={{ marginRight: 20, paddingTop: 10 }}>
          <img src={couponIcon} alt="coupon-icon" width="45px" />
        </div>
        <div style={{ width: 230, fontSize: 14 }}>
          <Title>{couponText}</Title>
          <p>Podrás ver el descuento al momento de comprar tu plan.</p>
        </div>
      </div>
    </Container>
  );
};

export default index;
