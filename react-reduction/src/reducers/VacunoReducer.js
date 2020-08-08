/* eslint-disable no-undef */
import {
    AUTH_EMAIL_CHANGED,
    AUTH_PASSWORD_CHANGED,
  } from '../actionstypes/types';
  
  
  const INITIAL_STATE = {
    email: '',
    password: '',
    errors: false,
    isRegisterModalOpen: false
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case AUTH_EMAIL_CHANGED:
        return { ...state, email: action.payload, errors: false };
      case AUTH_PASSWORD_CHANGED:
        return { ...state, password: action.payload, errors: false };
      default:
        return state;
    }
  };
  