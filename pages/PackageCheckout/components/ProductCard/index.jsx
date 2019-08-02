import React from 'react';
import service from 'services';
import closeIcon from 'assets/images/close-icon.png';
import {
  ProductCardContainer,
  ProductCardInfoContainer,
  ProductLabel,
  NameAndUniversityContainer,
  NameLabel,
  UniversityLabel,
  CycleLabel,
  PriceLabel
} from './styles';

const ProductCard = props => {
  const {
    name, university, packageName, price, remove, showPrice = true
  } = props;
  return (
    <ProductCardContainer>
      <ProductCardInfoContainer>
        <NameAndUniversityContainer>
          <NameLabel>
            {name}
          </NameLabel>
          <UniversityLabel>
            {university}
          </UniversityLabel>
        </NameAndUniversityContainer>
        <CycleLabel>
          {packageName || 'Clase individual'}
        </CycleLabel>
      </ProductCardInfoContainer>
      <ProductCardInfoContainer flexGrow="1" alignItems="center" direction="row">
        <PriceLabel>
          {showPrice && `${service.getCountry().currencySymbol} ${price}`}
        </PriceLabel>
        {showPrice && (
          <ProductLabel onClick={() => remove()} marginLeft="15px" cursor="pointer">
            <span className="icon-aprendiendo-close" />
          </ProductLabel>
        )}
      </ProductCardInfoContainer>
    </ProductCardContainer>
  );
};

export default ProductCard;
