import service from 'services';
import { add, subtract } from 'utils/dinero';
import { setUserData } from 'utils/cookieHandler';

const ON_SUCCESS = 'ap/shoppingCart/ON_SUCCESS';
const SET_ITEMS = 'ap/shoppingCart/SET_ITEMS';
const ADD_ITEM = 'ap/shoppingCart/ADD_ITEM';
const REMOVE_ITEM = 'ap/shoppingCart/REMOVE_ITEM';
const CLEAR_CART = 'ap/shoppingCart/CLEAR_CART';

const setItems = items => ({
  type: SET_ITEMS,
  payload: items
});

const addItem = item => ({
  type: ADD_ITEM,
  payload: item
});

const removeItem = item => ({
  type: REMOVE_ITEM,
  payload: item
});

const clearItems = () => ({
  type: CLEAR_CART
});

export const clearCart = () => dispatch => {
  dispatch(clearItems());
};

export const loadCart = token => async dispatch => {
  if (token) {
    const response = await service.getCart(token);
    if (!response.messages && !response.error) {
      const { data } = response;
      const { items } = data;
      const products = Object.values(items);

      dispatch(setItems(products));
    }
  }
};

export const getCurrentShoppingCart = () => JSON.parse(localStorage.getItem('cartContent')) || [];

const setToLocalStorage = (product, type) => {
  const allProducts = JSON.parse(localStorage.getItem(type)) || [];
  const getAllPackagesAndLessons = getCurrentShoppingCart();

  if (!allProducts.includes(product)) {
    setUserData({
      type: JSON.stringify([product.id].concat(allProducts)),
      allPackagesAndLessons: JSON.stringify([{ type, product }].concat(getAllPackagesAndLessons))
    });
    localStorage.setItem('cartContent', JSON.stringify([{ type, product }].concat(getAllPackagesAndLessons)));
  }
};

function updateCartSuccess(counter, packages, lessons) {
  return {
    type: ON_SUCCESS,
    payload: {
      counter
    }
  };
}

// Actions
// TODO: Refactor ShoppingCart
export const getCartContent = () => async (dispatch, getState) => {
  const { token } = getState().auth;

  if (token) {
    const response = await service.getCart(token);
    if (!response.messages && !response.error) {
      const {
        data,
        data: { count: counter, items }
      } = response;

      const products = Object.values(items);

      const curatedCartItems = [];

      products.forEach(product => {
        const type = typeof product.id === 'number' ? 'packages' : 'lessons';
        curatedCartItems.push({ type, product });
        setToLocalStorage(product, type);
      });

      localStorage.setItem('cartContent', JSON.stringify(curatedCartItems));
      localStorage.setItem('userCart', JSON.stringify(data));

      dispatch(updateCartSuccess(curatedCartItems.length));
    }
  } else {
    const cartContent = getCurrentShoppingCart();
    dispatch(updateCartSuccess(cartContent.length));
  }
};

export const addToCart = product => async (dispatch, getState) => {
  const { token } = getState().auth;

  if (token) {
    const response = await service.updateCart({ items: [product] }, token);

    if (!response.messages && response.data) {
      dispatch(loadCart(token));
    }
  } else {
    dispatch(addItem(product));
  }
};

export const removeFromCart = product => async (dispatch, getState) => {
  const { token } = getState().auth;
  if (token) {
    try {
      await service.removeItemCart(product.rowId, token);
    } catch (err) {
      console.log('err::', err);
    }
  }
  dispatch(removeItem(product));
};

const initialState = {
  counter: 0,
  items: [],
  totalPrice: 0
};

export default (state = initialState, action = {}) => {
  if (action.type === ON_SUCCESS) {
    return {
      ...state,
      counter: action.payload.counter
    };
  }

  if (action.type === SET_ITEMS) {
    return {
      ...state,
      items: action.payload,
      counter: action.payload.length,
      totalPrice: action.payload.reduce(
        (accumulator, currentValue) => add(accumulator, currentValue.price || 0),
        0
      )
    };
  }

  if (action.type === ADD_ITEM) {
    const found = state.items.find(item => item.id === action.payload.id);

    if (!found) {
      const items = [...state.items, action.payload];
      return {
        ...state,
        items,
        counter: items.length,
        totalPrice: add(state.totalPrice, action.payload.price)
      };
    }
  }

  if (action.type === REMOVE_ITEM) {
    const items = state.items.filter(e => e.id !== action.payload.id);

    return {
      ...state,
      items,
      counter: items.length,
      totalPrice: subtract(state.totalPrice, action.payload.price)
    };
  }

  if (action.type === CLEAR_CART) {
    return initialState;
  }

  return state;
};
