import { combineReducers } from 'redux';
// import { reducer as burgerMenuReducer } from 'redux-burger-menu';
import AuthReducer from './AuthReducer';
import VacunoReducer from './VacunoReducer'
const rootReducer = () =>
  combineReducers({
    AuthReducer,
    VacunoReducer
  });

export default rootReducer;
