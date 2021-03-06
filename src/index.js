import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux' ;
import { Provider } from 'react-redux';
import reducer from './store/reducer';
import './index.css';
import App from './App';
import thunk from 'redux-thunk';
import {applyMiddleware, compose} from 'redux'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider> , document.getElementById('root'));
