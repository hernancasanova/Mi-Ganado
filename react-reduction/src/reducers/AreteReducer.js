/* eslint-disable no-undef */
import {
  ARETE_CREATE_FAILED,
  ARETE_CREATE_SUCCESS,
  ARETE_CREATE_REQUEST,
} from '../actionstypes/types';
import { LOCATION_CHANGE } from 'react-router-redux';

const INITIAL_STATE = {
  aretes: [],
  loading: false,
  areteCreado: false,
  errores: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return { ...state, areteCreado: false, loading: false, errores: '' };
    case ARETE_CREATE_REQUEST:
      return { ...state, loading: true, areteCreado: false };
    case ARETE_CREATE_SUCCESS:
      return { ...state, loading: false, areteCreado: true };
    case ARETE_CREATE_FAILED:
      return {
        ...state,
        loading: false,
        areteCreado: false,
        errores: action.payload,
      };
    default:
      return state;
  }
};
