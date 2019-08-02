import React from 'react';
import { Label, Button, Paragraph } from 'components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { setCouponCode } from 'reducers/coupons';
import { setFinalPrice } from 'reducers/checkout';
import service from 'services';
import Router, { withRouter } from 'next/router';

import {
  ChooseUniversityContainer,
  MainContainer,
  RightMainContainer,
  ChooseUniImageContainer,
  Graduated,
  LeftMainContainer,
  ChooseUniversityButton,
  MainRightShape,
  Title,
  Subtitle
} from './styles';

const Main = props => {
  return (
    <ChooseUniversityContainer>
      <MainContainer>
        <RightMainContainer>
          <ChooseUniImageContainer>
            <Graduated />
          </ChooseUniImageContainer>
        </RightMainContainer>
        <LeftMainContainer>
          <Title hasLineHeight fontSize="44px" weight="black" color="#414042">
            Aprende,
          </Title>
          <Title hasLineHeight fontSize="44px" weight="black" color="#0fa3f4" marginBottom="10px">
            aprueba
          </Title>
          <Subtitle weight="regular" color="#626262" maxWidth="147px">
            Clases online para que aprendas a tu ritmo.
          </Subtitle>
          <Button
            style={{ background: '#87E400', fontSize: '18px', fontWeight: 900 }}
            onClick={() => {
              document.querySelector('#chooseUniversity').scrollIntoView({
                block: 'start',
                behavior: 'smooth'
              });
            }}
          >
            <Label color="#fff" weight="black" fontSize="20px" isClickable>
              Elige tu universidad
            </Label>
          </Button>
        </LeftMainContainer>
      </MainContainer>
      <ChooseUniversityButton
        style={{
          margin: 'auto',
          background: '#87E400',
          fontSize: '18px',
          fontWeight: 900
        }}
        onClick={() => {
          document.querySelector('#chooseUniversity').scrollIntoView({
            block: 'start',
            behavior: 'smooth'
          });
        }}
      >
        <Label color="#fff" weight="black" fontSize="20px" isClickable>
          Elige tu universidad
        </Label>
      </ChooseUniversityButton>
      <MainRightShape />
    </ChooseUniversityContainer>
  );
};

const mapDispatchToProps = {
  setDiscountCoupon: coupon => setCouponCode(coupon),
  storePriceToPay: (finalPrice, items) => setFinalPrice(finalPrice, items)
};

export default compose(
  connect(
    null,
    mapDispatchToProps
  )
)(withRouter(Main));
