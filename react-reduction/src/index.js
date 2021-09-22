import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/index'
import rootReducer from './reducers/index'
//import AuthReducer from './reducers/AuthReducer'
//import VacunoReducer from './reducers/VacunoReducer'
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import './styles.css';
import { createBrowserHistory } from 'history';


export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const store=createStore(rootReducer(history), composeWithDevTools(applyMiddleware(sagaMiddleware, routerMiddleware(history))));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <App history={history} />
    </Provider>, 
        document.getElementById('root'));
