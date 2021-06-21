import {
    VACUNO_LIST_REQUEST,
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

  export const crearVacuno = (nombre, fecha_nacimiento, sexo, tipo_vacuno, raza, estado, fecha_venta, imagen ) => ({
    type: VACUNO_CREATE_REQUEST,
    payload: {nombre, fecha_nacimiento, sexo, tipo_vacuno, raza, estado, fecha_venta, imagen}
  });
  