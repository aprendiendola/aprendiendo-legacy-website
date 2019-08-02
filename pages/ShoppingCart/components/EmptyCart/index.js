import React from "react";
import { Twemoji } from "react-emoji-render";
import service from "services";
import emptyCartImage from "assets/images/pet-empty-cart.svg";
import {
  EmptyCartContainer,
  EmptyImage,
  Title,
  SubTitle,
  Button
} from "./styles";
import { Router } from "routes";

const { pushRoute } = Router;

const EmptyCart = () => {
  return (
    <EmptyCartContainer>
      <EmptyImage img={emptyCartImage} />
      <Title>
        <Twemoji svg text="NO TIENES NADA EN TU WISHLIST 💔️" />
      </Title>
      <SubTitle>
        No te quedes sin ver tus clases, cómpralas y prepárate para tus examenes
      </SubTitle>
      <Button
        onClick={() => pushRoute(`/${service.getCountry().countryCode}/cursos`)}
      >
        Ver cursos
      </Button>
    </EmptyCartContainer>
  );
};

export default EmptyCart;
