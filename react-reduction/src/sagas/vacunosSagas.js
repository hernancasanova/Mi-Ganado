import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  VACUNO_LIST_REQUEST,
  VACUNO_LIST_FAILED,
  VACUNO_LIST_SUCCESS,
  TIPOS_VACUNOS_LIST_REQUEST,
  TIPOS_VACUNOS_LIST_SUCCESS,
  VACUNO_CREATE_REQUEST,
  VACUNO_CREATE_SUCCESS,
  VACUNO_CREATE_FAILED,
  VACUNO_DELETE_REQUEST,
  VACUNO_DELETE_SUCCESS,
  VACUNO_DELETE_FAILED,
  VACUNO_EDIT_REQUEST,
  VACUNO_EDIT_SUCCESS,
  VACUNO_EDIT_FAILED,
} from '../actionstypes/types';
import { post, get, del } from '../services/api';

function* index() {
  try {
    const request = {
      params: {},
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
      params: {},
    };
    const url = 'api/tiposvacunos';
    const data = yield call(get, url, request);
    yield put({
      type: TIPOS_VACUNOS_LIST_SUCCESS,
      payload: data.data.tiposVacunos,
    });
  } catch (error) {
    yield put({ type: VACUNO_LIST_FAILED, payload: error });
  }
}

function* crearVacuno({ payload }) {
  try {
    var datosVacuno = new FormData();
    datosVacuno.append('nombre', payload.nombre);
    datosVacuno.append('fecha_nacimiento', payload.fecha_nacimiento);
    datosVacuno.append('sexo', payload.sexo);
    datosVacuno.append('tipo_vacuno', payload.tipo);
    datosVacuno.append('color', payload.color);
    datosVacuno.append('estado', payload.estado);
    datosVacuno.append('fecha_venta', payload.fechaVenta);
    datosVacuno.append('imagen_vacuno', payload.imagen);
    const url = 'api/vacunos';
    const data = yield call(post, url, datosVacuno);
    yield put({ type: VACUNO_CREATE_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: VACUNO_CREATE_FAILED, payload: error.data.message });
  }
}

function* eliminarVacuno({ payload }) {
  try {
    var datosVacuno = new FormData();
    datosVacuno.append('id', payload);
    const url = `api/vacunos/${payload}`;
    const data = yield call(del, url, datosVacuno);
    yield put({ type: VACUNO_DELETE_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: VACUNO_DELETE_FAILED, payload: error });
  }
}

function* editarVacuno({ payload }) {
  try {
    var datosVacuno = new FormData();
    datosVacuno.append('id', payload.id);
    datosVacuno.append('nombre', payload.nombre);
    datosVacuno.append('fecha_nacimiento', payload.fecha_nacimiento);
    datosVacuno.append('sexo', payload.sexo);
    datosVacuno.append('tipo', payload.tipo);
    datosVacuno.append('color', payload.color);
    datosVacuno.append('estado', payload.estado);
    datosVacuno.append('fechaVenta', payload.fechaVenta);
    datosVacuno.append('imagen_vacuno', payload.imagen);
    datosVacuno.append('_method', 'PATCH');
    const url = `api/vacunos/${payload.id}`;
    const data = yield call(post, url, datosVacuno);
    yield put({ type: VACUNO_EDIT_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: VACUNO_EDIT_FAILED, payload: error });
  }
}

export const vacunoSagas = [
  takeLatest(VACUNO_LIST_REQUEST, index),
  takeEvery(TIPOS_VACUNOS_LIST_REQUEST, index2),
  takeEvery(VACUNO_CREATE_REQUEST, crearVacuno),
  takeEvery(VACUNO_DELETE_REQUEST, eliminarVacuno),
  takeEvery(VACUNO_EDIT_REQUEST, editarVacuno),
];
