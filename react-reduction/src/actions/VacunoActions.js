import {
    VACUNO_LIST_REQUEST,
    VACUNO_LIST_SUCCESS,
    VACUNO_LIST_FAILED,
    VACUNO_CREATE_REQUEST,
    TIPOS_VACUNOS_LIST_REQUEST
  } from '../actionstypes/types';

  export const listadoAnimales = () => ({
    type: VACUNO_LIST_REQUEST,
    payload: {}
  });

  export const listadoTiposVacunos = () => ({
    type: TIPOS_VACUNOS_LIST_REQUEST,
    payload: {}
  });

  export const crearVacuno = (numero, vacuno_id, fecha_colocacion ) => ({
    type: VACUNO_CREATE_REQUEST,
    payload: {numero, vacuno_id, fecha_colocacion}
  });
  