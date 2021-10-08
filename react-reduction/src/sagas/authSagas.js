/* eslint-disable no-undef */
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  AUTH_SIGNIN,
  AUTH_SIGNIN_FAILED,
  AUTH_SIGNIN_SUCCESS,
  AUTH_REGISTER,
  AUTH_REGISTER_FAILED,
  AUTH_REGISTER_SUCCESS,
} from '../actionstypes/types';
import { post } from '../services/api';

function* signIn({ payload }) {
  try {
    const data = {
      email: payload.email,
      password: payload.password,
    };
    const response = yield call(post, 'api/login', data);
    if (response.status === 200) {
      localStorage.setItem('api_token', response.data.api_token);
    }
    //local
    //localStorage.setItem('token', response.data.access_token);
    //localStorage.setItem('token.expiresIn', response.data.expires_in);
    yield put({ type: AUTH_SIGNIN_SUCCESS, payload: response.data });
    //yield put({ type: MODAL_LOGIN_IS_OPEN });
    //yield put(push(PATHS.HOME));
  } catch (error) {
    yield put({ type: AUTH_SIGNIN_FAILED, payload: error.data });
    //localStorage.removeItem('token');
  }
}
function* register({ payload }) {
  try {
    const data = {
      username: payload.username,
      email: payload.email,
      password: payload.password,
    };
    const response = yield call(post, 'api/register', data);
    //localStorage.setItem('token', response.data.access_token);
    //localStorage.setItem('token.expiresIn', response.data.expires_in);
    yield put({ type: AUTH_REGISTER_SUCCESS, payload: response.data });
    //yield put({ type: MODAL_LOGIN_IS_OPEN });
    //yield put(push(PATHS.HOME));
  } catch (error) {
    yield put({ type: AUTH_REGISTER_FAILED, payload: error.data });
    //localStorage.removeItem('token');
  }
}

export const authSagas = [
  takeEvery(AUTH_SIGNIN, signIn),
  takeLatest(AUTH_REGISTER, register),
];
