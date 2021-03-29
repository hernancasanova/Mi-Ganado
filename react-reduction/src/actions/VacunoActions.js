import {
    VACUNO_LIST_REQUEST,
    VACUNO_LIST_SUCCESS,
    VACUNO_LIST_FAILED
  } from '../actionstypes/types';

  export const listadoAnimales = () => ({
    type: VACUNO_LIST_REQUEST,
    payload: {}
  });
  