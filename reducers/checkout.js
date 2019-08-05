import service from 'services';

import { clearCart } from './shoppingCart';

// Constants
const ON_CHECKOUT_SUCCESS = 'ap/checkout/ON_CHECKOUT_SUCCESS';
const ON_CHECKOUT_FAILURE = 'ap/checkout/ON_CHECKOUT_FAILURE';
const TO_INITIAL_STATE = 'ap/checkout/TO_INITIAL_STATE';
const STORE_PRICE = 'ap/checkout/STORE_PRICE';
const SET_TRIAL_DAYS = 'ap/checkout/SET_TRIAL_DAYS';
const CHECKOUT_VIEWED = 'ap/checkout/CHECKOUT_VIEWED'

// Actions

function paySuccess() {
  return {
    type: ON_CHECKOUT_SUCCESS
  };
}

const onCheckoutFailure = error => ({
  type: ON_CHECKOUT_FAILURE,
  payload: error
});

function storePriceToPaySucess(finalPrice, finalItems) {
  return {
    type: STORE_PRICE,
    finalPrice,
    finalItems
  };
}

function setTrialDays(trialDays) {
  return {
    type: SET_TRIAL_DAYS,
    payload: trialDays
  };
}

export const pay = ({ token, body }) => async dispatch => {
  if (token) {
    const response = await service.processCheckout(token, body);
    if (response.code === 'SUCCESS') {
      dispatch(paySuccess());
      dispatch(clearCart());
    } else {
      dispatch(onCheckoutFailure(response[0].state));
    }
  }
};

export const setTrialDaysAction = trialDays => async dispatch => dispatch(setTrialDays(trialDays));

export const setFinalPrice = (finalPrice, finalItems) => async dispatch =>
  dispatch(storePriceToPaySucess(finalPrice, finalItems));

export const checkoutInitialState = () => ({
  type: TO_INITIAL_STATE
});


export const handleCheckoutViewed = payload => dispatch => {
  dispatch({ type: CHECKOUT_VIEWED, payload });
};

// Reducers
const initialState = {
  isPaid: false,
  finalPrice: 0,
  finalItems: [],
  error: null,
  trialDays: 5,
  isCheckoutViewed: false
};

export default (state = initialState, action = {}) => {
  if (action.type === ON_CHECKOUT_SUCCESS) {
    return {
      ...state,
      isPaid: true
    };
  }

  if (action.type === ON_CHECKOUT_FAILURE) {
    return {
      ...state,
      error: action.payload
    };
  }

  if (action.type === TO_INITIAL_STATE) {
    return checkoutInitialState;
  }

  if (action.type === STORE_PRICE) {
    return {
      ...state,
      finalPrice: action.finalPrice,
      finalItems: action.finalItems
    };
  }

  if (action.type === SET_TRIAL_DAYS) {
    return {
      ...state,
      trialDays: action.payload
    };
  }

  if (action.type === CHECKOUT_VIEWED) {
    return {
      ...state,
      isCheckoutViewed: action.payload
    };
  }

  return state;
};
