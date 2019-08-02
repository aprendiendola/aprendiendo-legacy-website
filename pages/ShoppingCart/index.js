import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import service from 'services';
import facebookPixel from 'utils/facebook';
import { ProductCard, EmptyCart } from './components';
import { setFinalPrice } from '../../reducers/checkout';
import withCart from '../../HOC/WithCart';
import { ShoppingCardContainer, TitleCard, CartContainer, CoursesContainer } from './styles';
import { Router } from 'routes';

const { pushRoute } = Router;

class ShoppingCart extends PureComponent {
  state = {
    counter: 0
  };
  componentDidMount() {
    const {
      token, items, totalPrice, counter
    } = this.props;

    if (!token) {
      pushRoute(`/${service.getCountry().countryCode}/login`);
    }

    if (counter > 0) {
      this.setState({ counter });
    }

    facebookPixel.viewContent({
      content_ids: items.map(({ id }) => id),
      content_name: 'Cart',
      content_type: items.map(({ name }) => name),
      contents: items.map(({ package: packageName }) => packageName || 'Clase individual'),
      currency: service.getCountry().currency,
      value: totalPrice
    });
  }

  handleProductCart = cartContent => {
    return cartContent.map(item => {
      const { removeItem } = this.props;
      return (
        <ProductCard
          key={item.id}
          name={item.name}
          slug={item.slug}
          releaseDate={item.release_date}
          id={item.id}
          university={item.university.data}
          teacher={item.teacher.data}
          price={item.price}
          remove={() => removeItem(item)}
        />
      );
    });
  };

  render() {
    const { items } = this.props;
    const { counter } = this.state;

    if (counter === 0) {
      return <EmptyCart />;
    }

    return (
      <ShoppingCardContainer>
        <TitleCard>Favoritos</TitleCard>
        <CartContainer>
          <CoursesContainer>
            <hr
              style={{
                borderTop: '1px solid #eee',
                bottom: '12px',
                position: 'relative',
                maxWidth: '760px'
              }}
            />
            {this.handleProductCart(items)}
          </CoursesContainer>
        </CartContainer>
      </ShoppingCardContainer>
    );
  }
}

const mapDispatchToProps = {
  storePriceToPay: (finalPrice, items) => setFinalPrice(finalPrice, items)
};

const mapStateToProps = ({ wishlist, auth }) => {
  return {
    wishlistItems: wishlist.items,
    token: auth.token
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withCart(ShoppingCart));
