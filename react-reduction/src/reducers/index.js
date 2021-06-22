import { combineReducers } from 'redux';
// import { reducer as burgerMenuReducer } from 'redux-burger-menu';
import AuthReducer from './AuthReducer'
import VacunoReducer from './VacunoReducer'
import { connectRouter } from 'connected-react-router'

const rootReducer = history =>
  combineReducers({
    auth: AuthReducer,
    vacuno: VacunoReducer,
    router: connectRouter(history)
  });


export default rootReducer;
