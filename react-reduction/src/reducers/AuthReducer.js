/* eslint-disable no-undef */
import {
    AUTH_SIGNIN,
    AUTH_REQUEST_FAILED,
    AUTH_REQUEST_SUCCESS,
  } from '../actionstypes/types';
  
  const MODO_OFFLINE = true;
  
  const INITIAL_STATE = {
    email: '',
    password: '',
    errors: false,
    data: null,
    loading: false,
    token: MODO_OFFLINE ? 'token-falso' : localStorage.getItem('token'),
    tokenRefresh: localStorage.getItem('token.refreshToken'),
    tokenType: localStorage.getItem('token.tokenType'),
    expiresIn: localStorage.getItem('token.expiresIn') ? localStorage.getItem('token.expiresIn') : 0,
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
    isRegisterModalOpen: false
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case AUTH_REQUEST_FAILED:
        return {
          ...state,
          loading: false,
          errors:
            typeof action.payload !== 'undefined'
              ? action.payload
              : { error: 'Servidor en mantención temporalmente' },
          password: ''
        };
      case AUTH_REQUEST_SUCCESS:
        return {
          ...state,
          // ...INITIAL_STATE,
          data: action.payload,
          user: action.payload.user,
          token: action.payload.access_token,
          loading: false,
          // tokenRefresh: action.payload.token.refreshToken,
          // tokenType: action.payload.token.tokenType,
          // expiresIn: action.payload.token.expiresIn,
          isLoginModalOpen: false // ← Revisar como quedó acá
        };
  
      case AUTH_SIGNIN:
        return { ...state, loading: true, errors: false };
      default:
        return state;
    }
  };
  