import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/index.scss'

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {rootReducer} from './store';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App /> 
  </Provider>, document.getElementById('root'));
serviceWorker.unregister();
