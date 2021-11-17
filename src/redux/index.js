import {createStore, compose, applyMiddleware} from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import axiosMiddleware from 'redux-axios-middleware';
import logger from 'redux-logger';

import rootReducer from './reducers';

const client = axios.create({
  responseType: 'json',
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let middlewares = [thunk, axiosMiddleware(client)];

if (process.env.NODE_EN === 'production')
  middlewares = [...middlewares, logger];

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares)),
);
