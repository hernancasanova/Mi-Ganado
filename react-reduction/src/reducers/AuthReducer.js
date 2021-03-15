/* eslint-disable no-undef */
import {
    AUTH_SIGNIN,
    AUTH_SIGNIN_FAILED,
    AUTH_SIGNIN_SUCCESS,
    AUTH_REGISTER,
    AUTH_REGISTER_FAILED,
    AUTH_REGISTER_SUCCESS,
    AUTH,
  } from '../actionstypes/types';
  
  const MODO_OFFLINE = true;
  
  const INITIAL_STATE = {
    email: '',
    password: '',
    api_token: '',
    errors: false,
    data: null,
    loading: false,
    user: MODO_OFFLINE
      ? {
          id: 1,
          name: 'Offline',
          email: 'modo@offline.com',
          verified: 1,
          admin: 0,
          avatar: 'default.png',
          role_id: 1,
          created_at: '2019-10-15 18:30:19',
          updated_at: '2019-10-15 18:30:19'
        }
      : null,
    isLoginModalOpen: false,
    isRegistered: false
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case AUTH_SIGNIN_FAILED:
        return {
          ...state,
          loading: false,
          errors:
            typeof action.payload !== 'undefined'
              ? action.payload
              : { error: 'Servidor en mantención temporalmente' },
          password: ''
        };
      case AUTH_SIGNIN_SUCCESS:
        console.log("AUTH DESDE REDUCER AUTH_SIGNIN_SUCCESS");
        return {
          ...state,
          // ...INITIAL_STATE,
          //data: action.payload,
          //username: action.payload.user,
          email: action.payload.email,
          password: action.payload.password,
          api_token: action.payload.api_token,
          loading: false,
          // tokenRefresh: action.payload.token.refreshToken,
          // tokenType: action.payload.token.tokenType,
          // expiresIn: action.payload.token.expiresIn,
        };
      
      case AUTH_REGISTER:
        console.log("AUTH DESDE REDUCER AUTH_REGISTER");
        return {...state, loading: true, errors: false};
      case AUTH_REGISTER_FAILED:
        console.log("AUTH DESDE REDUCER AUTH_REGISTER_FAILED");
        return {...state, loading: false, errors: true};
      case AUTH_REGISTER_SUCCESS:
        console.log("USUARIO REGISTRADO CON EXITO");
        return {...state, 
          loading: false,
          errors: false,
          isRegistered: true
        };
      case AUTH:
        return {
          ...state,
          isRegistered:false
        };
      case AUTH_SIGNIN:
        console.log("AUTH DESDE REDUCER AUTH_SIGNIN");
        return { ...state, loading: true, errors: false };
      default:
        return state;
    }
  };
  