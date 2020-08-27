import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  VACUNO_LIST_REQUEST,
  VACUNO_LIST_FAILED,
  VACUNO_LIST_SUCCESS
} from '../actionstypes/types';
import { post, get, put as putrequest } from '../services/api';

function* index({ payload }) {
  try {
    const request = {
      params: {}
    };
    const url = 'vacunos';
    const datas = yield call(get, url, request);
    yield put({ type: VACUNO_LIST_SUCCESS, payload: datas });
  } catch (error) {
    yield put({ type: VACUNO_LIST_FAILED, payload: error });
  }
}

export const vacunoSagas = [
  takeLatest(VACUNO_LIST_REQUEST, index)
];
