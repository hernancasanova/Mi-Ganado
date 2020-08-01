import {
    AUTH_SIGNIN
  } from '../actionstypes/auth';
export const signIn = (email, password) => ({
    type: AUTH_SIGNIN,
    payload: { email, password }
  });