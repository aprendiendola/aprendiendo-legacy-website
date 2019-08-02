import service from 'services';
import { setUserData } from '../utils/cookieHandler';

const ON_SUCCESS = 'ap/wishlist/ON_SUCCESS';
const SET_ITEMS = 'ap/wishlist/SET_ITEMS';
const ADD_ITEM = 'ap/wishlist/ADD_ITEM';
const REMOVE_ITEM = 'ap/wishlist/REMOVE_ITEM';
const CLEAR_WISHLIST = 'ap/wishlist/CLEAR_WISHLIST';

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
  type: CLEAR_WISHLIST
});

export const clearWishlist = () => dispatch => {
  dispatch(clearItems());
};

export const loadWishlist = token => async dispatch => {
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

export const getCurrentWishlist = () => JSON.parse(localStorage.getItem('cartContent')) || [];

const setToLocalStorage = (product, type) => {
  const allProducts = JSON.parse(localStorage.getItem(type)) || [];
  const getAllPackagesAndLessons = getCurrentWishlist();

  if (!allProducts.includes(product)) {
    setUserData({
      type: JSON.stringify([product.id].concat(allProducts)),
      allPackagesAndLessons: JSON.stringify([{ type, product }].concat(getAllPackagesAndLessons))
    });
    localStorage.setItem('cartContent', JSON.stringify([{ type, product }].concat(getAllPackagesAndLessons)));
  }
};

function updateWishlistSuccess(counter, packages, lessons) {
  return {
    type: ON_SUCCESS,
    payload: {
      counter
    }
  };
}

// Actions
export const getWishlistContent = () => async (dispatch, getState) => {
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

      dispatch(updateWishlistSuccess(curatedCartItems.length));
    }
  } else {
    const cartContent = getCurrentWishlist();
    dispatch(updateWishlistSuccess(cartContent.length));
  }
};

export const addToWishlist = product => async (dispatch, getState) => {
  const { token } = getState().auth;
  if (token) {
    const response = await service.updateCart({ items: [product] }, token);
    if (!response.messages && response.data) {
      dispatch(loadWishlist(token));
    }
  } else {
    dispatch(addItem(product));
  }
};

export const removeFromWishlist = product => async (dispatch, getState) => {
  const { token } = getState().auth;
  if (token) {
    try {
      await service.removeItemCart(product.rowId, token);
    } catch (err) {}
  }
  dispatch(removeItem(product));
};

const initialState = {
  counter: 0,
  items: []
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
      counter: action.payload.length
    };
  }

  if (action.type === ADD_ITEM) {
    const found = state.items.find(item => item.id === action.payload.id);

    if (!found) {
      const items = [...state.items, action.payload];
      return {
        ...state,
        items,
        counter: items.length
      };
    }
  }

  if (action.type === REMOVE_ITEM) {
    const items = state.items.filter(e => e.id !== action.payload.id);

    return {
      ...state,
      items,
      counter: items.length
    };
  }

  if (action.type === CLEAR_WISHLIST) {
    return initialState;
  }

  return state;
};
