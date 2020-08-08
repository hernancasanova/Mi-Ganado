/* eslint-disable no-undef */
import { push } from 'react-router-redux';
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  AUTH_SIGNIN,AUTH_REQUEST_SUCCESS,AUTH_REQUEST_FAILED
} from '../actionstypes/types';
import { post } from '../services/api';
//import history from '../history';
import PATHS from '../paths';

function* signIn({ payload }) {
  try {
    const data = {
      email: payload.email,
      password: payload.password
    };
    const response = yield call(post, 'auth/login', data);
    localStorage.setItem('token', response.data.access_token);
    localStorage.setItem('token.expiresIn', response.data.expires_in);
    yield put({ type: AUTH_REQUEST_SUCCESS, payload: response.data });
    yield put({ type: MODAL_LOGIN_IS_OPEN });
    yield put(push(PATHS.HOME));
  } catch (error) {
    yield put({ type: AUTH_REQUEST_FAILED, payload: error.data });
    localStorage.removeItem('token');
  }
}


export const authSagas = [
  takeLatest(AUTH_SIGNIN, signIn)
];
