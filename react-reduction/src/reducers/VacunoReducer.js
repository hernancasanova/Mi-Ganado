/* eslint-disable no-undef */
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  VACUNO_LIST_REQUEST,
  VACUNO_LIST_SUCCESS,
  VACUNO_LIST_FAILED,
  RESET,
  TIPOS_VACUNOS_LIST_REQUEST,
  TIPOS_VACUNOS_LIST_SUCCESS,
  VACUNO_CREATE_REQUEST,
  VACUNO_CREATE_SUCCESS,
  VACUNO_CREATE_FAILED,
  VACUNO_EDIT_REQUEST,
  VACUNO_EDIT_SUCCESS,
  VACUNO_EDIT_FAILED,
  VACUNO_SELECTED,
} from '../actionstypes/types';
import { history } from '..';

const INITIAL_STATE = {
  vacunos: [],
  tipos_vacunos: [],
  url_imagenes: 'http://localhost:8000/storage/imagenes/',
  loading: false,
  vacunosBuscados: false,
  vacunoCreatedEdited: false,
  vacunoEditado: {
    id: 0,
    nombre: '',
    fecha_nacimiento: '',
    sexo: '',
    tipo: '',
    color: '',
    estado: '',
    fechaVenta: '',
    created_at: '',
    updated_at: '',
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      let url_actual = history.location.pathname;
      if (url_actual !== '/editar_vacuno') {
        let vacunoEditado = {
          id: 0,
          nombre: '',
          fecha_nacimiento: '',
          sexo: '',
          tipo: '',
          color: '',
          estado: '',
          fechaVenta: '',
          created_at: '',
          updated_at: '',
        };
        return {
          ...state,
          vacunosBuscados: false,
          vacunoCreatedEdited: false,
          loading: false,
          vacunoEditado,
          vacunos: [],
        };
      } else {
        return {
          ...state,
          vacunosBuscados: false,
          vacunoCreatedEdited: false,
          loading: false,
        };
      }
    case VACUNO_SELECTED:
      const {
        id,
        nombre,
        fecha_nacimiento,
        sexo,
        tipo,
        color,
        estado,
        fecha_venta,
      } = action.payload;
      return {
        ...state,
        vacunoEditado: {
          id,
          nombre,
          fecha_nacimiento,
          sexo,
          tipo,
          color,
          estado,
          fechaVenta: fecha_venta,
          created_at: '',
          updated_at: '',
        },
      };
    case VACUNO_CREATE_REQUEST:
      return { ...state, loading: true, vacunoCreatedEdited: false };
    case VACUNO_CREATE_SUCCESS:
      return { ...state, loading: false, vacunoCreatedEdited: true };
    case VACUNO_CREATE_FAILED:
      return { ...state, loading: false, vacunoCreatedEdited: false };
    case VACUNO_EDIT_REQUEST:
      return { ...state, loading: true, vacunoCreatedEdited: false };
    case VACUNO_EDIT_SUCCESS:
      return { ...state, loading: false, vacunoCreatedEdited: true };
    case VACUNO_EDIT_FAILED:
      return { ...state, loading: false, vacunoCreatedEdited: false };
    case RESET:
      return {
        ...state,
        loading: false,
        vacunoCreatedEdited: false,
        vacunosBuscados: false,
      };
    case VACUNO_LIST_REQUEST:
      return { ...state, loading: true, vacunosBuscados: false };
    case VACUNO_LIST_FAILED:
      return { ...state, loading: false, vacunosBuscados: true };
    case VACUNO_LIST_SUCCESS:
      return {
        ...state,
        vacunos: action.payload,
        loading: false,
        vacunosBuscados: true,
      };
    //return { ...state, vacunos: [action.payload, ...state.vacunos] };
    case TIPOS_VACUNOS_LIST_REQUEST:
      return { ...state, vacunosBuscados: false };
    case TIPOS_VACUNOS_LIST_SUCCESS:
      return { ...state, tipos_vacunos: action.payload };
    default:
      return state;
  }
};
