import React from 'react';
import service from 'services';
import ComingSoonBanner from '../../../CourseDetail/components/ComingSoonBanner';
import cardIcon from 'assets/images/star-vector.png';
import {
  ProductCardContainer,
  ProductCardInfoContainer,
  ProductLabel,
  NameAndUniversityContainer,
  NameLabel,
  UniversityLabel,
  CycleLabel,
  PriceLabel,
  Indicators,
  StarRating,
  StarRatingLabel,
  FromLabel,
  ProductCardWrapper
} from './styles';
import { Router } from 'routes';

const { pushRoute } = Router;

const ProductCard = props => {
  const {
    name,
    university,
    teacher,
    price,
    remove,
    showPrice = true,
    slug,
    id,
    releaseDate
  } = props;
  return (
    <ProductCardContainer>
      {releaseDate && (
        <div>
          <ComingSoonBanner releaseDate={releaseDate} />
        </div>
      )}
      <ProductCardWrapper>
        <ProductCardInfoContainer onClick={() => pushRoute(`/${service.getCountry().countryCode}/cursos/${slug}/${id}`)}>
          <NameAndUniversityContainer>
            <NameLabel>
              {name}
            </NameLabel>
            <UniversityLabel>
              {university.name}
            </UniversityLabel>
          </NameAndUniversityContainer>
          <div>
            <CycleLabel>
              {teacher.name}
            </CycleLabel>
            <Indicators>
              <StarRating style={{ background: `url(${cardIcon}) repeat-x` }}>
                <StarRatingLabel
                  style={{
                    background: `url(${cardIcon}) 0px 100% repeat-x`,
                    width: `${(teacher.rate / 5) * 100}%`
                  }}
                />
              </StarRating>
            </Indicators>
          </div>
        </ProductCardInfoContainer>
        <ProductCardInfoContainer flexGrow="1" alignItems="center" direction="row">
          <PriceLabel>
            <FromLabel>
Desde
            </FromLabel>
            {showPrice && ` ${service.getCountry().currencySymbol} ${price}`}
          </PriceLabel>
          {showPrice && (
            <ProductLabel
              onClick={e => {
                e.preventDefault();
                remove();
              }}
              marginLeft="15px"
              cursor="pointer"
            >
              <span className="icon-aprendiendo-close" />
            </ProductLabel>
          )}
        </ProductCardInfoContainer>
      </ProductCardWrapper>
    </ProductCardContainer>
  );
};

export default ProductCard;
