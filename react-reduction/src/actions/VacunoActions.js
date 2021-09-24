import {
  VACUNO_LIST_REQUEST,
  TIPOS_VACUNOS_LIST_REQUEST,
  VACUNO_SELECTED,
  RESET,
  VACUNO_CREATE_REQUEST,
  VACUNO_EDIT_REQUEST,
  VACUNO_DELETE_REQUEST,
  //VACUNO_CREATE_REQUEST,
  //VACUNO_EDIT_REQUEST,
} from '../actionstypes/types';

export const listadoAnimales = () => ({
  type: VACUNO_LIST_REQUEST,
  payload: {},
});

export const listadoTiposVacunos = () => ({
  type: TIPOS_VACUNOS_LIST_REQUEST,
  payload: {},
});

export const eliminarVacuno = id => ({
  type: VACUNO_DELETE_REQUEST,
  payload: id,
});

export const crearEditarVacuno = (
  id,
  nombre,
  fecha_nacimiento,
  sexo,
  tipo,
  color,
  estado,
  fechaVenta,
  imagen,
  accion,
) => ({
  type:
    accion === VACUNO_CREATE_REQUEST
      ? VACUNO_CREATE_REQUEST
      : VACUNO_EDIT_REQUEST,
  payload: {
    id,
    nombre,
    fecha_nacimiento,
    sexo,
    tipo,
    color,
    estado,
    fechaVenta,
    imagen,
    accion,
  },
});

export const vacunoSeleccionado = vacunoSeleccionado => ({
  type: VACUNO_SELECTED,
  payload: vacunoSeleccionado,
});

export const reset = () => ({
  type: RESET,
});
