import {
    VACUNO_LIST_REQUEST,
    ARETE_CREATE_REQUEST,
    TIPOS_VACUNOS_LIST_REQUEST
  } from '../actionstypes/types';


  export const crearArete = (numero, vacuno_id, fecha_colocacion ) => ({
    type: ARETE_CREATE_REQUEST,
    payload: {numero, vacuno_id, fecha_colocacion}
  });
  