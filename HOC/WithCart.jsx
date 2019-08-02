import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { addToWishlist, removeFromWishlist, loadWishlist } from '../reducers/wishlist';

const inCart = (cartItems, item) => {
  const found = cartItems.find(({ id }) => id === item.id);
  return found !== null && found !== undefined;
};

const withCart = WrappedComponent => {
  return props => <WrappedComponent inCart={item => inCart(props.items, item)} {...props} />;
};

const mapStateToProps = ({ shoppingCart, wishlist }) => ({
  items: wishlist.items,
  counter: wishlist.counter,
  totalPrice: shoppingCart.totalPrice
});

const mapDispatchToProps = {
  updateCart: token => loadWishlist(token),
  addItem: item => addToWishlist(item),
  removeItem: item => removeFromWishlist(item)
};

const composedHoc = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withCart
);

export default composedHoc;
