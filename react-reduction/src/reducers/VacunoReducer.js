/* eslint-disable no-undef */
import {
    VACUNO_LIST_REQUEST, VACUNO_LIST_SUCCESS, VACUNO_LIST_FAILED, TIPOS_VACUNOS_LIST_REQUEST, TIPOS_VACUNOS_LIST_SUCCESS, VACUNO_CREATE_REQUEST, VACUNO_CREATE_SUCCESS, VACUNO_CREATE_FAILED
  } from '../actionstypes/types';
  
  
  const INITIAL_STATE = {
    vacunos:[],
    tipos_vacunos:[],
    url_imagenes: "http://localhost:8000/storage/imagenes/",
    loading: false,
    vacunosBuscados: false,
    vacunoCreated: false
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case VACUNO_CREATE_REQUEST:
        return { ...state, loading: true, vacunoCreated:false };
      case VACUNO_CREATE_SUCCESS:
        return {...state, loading:false, vacunoCreated:true};
      case VACUNO_CREATE_FAILED:
        return {...state, loading:false, vacunoCreated: false};
      case VACUNO_LIST_REQUEST:
        console.log("buscando vacunos");
        return { ...state, loading: true, vacunosBuscados: false };
      case VACUNO_LIST_FAILED:
        return { ...state, loading: false, vacunosBuscados: true };
      case VACUNO_LIST_SUCCESS:
        return {...state, vacunos: action.payload, loading:false, vacunosBuscados: true};
        //return { ...state, vacunos: [action.payload, ...state.vacunos] };
      case TIPOS_VACUNOS_LIST_REQUEST:
        return {...state};
      case TIPOS_VACUNOS_LIST_SUCCESS:
        return {...state, tipos_vacunos: action.payload};
      default:
        return state;
    }
  };
