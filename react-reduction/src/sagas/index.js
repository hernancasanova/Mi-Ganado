import { all } from 'redux-saga/effects';
import { authSagas } from './authSagas';
import { vacunoSagas } from './vacunosSagas';
import { aretesSagas } from './aretesSagas';

export default function* rootSaga() {
  yield all([...authSagas, ...vacunoSagas, ...aretesSagas]);
}
