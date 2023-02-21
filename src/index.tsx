import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { compose, createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers/index';

const enhancer = applyMiddleware(thunk);

const store = createStore(rootReducer, composeWithDevTools(enhancer));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
  </BrowserRouter>
);

reportWebVitals();

/*const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose; 
const enhancer = composeEnhancers();



*/
