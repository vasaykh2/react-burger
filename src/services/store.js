import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducers';
import thunk from 'redux-thunk';
import { wsMiddleware } from './middlewares/ws-middleware';
import {
  WS_USER_START,
  WS_PUBLIC_START,
  WS_USER_SUCCESS,
  WS_PUBLIC_SUCCESS,
  WS_USER_ERROR,
  WS_PUBLIC_ERROR,
  WS_USER_CLOSED,
  WS_PUBLIC_CLOSED,
  WS_USER_ORDERS,
  WS_PUBLIC_ORDERS,
} from './actions/ws-orders';
import { ORDERS_URL } from '../utils/constants';

const wsUserActions = {
  wsInit: WS_USER_START,
  onOpen: WS_USER_SUCCESS,
  onClose: WS_USER_CLOSED,
  onError: WS_USER_ERROR,
  onMessage: WS_USER_ORDERS,
};

const wsPublicActions = {
  wsInit: WS_PUBLIC_START,
  onOpen: WS_PUBLIC_SUCCESS,
  onClose: WS_PUBLIC_CLOSED,
  onError: WS_PUBLIC_ERROR,
  onMessage: WS_PUBLIC_ORDERS,
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      wsMiddleware(ORDERS_URL, wsUserActions),
      wsMiddleware(`${ORDERS_URL}/all`, wsPublicActions)
    )
  )
);
