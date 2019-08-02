import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducers from '../reducers';

const middlewares = [thunk];

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

const persistConfig = {
  key: 'root',
  storage
};

const initialState = {};

const persistedReducer = persistReducer(persistConfig, reducers);

const composedEnhancers = compose(
  applyMiddleware(...middlewares), // eslint-disable-next-line
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && process.env.NODE_ENV === 'development' // eslint-disable-next-line
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f
);

export const store = createStore(persistedReducer, initialState, composedEnhancers);
export const persistor = persistStore(store);
