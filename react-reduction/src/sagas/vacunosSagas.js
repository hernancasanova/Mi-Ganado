import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  VACUNO_LIST_REQUEST,
  VACUNO_LIST_FAILED,
  VACUNO_LIST_SUCCESS,
  TIPOS_VACUNOS_LIST_REQUEST,
  TIPOS_VACUNOS_LIST_SUCCESS
} from '../actionstypes/types';
import { post, get, put as putrequest } from '../services/api';

function* index({ payload }) {
  try {
    const request = {
      params: {}
    };
    console.log("DESDE VACUNO SAGA");
    const url = 'api/vacunos';
    const data = yield call(get, url, request);
    console.log("DATA DE VACUNO SAGA: ",data.data.vacunos);
    yield put({ type: VACUNO_LIST_SUCCESS, payload: data.data.vacunos });
  } catch (error) {
    yield put({ type: VACUNO_LIST_FAILED, payload: error });
  }
}

function* index2({ payload }) {
  try {
    const request = {
      params: {}
    };
    console.log("DESDE VACUNO SAGA");
    const url = 'api/tiposvacunos';
    const data = yield call(get, url, request);
    console.log("DATA DE TIPOS_VACUNOS SAGA: ",data.data.tiposVacunos);
    yield put({ type: TIPOS_VACUNOS_LIST_SUCCESS, payload: data.data.tiposVacunos });
  } catch (error) {
    yield put({ type: VACUNO_LIST_FAILED, payload: error });
  }
}

export const vacunoSagas = [
  takeEvery(VACUNO_LIST_REQUEST, index),
  takeEvery(TIPOS_VACUNOS_LIST_REQUEST, index2),
];
