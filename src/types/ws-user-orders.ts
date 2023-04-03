import { TWsOrders } from './ws-public-orders';

import {
  WS_USER_START,
  WS_USER_SUCCESS,
  WS_USER_ERROR,
  WS_USER_CLOSED,
  WS_USER_ORDERS,
} from '../services/actions/ws-user-orders';

export type TWsUserOrdersActions =
  | TWsUserStartAction
  | TWsUserSuccessAction
  | TWsUserErrorAction
  | TWsUserClosedAction
  | TWsUserOrdersAction;

export type TWsUserOrdersState = {
  isUserConnection: boolean;
  userConnectionError: null | Event;
  userOrders: TWsOrders | null;
};

export type TWsUserStartAction = {
  readonly type: typeof WS_USER_START;
  readonly payload: string;
};

type TWsUserSuccessAction = {
  readonly type: typeof WS_USER_SUCCESS;
};

type TWsUserErrorAction = {
  readonly type: typeof WS_USER_ERROR;
  readonly payload: Event;
};

export type TWsUserClosedAction = {
  readonly type: typeof WS_USER_CLOSED;
};

type TWsUserOrdersAction = {
  readonly type: typeof WS_USER_ORDERS;
  readonly payload: TWsOrders;
};
