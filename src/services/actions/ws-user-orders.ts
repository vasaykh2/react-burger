import {
  TWsUserStartAction,
  TWsUserClosedAction,
} from '../../types/ws-user-orders';

export const WS_USER_START: 'WS_USER_START' = 'WS_USER_START';
export const WS_USER_SUCCESS: 'WS_USER_SUCCESS' = 'WS_USER_SUCCESS';
export const WS_USER_ERROR: 'WS_USER_ERROR' = 'WS_USER_ERROR';
export const WS_USER_CLOSED: 'WS_USER_CLOSED' = 'WS_USER_CLOSED';
export const WS_USER_ORDERS: 'WS_USER_ORDERS' = 'WS_USER_ORDERS';

export const startUserWsConnection = (token: string): TWsUserStartAction => {
  return {
    type: WS_USER_START,
    payload: `?token=${token}`,
  };
};

export const closeUserWsConnection = (): TWsUserClosedAction => {
  return {
    type: WS_USER_CLOSED,
  };
};
