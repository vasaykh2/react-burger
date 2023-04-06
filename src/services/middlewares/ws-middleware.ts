//import { Middleware, MiddlewareAPI } from 'redux';
import { WS_USER_START } from '../actions/ws-user-orders';
import {
  TWsMiddlewareActions,
  TWsPublicOrdersActions,
} from '../../types/ws-public-orders';
import { TWsUserOrdersActions } from '../../types/ws-user-orders';
import { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../types/store';

export const wsMiddleware = (
  wsUrl: string,
  wsActions: TWsMiddlewareActions
): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) =>
      (action: TWsPublicOrdersActions | TWsUserOrdersActions) => {
        const { dispatch /*getState*/ } = store;
        const { type /*payload*/ } = action;
        const { wsInit, onOpen, onClose, onError, onMessage, wsClose } =
          wsActions;
        if (type === wsInit) {
          socket =
            type === WS_USER_START && action.payload
              ? new WebSocket(`${wsUrl}${action.payload}`)
              : new WebSocket(wsUrl);
        }
        if (socket) {
          socket.onopen = (event) => {
            dispatch({ type: onOpen, payload: event });
          };

          socket.onerror = (event) => {
            dispatch({ type: onError, payload: event });
          };

          socket.onmessage = (event) => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            const { success, ...restParsedData } = parsedData;

            dispatch({ type: onMessage, payload: restParsedData });
          };

          socket.onclose = () => {
            dispatch({ type: onClose });
          };

          if (type === wsClose) {
            socket.close();
          }
        }

        next(action);
      };
  };
};
