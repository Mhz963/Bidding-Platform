import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import customConsole from './customConsole'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'

import rootSaga from './sagas/rootSaga'

/* Reducers imports */
import RootReducers from './reducer/rootReducer'

import App from './../src/Containers/App';
import Dashboard from './Containers/Dashboard';


/* Create SagaMiddleWare from the factory function  'createSagaMiddleware' */
const sagaMiddleware = createSagaMiddleware();
const logger = createLogger({
    // ...options
  });


/* Create store and with reducers as first argument */
const store = createStore(RootReducers,  applyMiddleware(sagaMiddleware, logger))

//Start the SAGA
sagaMiddleware.run(rootSaga)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path={`/`} exact component={App}/>
                 <Route path={`/Dashboard`} exact component={Dashboard}/>
               {/* <Route path={`/teachers`} exact component={TeachersContainer}/> */}
            </Switch>
        </BrowserRouter>
    </Provider>
, document.getElementById('root'));
registerServiceWorker();
