import Cookies from 'js-cookie';
import { USER_EXPIRATION_DAYS } from 'constants';

const setUserData = newValues => {
  const oldUserCookie = Cookies.getJSON('userSession') || {};
  const newUserCookie = Object.assign({}, oldUserCookie, newValues);
  Cookies.set('userSession', newUserCookie, {
    expires: USER_EXPIRATION_DAYS
  });
};

const setCookieData = (cookieName, cookieValue) => {
  const oldCookie = Cookies.getJSON(cookieName) || {};
  const newCookie = Object.assign({}, oldCookie, cookieValue);
  Cookies.set(cookieName, newCookie, {
    expires: USER_EXPIRATION_DAYS
  });
};

const getUserData = data => {
  const info = Cookies.getJSON('userSession') || {};
  let responseParsed = '';
  try {
    responseParsed = JSON.parse(info[data]);
  } catch (err) {
    responseParsed = data ? info[data] : info;
  }
  return responseParsed;
};

const getCookieData = (cookieName, data) => {
  const info = Cookies.getJSON(cookieName) || { data: [] };
  let responseParsed = '';
  try {
    responseParsed = JSON.parse(info[data]);
  } catch (err) {
    responseParsed = data ? info[data] : info;
  }
  return responseParsed;
};

export {
  setUserData,
  setCookieData,
  getUserData,
  getCookieData
};
