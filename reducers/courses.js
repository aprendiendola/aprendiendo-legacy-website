import services from 'services';

export const SET_USER_ENROLLMENTS = 'ap/courses/SET_USER_ENROLLMENT';
export const CLEAR_USER_ENROLLMENTS = 'ap/courses/CLEAR_USER_ENROLLMENT';

export const getUserCourses = () => async (dispatch, getState) => {
  const { token } = getState().auth;

  if (token) {
    const response = await services.getUserAccess(token);
    dispatch({ type: SET_USER_ENROLLMENTS, payload: response });
  }
};

export const setUserEnrollments = enrollments => ({
  type: SET_USER_ENROLLMENTS,
  payload: enrollments
});

export const clearUserCourses = () => (dispatch, getState) => {
  dispatch({ type: CLEAR_USER_ENROLLMENTS });
};

const initialState = {
  userEnrollments: []
};

export default (state = initialState, action = {}) => {
  if (action.type === SET_USER_ENROLLMENTS) {
    return {
      ...state,
      userEnrollments: action.payload
    };
  }

  if (action.type === CLEAR_USER_ENROLLMENTS) {
    return {
      ...state,
      userEnrollments: []
    };
  }
  return state;
};
