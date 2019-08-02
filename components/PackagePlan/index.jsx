import React from 'react';
import { connect } from 'react-redux';
import { CustomLink } from 'components';
import cartIcon from 'assets/images/icons/cart@2x.png';
import checkIcon from 'assets/images/icons/check.png';
import service from 'services';
import facebookPixel from 'utils/facebook';

import { setFinalPrice } from '../../reducers/checkout';
import withCart from '../../HOC/WithCart';
import './styles.scss';
import {
  Card,
  Header,
  Description,
  DescriptionP,
  InfoP,
  Flag,
  FlagSpan,
  Title,
  Price,
  SalePrice,
  Discount,
  DiscountSpan,
  More,
  CartButton,
  CartIcon,
  BeforeSpan,
  LessonsText,
  BeforePrice
} from './styles';

const Plan = ({
  item, courseId, openModal, addItem, courseName, storePriceToPay, university, inCart
}) => {
  const percentage = item.discount / 100;
  const initialPrice = item.price / (1 - percentage);
  const { currencySymbol } = service.getCountry();

  return (
    <Card isFeatured={item.is_featured}>
      <Header>
        {item.has_offer && (
          <Flag>
            <FlagSpan>
              {'Oferta'}
            </FlagSpan>
          </Flag>
        )}
        <Title>
          {item.title}
        </Title>
        <Description>
          <DescriptionP>
            {item.description}
          </DescriptionP>
        </Description>
      </Header>
      <Price>
        {item.has_offer && (
          <Discount>
            <DiscountSpan>
              {`Ahorra ${item.discount ? item.discount : 0}%`}
            </DiscountSpan>
          </Discount>
        )}
        <SalePrice>
          {service.getCountry().currencySymbol}
          {item.price}
          {item.personalized && (
          <small>
            {' c/u'}
          </small>
)}
        </SalePrice>
        {item.has_offer && (
          <div>
            <BeforeSpan>
              {'Antes '}
              <BeforePrice>
                {`${currencySymbol} ${initialPrice.toFixed(2)}`}
              </BeforePrice>
            </BeforeSpan>
          </div>
        )}
      </Price>
      <div>
        <p>
          <CustomLink
            path={
              item.personalized
                ? `/planes/${courseId}/clases`
                : `/checkout/${courseId}/${item.id}`
            }
          >
            <CartButton
              buy
              isFeatured={item.has_offer}
              onClick={() => {
                if (!item.personalized) {
                  const buyedItem = {
                    id: item.id,
                    name: courseName,
                    package: item.title,
                    price: item.price,
                    university: university.data.name,
                    type: 'packages'
                  };

                  storePriceToPay(item.price, buyedItem);
                }

                mixpanel.track('Package selection', {
                  courseName,
                  packageName: item.title,
                  price: item.price
                });
              }}
            >
              {item.personalized ? 'Elige tus clases' : 'Comprar'}
            </CartButton>
          </CustomLink>
        </p>
        {item.personalized ? (
          <InfoP>
            <p>
              {'Selecciona una o más clases y compra'}
            </p>
          </InfoP>
        ) : (
          <div>
            {
              /*
              <p>
                <CartButton
                  grey
                  onClick={() => {
                    mixpanel.track('Add package to checkout', {
                      courseName,
                      packageName: item.title,
                      price: item.price
                    });
                    facebookPixel.addToCart({
                      content_ids: [item.id],
                      content_type: courseName,
                      contents: item.title,
                      currency: service.getCountry().currency,
                      value: item.price
                    });
                    const product = {
                      id: item.id,
                      name: courseName,
                      package: item.title,
                      price: item.price,
                      university: university.data.name,
                      type: 'packages'
                    };
                    addItem(product);
                  }}
                >
                  {inCart(item) ? 'Agregado' : 'Agregar'}
                  <CartIcon src={inCart(item) ? checkIcon : cartIcon} />
                </CartButton>
              </p>
              */
            }
            <p>
              <More onClick={() => openModal(item.id)}>
                <LessonsText>
                  {'Mira las clases incluidas'}
                </LessonsText>
              </More>
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

const mapDispatchToProps = {
  storePriceToPay: (finalPrice, items) => setFinalPrice(finalPrice, items)
};

export default connect(
  null,
  mapDispatchToProps
)(withCart(Plan));
