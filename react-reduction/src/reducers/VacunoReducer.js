/* eslint-disable no-undef */
import {
    AUTH_EMAIL_CHANGED,
    AUTH_PASSWORD_CHANGED,
  } from '../actionstypes/types';
  
  
  const INITIAL_STATE = {
    diio: '',
    tipo_vacuno: '',
    muerto: false,
    vendido: false
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case AUTH_EMAIL_CHANGED:
        return { ...state, diio: action.payload, muerto: false };
      case AUTH_PASSWORD_CHANGED:
        return { ...state, tipo_vacuno: action.payload, muerto: false };
      default:
        return state;
    }
  };
  