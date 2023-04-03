import {
  WS_PUBLIC_START,
  WS_PUBLIC_SUCCESS,
  WS_PUBLIC_ERROR,
  WS_PUBLIC_CLOSED,
  WS_PUBLIC_ORDERS,
} from '../services/actions/ws-public-orders';

import { TOrderInfo } from './order';

export type TWsMiddlewareActions = {
  wsInit: 'WS_USER_START' | 'WS_PUBLIC_START';
  onOpen: 'WS_USER_SUCCESS' | 'WS_PUBLIC_SUCCESS';
  onClose: 'WS_USER_CLOSED' | 'WS_PUBLIC_CLOSED';
  onError: 'WS_USER_ERROR' | 'WS_PUBLIC_ERROR';
  onMessage: 'WS_USER_ORDERS' | 'WS_PUBLIC_ORDERS';
  wsClose: 'WS_USER_CLOSED' | 'WS_PUBLIC_CLOSED';
};

export type TWsOrders = {
  orders: Array<TOrderInfo>;
  total: number;
  totalToday: number;
  message: string;
};

export type TWsPublicOrdersActions =
  | TWsPulicStartAction
  | TWsPulicSuccessAction
  | TWsPublicErrorAction
  | TWsPublicClosedAction
  | TWsPublicOrdersAction;

export type TWsPulicOrdersState = {
  isPublicConnection: boolean;
  publicConnectionError: null | Event;
  publicOrders: TWsOrders | null;
};

export type TWsPulicStartAction = {
  readonly type: typeof WS_PUBLIC_START;
};

type TWsPulicSuccessAction = {
  readonly type: typeof WS_PUBLIC_SUCCESS;
};

type TWsPublicErrorAction = {
  readonly type: typeof WS_PUBLIC_ERROR;
  readonly payload: Event;
};

export type TWsPublicClosedAction = {
  readonly type: typeof WS_PUBLIC_CLOSED;
};

type TWsPublicOrdersAction = {
  readonly type: typeof WS_PUBLIC_ORDERS;
  readonly payload: TWsOrders;
};
