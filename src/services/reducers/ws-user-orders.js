import {
  WS_USER_SUCCESS,
  WS_USER_ERROR,
  WS_USER_CLOSED,
  WS_USER_ORDERS,
} from '../actions/ws-user-orders';

const wsUserOrdersInitialState = {
  isUserConnection: false,
  userConnectionError: null,
  userOrders: null
};

export const wsUserOrdersReducer = (state = wsUserOrdersInitialState, action) => {
  switch (action.type) {
    case WS_USER_SUCCESS:
      return {
        ...state,
        isUserConnection: true,
        userConnectionError: null,
      };
    case WS_USER_ERROR:
      return {
        ...state,
        isUserConnection: false,
        userConnectionError: action.payload,
        userOrders: null,
      };
    case WS_USER_CLOSED:
      return {
        ...state,
        isUserConnection: false,
        userConnectionError: null,
        userOrders: null,
      };
    case WS_USER_ORDERS:
      const userOrders = action.payload;
      return {
        ...state,
        userOrders: {
          ...userOrders,
          orders: userOrders.orders.reverse(),
        },
      };
    default:
      return state;
  }
};
