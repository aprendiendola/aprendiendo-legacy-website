import React from "react";
import { PriceContainer, MoneySymbol, Price } from "./styles";

export default ({ isFeatured = false, amountToShow, freeprice }) => {
  return (
    <PriceContainer>
      <MoneySymbol isFeatured={isFeatured}>S/</MoneySymbol>
      <Price style={{ height: "48px" }} isFeatured={isFeatured}>
        {freeprice ? 0 : amountToShow / 100}
      </Price>
    </PriceContainer>
  );
};
