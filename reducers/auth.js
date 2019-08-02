import Axios from 'axios';
import m from 'moment';
import { setUserData } from 'utils/cookieHandler';
import service from 'services';
import { loadWishlist } from './wishlist';
import { SET_USER_ENROLLMENTS } from './courses';

// Constants
const ON_AUTH_SUCCESS = 'ap/auth/ON_AUTH_SUCCESS';
const ON_AUTH_FAILURE = 'ap/auth/ON_AUTH_FAILURE';
const ON_REFRESH_TOKEN_SUCCESS = 'ap/auth/ON_REFRESH_TOKEN_SUCCESS';
const ON_REFRESH_TOKEN_FAILURE = 'ap/auth/ON_REFRESH_TOKEN_FAILURE';
const SCHEDULE_REFRESH_TOKEN = 'ap/auth/SCHEDULE_REFRESH_TOKEN';
const REDIRECT_TO_REGISTER = 'ap/auth/REDIRECT_TO_REGISTER';
const TO_INITIAL_STATE = 'ap/auth/TO_INITIAL_STATE';
const CLEAN_REDIRECT = 'ap/auth/CLEAN_REDIRECT';
const CLEAN_USER_SIGNINED = 'ap/auth/CLEAN_USER_SIGNINED';
const LOADING = 'ap/auth/LOADING';
const SET_TOKEN = 'ap/auth/SET_TOKEN';
const SET_USER = 'ap/auth/SET_USER';
const UNFREEZE_MODAL = 'ap/auth/UNFREEZE_MODAL';
const SEARCH_VALUE = 'ap/auth/SEARCH_VALUE';
const SUSPENDED_MODAL = 'ap/auth/SUSPENDED_MODAL';
const CHANGE_PLAN_MODAL = 'ap/auth/CHANGE_PLAN_MODAL';

export const TOKEN_REFRESH_TIME = process.env.REACT_APP_TOKEN_REFRESH_TIME || 2;

// Actions

// the logic below should be sync, but for some reason it
// doesn't seem to be. That's why it's promisified
export const loadUserFromStorage = () => dispatch =>
  new Promise(resolve => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token || token === '') {
      resolve({
        token: null,
        user: null
      });
    } else {
      dispatch({
        type: ON_AUTH_SUCCESS,
        payload: {
          token,
          user
        }
      });

      resolve({
        token,
        user
      });
    }
  });

export const refreshToken = () => async (dispatch, getState) => {
  const { auth } = getState();

  try {
    const response = await Axios({
      method: 'POST',
      url: `${process.env.REACT_APP_APRENDIENDO_API_URL}/api/auth/refresh`,
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    });

    const token = response.data.data.token.access_token;
    setUserData({
      token,
      lastTokenRefresh: m().format('YYYY-MM-DD HH:mm')
    });
    localStorage.setItem('token', token);
    localStorage.setItem('lastTokenRefresh', m().format('YYYY-MM-DD HH:mm'));

    dispatch({
      type: ON_REFRESH_TOKEN_SUCCESS,
      payload: {
        token
      }
    });
  } catch (error) {
    dispatch({
      type: ON_REFRESH_TOKEN_FAILURE
    });
  }
};

export const scheduleRefreshToken = () => (dispatch, getState) => {
  const { auth } = getState();
  clearInterval(auth.refreshTokenIntervalId);

  dispatch({
    type: SCHEDULE_REFRESH_TOKEN,
    payload: {
      refreshTokenIntervalId: setInterval(
        () => refreshToken()(dispatch, getState),
        1000 * 60 * TOKEN_REFRESH_TIME
      )
    }
  });
};

/**
 * Sends shopping cart items in order to persist them into database,
 * gets data of authenticated user,
 * gets enrollments of the authenticated user,
 * dispatches redux actions and
 * Schedule refresh token
 */
async function actionsPostLogin(token, dispatch, getState) {
  // Get logged off cart items and update cart
  const shoppingCartItems = getState().shoppingCart.items;

  if (shoppingCartItems.length > 0) {
    await service.updateCart(
      {
        items: shoppingCartItems
      },
      token
    );
  }

  if (localStorage.getItem('referral_id')) {
    service.attachReferrer(token, localStorage.getItem('referral_id'));
    localStorage.clear('referral_id');
  }

  const getAuthenticatedUserPromise = service.getAuthenticatedUser(token);
  const getUserAccessPromise = service.getUserAccess(token);

  const user = await getAuthenticatedUserPromise;
  const userEnrollments = await getUserAccessPromise;

  setUserData({
    token,
    lastTokenRefresh: m().format('YYYY-MM-DD HH:mm'),
    user: JSON.stringify(user)
  });

  mixpanel.register({
    email: user.email,
    career: user.career_name,
    university: user.university_name
  });
  mixpanel.identify(user.email);
  mixpanel.people.set({
    email: user.email,
    career: user.career_name,
    university: user.university_name
  });

  localStorage.setItem('token', token);
  localStorage.setItem('lastTokenRefresh', m().format('YYYY-MM-DD HH:mm'));
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('country_code', user.country_code);

  dispatch({
    type: ON_AUTH_SUCCESS,
    payload: {
      token,
      user
    }
  });

  dispatch({
    type: SET_USER_ENROLLMENTS,
    payload: userEnrollments
  });

  scheduleRefreshToken()(dispatch, getState);
}

export const updateUser = (token, user) => async dispatch => {
  dispatch({
    type: ON_AUTH_SUCCESS,
    payload: {
      token,
      user
    }
  });
};

export const updateFullUser = token => async (dispatch, getState) => {
  try {
    const data = await service.getAuthenticatedUser(token);
    dispatch({
      type: ON_AUTH_SUCCESS,
      payload: {
        token,
        user: data
      }
    });
  } catch (err) {
    console.log('Error: updating user');
  }
};

export const login = ({ email, password }) => async (dispatch, getState) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const { data } = await Axios({
      method: 'POST',
      url: `${process.env.REACT_APP_APRENDIENDO_API_URL}/api/auth/login`,
      data: {
        email,
        password
      }
    });
    const token = data.data.access_token;
    await actionsPostLogin(token, dispatch, getState);
  } catch (err) {
    dispatch({
      type: ON_AUTH_FAILURE,
      payload:
        err && (err.response.status === 401 ? 'El correo o contraseña que ingresaste no es correcto' : '')
    });
  } finally {
    dispatch({ type: LOADING, payload: false });
  }
};

export const setTokenUser = (token, user) => ({
  type: ON_AUTH_SUCCESS,
  payload: {
    token,
    user
  }
});

export const setToken = token => ({
  type: SET_TOKEN,
  payload: token
});

export const setUser = user => ({
  type: SET_USER,
  payload: user
});

export const loginFacebook = ({
  userID,
  accessToken,
  first_name: name,
  email,
  picture,
  last_name: lastName
}) => async (dispatch, getState) => {
  if (!userID) {
    localStorage.setItem('facebookId', userID);
    return null;
  }
  try {
    const { data } = await Axios({
      method: 'POST',
      url: `${process.env.REACT_APP_APRENDIENDO_API_URL}/api/auth/facebook/login`,
      data: {
        access_token: accessToken,
        facebook_id: userID,
        avatar: typeof picture === 'string' ? picture : picture.data.url
      }
    });
    const token = data.data.access_token;
    await actionsPostLogin(token, dispatch, getState);
    localStorage.setItem('facebookId', userID);
  } catch (err) {
    if (err.response.status === 404) {
      dispatch({
        type: REDIRECT_TO_REGISTER,
        payload: {
          name,
          lastName,
          email,
          facebookId: userID,
          avatar: picture.data.url,
          accessToken
        }
      });
    }
    if (err.response.status === 401) {
      dispatch({
        type: ON_AUTH_FAILURE,
        payload: 'Hubo un problema con tu usuario, vuelve a intentarlo'
      });
    }
  }
};

export const loginGoogle = props => async (dispatch, getState) => {
  const { googleId, accessToken, profileObj } = props;
  const {
    givenName, familyName, email, imageUrl
  } = profileObj;

  if (!googleId) {
    localStorage.setItem('googleId', googleId);
    return null;
  }

  try {
    const { data } = await Axios({
      method: 'POST',
      url: `${process.env.REACT_APP_APRENDIENDO_API_URL}/api/auth/gmail/login`,
      data: {
        access_token: accessToken,
        gmail_id: googleId,
        avatar: imageUrl
      }
    });
    const token = data.data.access_token;
    await actionsPostLogin(token, dispatch, getState);
    localStorage.setItem('googleId', googleId);
  } catch (err) {
    if (err.response.status === 404) {
      dispatch({
        type: REDIRECT_TO_REGISTER,
        payload: {
          name: givenName,
          lastName: familyName,
          email,
          googleId,
          avatar: imageUrl,
          accessToken
        }
      });
    }
    if (err.response.status === 401) {
      dispatch({
        type: ON_AUTH_FAILURE,
        payload: 'Hubo un problema con tu usuario, vuelve a intentarlo'
      });
    }
  }
};

export const verifyEmailActionCreator = payload => async (dispatch, getState) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const response = await service.verifyEmail(payload);
    if (response.data) {
      await actionsPostLogin(response.data.access_token, dispatch, getState);
    }
  } catch (err) {
    dispatch({
      type: ON_AUTH_FAILURE,
      payload: err && (err.response.status === 401 ? 'Código incorrecto' : '')
    });
  } finally {
    dispatch({ type: LOADING, payload: false });
  }
};

export const authToInitialState = () => ({
  type: TO_INITIAL_STATE
});

export const cleanRedirect = () => ({
  type: CLEAN_REDIRECT
});

export const cleanUserSignIn = () => ({
  type: CLEAN_USER_SIGNINED
});

export const loading = () => ({
  type: CLEAN_USER_SIGNINED
});

export const setUnFreezeModal = payload => dispatch => {
  dispatch({ type: UNFREEZE_MODAL, payload });
};

export const setSearchLessonValue = payload => dispatch => {
  dispatch({ type: SEARCH_VALUE, payload });
};

export const setSuspendedModal = payload => dispatch => {
  dispatch({ type: SUSPENDED_MODAL, payload });
};

export const setChangePlanModal = payload => dispatch => {
  dispatch({ type: CHANGE_PLAN_MODAL, payload });
};

const initialState = {
  token: null,
  refreshingToken: true,
  user: null,
  authError: null,
  googleClientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  facebookAppId: process.env.REACT_APP_FACEBOOK_APP_ID,
  redirectToRegister: false,
  socialData: null,
  userSignIn: false,
  loading: false,
  freezeModalActive: true,
  searchValue: '',
  suspendedModalActive: true,
  activeBarrier: {}
};

export default (state = initialState, action = {}) => {
  if (action.type === ON_AUTH_SUCCESS) {
    return {
      ...state,
      token: action.payload.token,
      user: action.payload.user,
      userSignIn: true
    };
  }

  if (action.type === ON_AUTH_FAILURE) {
    return {
      ...state,
      authError: action.payload
    };
  }

  if (action.type === SET_USER) {
    return {
      ...state,
      user: action.payload
    };
  }

  if (action.type === SCHEDULE_REFRESH_TOKEN) {
    return {
      ...state,
      refreshTokenIntervalId: action.payload.refreshTokenIntervalId
    };
  }

  if (action.type === ON_REFRESH_TOKEN_SUCCESS) {
    return {
      ...state,
      token: action.payload.token,
      refreshingToken: false
    };
  }

  if (action.type === ON_REFRESH_TOKEN_FAILURE) {
    return {
      ...state,
      refreshingToken: false
    };
  }

  if (action.type === REDIRECT_TO_REGISTER) {
    return {
      ...state,
      redirectToRegister: true,
      socialData: action.payload
    };
  }

  if (action.type === TO_INITIAL_STATE) {
    return initialState;
  }

  if (action.type === CLEAN_REDIRECT) {
    return {
      ...state,
      redirectToRegister: false
    };
  }

  if (action.type === CLEAN_USER_SIGNINED) {
    return {
      ...state,
      userSignIn: false
    };
  }

  if (action.type === LOADING) {
    return {
      ...state,
      loading: action.payload
    };
  }

  if (action.type === SET_TOKEN) {
    return {
      ...state,
      token: action.payload
    };
  }

  if (action.type === UNFREEZE_MODAL) {
    return {
      ...state,
      freezeModalActive: action.payload
    };
  }
  if (action.type === SEARCH_VALUE) {
    return {
      ...state,
      searchValue: action.payload
    };
  }

  if (action.type === SUSPENDED_MODAL) {
    return {
      ...state,
      suspendedModalActive: action.payload
    };
  }

  if (action.type === CHANGE_PLAN_MODAL) {
    return {
      ...state,
      activeBarrier: action.payload
    };
  }

  return state;
};
