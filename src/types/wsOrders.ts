import {
  WS_PUBLIC_START,
  WS_PUBLIC_SUCCESS,
  WS_PUBLIC_ERROR,
  WS_PUBLIC_CLOSED,
  WS_PUBLIC_ORDERS,
} from '../services/actions/ws-public-orders';

import {
  WS_USER_START,
  WS_USER_SUCCESS,
  WS_USER_ERROR,
  WS_USER_CLOSED,
  WS_USER_ORDERS,
} from '../services/actions/ws-user-orders';

import { TOrderInfo } from './order';

export type TWsOrdersActions =
  | TWsUserStartAction
  | TWsPulicStartAction
  | TWsUserSuccessAction
  | TWsPulicSuccessAction
  | TWsUserErrorAction
  | TWsPublicErrorAction
  | TWsUserClosedAction
  | TWsPublicClosedAction
  | TWsUserOrdersAction
  | TWsPublicOrdersAction;

export type TWsMiddlewareActions = {
  wsInit: 'WS_USER_START' | 'WS_PUBLIC_START';
  onOpen: 'WS_USER_SUCCESS' | 'WS_PUBLIC_SUCCESS';
  onClose: 'WS_USER_CLOSED' | 'WS_PUBLIC_CLOSED';
  onError: 'WS_USER_ERROR' | 'WS_PUBLIC_ERROR';
  onMessage: 'WS_USER_ORDERS' | 'WS_PUBLIC_ORDERS';
};

export type TWsOrders = {
  orders: Array<TOrderInfo>;
  total: number;
  totalToday: number;
  message: string;
};

export type TWsOrdersState = {
  isUserConnection: boolean;
  isPublicConnection: boolean;
  userConnectionError: null | Event;
  publicConnectionError: null | Event;
  userOrders: TWsOrders | null;
  publicOrders: TWsOrders | null;
};

export type TWsUserStartAction = {
  readonly type: typeof WS_USER_START;
  readonly payload: string;
};

export type TWsPulicStartAction = {
  readonly type: typeof WS_PUBLIC_START;
};

type TWsUserSuccessAction = {
  readonly type: typeof WS_USER_SUCCESS;
};

type TWsPulicSuccessAction = {
  readonly type: typeof WS_PUBLIC_SUCCESS;
};

type TWsUserErrorAction = {
  readonly type: typeof WS_USER_ERROR;
  readonly payload: Event;
};

type TWsPublicErrorAction = {
  readonly type: typeof WS_PUBLIC_ERROR;
  readonly payload: Event;
};

export type TWsUserClosedAction = {
  readonly type: typeof WS_USER_CLOSED;
};

export type TWsPublicClosedAction = {
  readonly type: typeof WS_PUBLIC_CLOSED;
};

type TWsUserOrdersAction = {
  readonly type: typeof WS_USER_ORDERS;
  readonly payload: TWsOrders;
};

type TWsPublicOrdersAction = {
  readonly type: typeof WS_PUBLIC_ORDERS;
  readonly payload: TWsOrders;
};
