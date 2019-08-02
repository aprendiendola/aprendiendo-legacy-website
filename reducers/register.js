import Axios from 'axios';
import facebookPixel from 'utils/facebook';
import ReactGA from 'react-ga';
import service from 'services';

import { setToken } from './auth';

const LOAD_UNIVERSITIES_SUCCESS = 'ap/register/LOAD_UNIVERSITIES_SUCCESS';
const LOAD_UNIVERSITIES_FAILURE = 'ap/register/LOAD_UNIVERSITIES_FAILURE';
const LOAD_CAREERS_SUCCESS = 'ap/register/LOAD_CAREERS_SUCCESS';
const LOAD_CAREERS_FAILURE = 'ap/register/LOAD_CAREERS_FAILURE';
const ON_REGISTER_SUCCESS = 'ap/register/ON_REGISTER_SUCCESS';
const ON_REGISTER_FAILURE = 'ap/register/ON_REGISTER_FAILURE';
const CLEAR_USER_CREATED = 'ap/register/CLEAR_USER_CREATED';
const CLEAR_ERROR_MESSAGES = 'ap/register/CLEAR_ERROR_MESSAGES';
const SET_REGISTER_SOURCE = 'ap/register/SET_REGISTER_SOURCE';
const LOADING = 'ap/register/LOADING';

const REGISTER_ERROR_MESSAGE = 'Hubo un error al registrar el usuario';

const flatErrors = errors => [].concat.apply([], Object.values(errors));

export const loadUniversities = () => dispatch => {
  Axios({
    method: 'GET',
    url: `${process.env.REACT_APP_APRENDIENDO_API_URL}/api/universities?search=country_id:${
      service.getCountry().id
    }`
  })
    .then(response => {
      dispatch({
        type: LOAD_UNIVERSITIES_SUCCESS,
        payload: response.data.data
      });
    })
    .catch(err => {
      dispatch({
        type: LOAD_UNIVERSITIES_FAILURE,
        payload: err
      });
    });
};

export const loadCareers = university => dispatch => {
  Axios({
    method: 'GET',
    url: `${process.env.REACT_APP_APRENDIENDO_API_URL}/api/careers?university=${university}`
  })
    .then(response => {
      dispatch({
        type: LOAD_CAREERS_SUCCESS,
        payload: response.data.data
      });
    })
    .catch(err => {
      dispatch({
        type: LOAD_CAREERS_FAILURE,
        payload: err
      });
    });
};

export const setRegisterSource = paylaod => dispatch => {
  dispatch({
    type: SET_REGISTER_SOURCE,
    payload: paylaod
  });
};

const registerFailed = paylaod => ({
  type: ON_REGISTER_FAILURE,
  payload: paylaod
});

export const registerActionCreator = user => async dispatch => {
  dispatch({ type: LOADING, payload: true });
  await Axios({
    method: 'POST',
    url: `${process.env.REACT_APP_APRENDIENDO_API_URL}/api/users/register`,
    data: {
      country_code: service.getCountry().countryCode,
      email: user.email,
      name: user.name,
      last_name: user.lastname,
      password: user.password,
      university_id: user.university,
      career_id: user.career,
      phone: user.cellphone
    }
  })
    .then(async response => {
      if (Object.prototype.hasOwnProperty.call(response, 'data')) {
        dispatch({
          type: ON_REGISTER_SUCCESS,
          payload: {
            userCreated: true
          }
        });

        const token = response.data.data.access_token;

        dispatch(setToken(token));

        facebookPixel.signup({
          status: true
        });
        ReactGA.ga('send', {
          hitType: 'event',
          eventCategory: 'auth',
          eventAction: 'register',
          eventLabel: 'New users'
        });
        mixpanel.track('register', {
          email: user.email
        });

        if (user.referral_id) {
          service.attachReferrer(token, user.referral_id);
        }
      } else {
        dispatch(registerFailed(REGISTER_ERROR_MESSAGE));
      }
    })
    .catch(err => {
      const { response } = err;
      const errors = flatErrors(response.data.errors);

      dispatch(registerFailed(errors || REGISTER_ERROR_MESSAGE));
    })
    .finally(() => dispatch({ type: LOADING, payload: false }));
};

export const clearUserCreated = () => ({
  type: CLEAR_USER_CREATED
});

export const clearErrorMessages = () => ({
  type: CLEAR_ERROR_MESSAGES
});

const initialState = {
  universities: null,
  careers: null,
  userCreated: false,
  registerErrorMessages: [],
  loading: false,
  registerSource: null
};

export default (state = initialState, action = {}) => {
  if (action.type === LOAD_UNIVERSITIES_SUCCESS) {
    return {
      ...state,
      universities: action.payload.sort((a, b) => a.name > b.name)
    };
  }
  if (action.type === LOAD_CAREERS_SUCCESS) {
    return {
      ...state,
      careers: action.payload.sort((a, b) => a.name > b.name)
    };
  }
  if (action.type === ON_REGISTER_SUCCESS) {
    return {
      ...state,
      userCreated: true
    };
  }
  if (action.type === ON_REGISTER_FAILURE) {
    return {
      ...state,
      userCreated: false,
      registerErrorMessages: action.payload
    };
  }
  if (action.type === CLEAR_USER_CREATED) {
    return {
      ...state,
      userCreated: false
    };
  }
  if (action.type === CLEAR_ERROR_MESSAGES) {
    return {
      ...state,
      registerErrorMessages: []
    };
  }
  if (action.type === LOADING) {
    return {
      ...state,
      loading: action.payload
    };
  }
  if (action.type === SET_REGISTER_SOURCE) {
    return {
      ...state,
      registerSource: action.payload
    };
  }

  return state;
};
