import service from 'services';

// Constants
const SET_COUPON_CODE = 'ap/coupons/SET_COUPON_CODE';
const SET_COUPON = 'ap/coupons/SET_COUPON';
const CLEAR_COUPON = 'ap/coupons/CLEAR_COUPON';
const SET_COUPON_ERROR = 'ap/coupons/SET_COUPON_ERROR';
const CLEAR_COUPON_ERROR = 'ap/coupons/CLEAR_COUPON_ERROR';

// Actions
export const setCouponCode = couponCode => dispatch => dispatch({
  type: SET_COUPON_CODE,
  payload: couponCode
});

export const clearCoupon = () => ({
  type: CLEAR_COUPON
});

const setCouponError = payload => ({
  type: SET_COUPON_ERROR,
  payload
});

const setCoupon = payload => ({
  type: SET_COUPON,
  payload
});

export const clearCouponError = () => ({
  type: CLEAR_COUPON_ERROR
});

export const validateCouponCode = (couponCode, token) => async dispatch => {
  const response = await service.validateCouponCode(couponCode, token);

  if (response.status === 404 || response.status === 422) {
    dispatch(setCouponError('Cupón inválido.'));
  } else if (response.status === 410) {
    dispatch(setCouponError('Cupón agotado.'));
  } else {
    dispatch(setCoupon(response));
  }
};

// Reducers
const initialState = {
  couponCode: null,
  coupon: null,
  couponError: null,
  couponSource: 'direct',
  couponMedium: ''
};

export default (state = initialState, action = {}) => {
  if (action.type === SET_COUPON_CODE) {
    return {
      ...state,
      couponCode: action.payload.code,
      couponSource: action.payload.source,
      couponMedium: action.payload.medium
    };
  }

  if (action.type === CLEAR_COUPON) {
    return {
      ...state,
      couponCode: null,
      coupon: null,
      couponError: null
    };
  }

  if (action.type === SET_COUPON_ERROR) {
    return {
      ...state,
      couponError: action.payload,
      coupon: null,
      couponCode: null
    };
  }

  if (action.type === SET_COUPON) {
    return {
      ...state,
      coupon: action.payload,
      couponCode: action.payload.code,
      couponError: null
    };
  }

  if (action.type === CLEAR_COUPON_ERROR) {
    return {
      ...state,
      couponError: null
    };
  }

  return state;
};
