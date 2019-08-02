import React from 'react';
import { CartContainer, CartIcon } from './styles';
import cartIcon from 'assets/images/cart-icon.png';
import cartActiveIcon from 'assets/images/cart-active-icon.png';

const CartButton = ({ selectedLessons, lesson, onClick }) => {
  return (
    <CartContainer>
      <CartIcon
        src={selectedLessons.find(e => e.id === lesson.id) ? cartActiveIcon : cartIcon}
        alt="cart-icon"
        onClick={onClick}
      />
    </CartContainer>
  );
};

export default CartButton;
