/* eslint-disable no-undef */
import {
    VACUNO_LIST_REQUEST, VACUNO_LIST_SUCCESS
  } from '../actionstypes/types';
  
  
  const INITIAL_STATE = {
    vacunos:[],
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
      default:
        return state;
    }
  };
