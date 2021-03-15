/* eslint-disable no-undef */
import { push } from 'react-router-redux';
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  AUTH_SIGNIN,AUTH_REGISTER,AUTH_REGISTER_FAILED, AUTH_REGISTER_SUCCESS
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
    console.log("PAYLOAD:");
    console.log(payload);
    const response = yield call(post, 'api/login', data);
    console.log("response: ");
    console.log(response);
    //localStorage.setItem('token', response.data.access_token);
    //localStorage.setItem('token.expiresIn', response.data.expires_in);
    yield put({ type: AUTH_REQUEST_SUCCESS, payload: response.data });
    yield put({ type: MODAL_LOGIN_IS_OPEN });
    yield put(push(PATHS.HOME));
  } catch (error) {
    yield put({ type: AUTH_REQUEST_FAILED, payload: error.data });
    localStorage.removeItem('token');
  }
}
function* register({ payload }) {
  try {
    const data = {
      username:payload.username,
      email: payload.email,
      password: payload.password
    };
    console.log("PAYLOAD DESDE REGISTER SAGA:");
    console.log(payload);
    const response = yield call(post, 'api/register', data);
    console.log("response desde register saga: ");
    console.log(response.data);
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
  takeLatest(AUTH_SIGNIN, signIn),
  takeLatest(AUTH_REGISTER, register)
];
