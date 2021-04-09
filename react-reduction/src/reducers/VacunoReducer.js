/* eslint-disable no-undef */
import {
    VACUNO_LIST_REQUEST, VACUNO_LIST_SUCCESS, TIPOS_VACUNOS_LIST_REQUEST, TIPOS_VACUNOS_LIST_SUCCESS
  } from '../actionstypes/types';
  
  
  const INITIAL_STATE = {
    vacunos:[],
    tipos_vacunos:[],
    url_imagenes: "http://localhost:8000/storage/imagenes/"
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case VACUNO_LIST_REQUEST:
        console.log("DESDE VACUNO REDUCER");
        return { ...state, muerto: false };
      case VACUNO_LIST_SUCCESS:
        return {...state, vacunos: action.payload};
        //return { ...state, vacunos: [action.payload, ...state.vacunos] };
      case TIPOS_VACUNOS_LIST_REQUEST:
        return {...state};
      case TIPOS_VACUNOS_LIST_SUCCESS:
        return {...state, tipos_vacunos: action.payload};
      default:
        return state;
    }
  };
