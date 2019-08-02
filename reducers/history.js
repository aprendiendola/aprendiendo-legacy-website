const SET_ROUTE = 'ap/history/SET_ROUTE';
const HISTORY_TO_INITIAL = 'ap/history/HISTORY_TO_INITIAL';

export const updateRoute = route => async dispatch => {
  dispatch({
    type: SET_ROUTE,
    payload: {
      route,
    }
  });
};


// Reducers
const initialState = {
  lastRoute: undefined
};


export const historyToInitialState = () => ({
  type: HISTORY_TO_INITIAL
});


export default (state = initialState, action = {}) => {
  if (action.type === SET_ROUTE) {
    return {
      ...state,
      lastRoute: action.payload
    };
  }

  if (action.type === HISTORY_TO_INITIAL) {
    return initialState;
  }


  return state;
};
