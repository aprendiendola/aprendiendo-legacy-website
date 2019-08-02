import services from 'services';

const initialState = {
  courses: []
};

const SET_COURSES = 'ap/progress/SET_COURSES';
const UPDATE_COURSE = 'ap/progress/UPDATE_COURSE';
const SAVE_COURSE = 'ap/progress/SAVE_COURSE';
const CLEAR_PROGRESS = 'ap/progress/CLEAR_PROGRESS';

/** Actions */
export const setCourses = () => async (dispatch, getState) => {
  const { token } = getState().auth;

  if (token) {
    // const response = await services.getProgressFromEnrollments(token);
    dispatch({ type: SET_COURSES, payload: [] });
  }
};

export const saveCourse = course => dispatch => {
  dispatch({
    type: SAVE_COURSE,
    payload: course
  });
};

export const updateCourse = course => dispatch =>
  dispatch({
    type: UPDATE_COURSE,
    payload: course
  });

export const clearProgress = () => ({
  type: CLEAR_PROGRESS
});

/** Reducers */
export default (state = initialState, action = {}) => {
  if (action.type === SET_COURSES) {
    return {
      ...state,
      courses: action.payload
    };
  }

  if (action.type === SAVE_COURSE) {
    const found = state.courses.find(({ courseId }) => action.payload.courseId === courseId);
    return {
      ...state,
      courses: found ? state.courses : state.courses.push(action.payload)
    };
  }

  if (action.type === UPDATE_COURSE) {
    const updatedList = state.courses.map(item => {
      return item.id === action.payload.id ? action.payload : item;
    });

    return {
      ...state,
      courses: updatedList
    };
  }

  if (action.type === CLEAR_PROGRESS) {
    return {
      ...state,
      courses: []
    };
  }

  return state;
};
