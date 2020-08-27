import {
  AUTH_EMAIL_CHANGED,
  AUTH_PASSWORD_CHANGED,
  AUTH_SIGNIN,
  AUTH_REGISTER,
  AUTH,
  AUTH_REQUEST_FAILED,
  AUTH_REQUEST_SUCCESS,
} from '../actionstypes/types';

export const emailAuthChanged = text => ({
  type: AUTH_EMAIL_CHANGED,
  payload: text
});

export const passwordAuthChanged = text => ({
  type: AUTH_PASSWORD_CHANGED,
  payload: text
});

export const signIn = (email, password) => ({
  type: AUTH_SIGNIN,
  payload: { email, password }
});

export const register = (username, email, password) => ({
  type: AUTH_REGISTER,
  payload: { username, email, password }
});

export const auth = () => ({
  type: AUTH,
  payload: {  }
});

