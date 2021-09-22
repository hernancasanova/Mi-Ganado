import { call, put, takeEvery } from 'redux-saga/effects';
import {
  ARETE_CREATE_REQUEST,
  ARETE_CREATE_SUCCESS,
  ARETE_CREATE_FAILED,
} from '../actionstypes/types';
import { post } from '../services/api';

function* crearArete({ payload }) {
  try {
    var datosArete = new FormData();
    datosArete.append('numero', payload.numero);
    datosArete.append('vacuno_id', payload.vacuno_id);
    datosArete.append('fecha_colocacion', payload.fecha_colocacion);
    const url = 'api/aretes';
    const data = yield call(post, url, datosArete);
    yield put({ type: ARETE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: ARETE_CREATE_FAILED, payload: error });
  }
}

export const aretesSagas = [takeEvery(ARETE_CREATE_REQUEST, crearArete)];
