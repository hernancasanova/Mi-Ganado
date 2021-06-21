import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  VACUNO_LIST_REQUEST,
  VACUNO_LIST_FAILED,
  VACUNO_LIST_SUCCESS,
  TIPOS_VACUNOS_LIST_REQUEST,
  TIPOS_VACUNOS_LIST_SUCCESS,
  VACUNO_CREATE_REQUEST,
  VACUNO_CREATE_SUCCESS
} from '../actionstypes/types';
import { post, get, put as putrequest } from '../services/api';

function* index({ payload }) {
  try {
    const request = {
      params: {}
    };
    const url = 'api/vacunos';
    const data = yield call(get, url, request);
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
    const url = 'api/tiposvacunos';
    const data = yield call(get, url, request);
    yield put({ type: TIPOS_VACUNOS_LIST_SUCCESS, payload: data.data.tiposVacunos });
  } catch (error) {
    yield put({ type: VACUNO_LIST_FAILED, payload: error });
  }
}

function* crearVacuno({payload}){
  try {
    var datosVacuno = new FormData();
    datosVacuno.append("nombre",payload.nombre);
    datosVacuno.append("fecha_nacimiento",payload.fecha_nacimiento);
    datosVacuno.append("sexo",payload.sexo);
    datosVacuno.append("tipo_vacuno",payload.tipo_vacuno);
    datosVacuno.append("raza",payload.raza);
    datosVacuno.append("estado",payload.estado);
    datosVacuno.append("fecha_venta",payload.fecha_venta);
    datosVacuno.append("imagen_vacuno",payload.imagen);
    const url = 'api/vacunos';
    const data = yield call(post, url, datosVacuno);
    yield put({ type: VACUNO_CREATE_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: VACUNO_LIST_FAILED, payload: error });
  }
}

export const vacunoSagas = [
  takeEvery(VACUNO_LIST_REQUEST, index),
  takeEvery(TIPOS_VACUNOS_LIST_REQUEST, index2),
  takeEvery(VACUNO_CREATE_REQUEST, crearVacuno)
];
