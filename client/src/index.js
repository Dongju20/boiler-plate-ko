import React from 'react';
import ReactDOM from 'react-dom';
import {legacy_createStore as createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise';
import { thunk as ReduxThunk } from 'redux-thunk';
import Reducer from './_reducers';
import App from './App';
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

ReactDOM.render(
  <Provider
      store={createStoreWithMiddleware(Reducer,
          window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )}
  >
      <App />
  </Provider>
  , document.getElementById('root'));
//what is hook, what is Functional redux

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

