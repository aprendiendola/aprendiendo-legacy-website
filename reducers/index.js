import { routerReducer as router } from 'react-router-redux';
import { combineReducers } from 'redux';

import auth from './auth';
import courses from './courses';
import register from './register';
import shoppingCart from './shoppingCart';
import checkout from './checkout';
import coupons from './coupons';
import wishlist from './wishlist';
import progress from './progress';
import history from './history';

export default combineReducers({
  router,
  auth,
  courses,
  register,
  shoppingCart,
  checkout,
  coupons,
  wishlist,
  progress,
  history
});
