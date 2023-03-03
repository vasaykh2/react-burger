import {
  WS_PUBLIC_SUCCESS,
  WS_PUBLIC_ERROR,
  WS_PUBLIC_CLOSED,
  WS_PUBLIC_ORDERS,
} from '../actions/ws-public-orders';

const wsPublicOrdersInitialState = {
  isPublicConnection: false,
  publicConnectionError: null,
  publicOrders: null,
};

export const wsPublicOrdersReducer = (state = wsPublicOrdersInitialState, action) => {
  switch (action.type) {
    case WS_PUBLIC_SUCCESS:
      return {
        ...state,
        isPublicConnection: true,
        publicConnectionError: null,
      };
    case WS_PUBLIC_ERROR:
      return {
        ...state,
        isPublicConnection: false,
        publicConnectionError: action.payload,
        publicOrders: null,
      };
    case WS_PUBLIC_CLOSED:
      return {
        ...state,
        isPublicConnection: false,
        publicConnectionError: null,
        publicOrders: null,
      };
    case WS_PUBLIC_ORDERS:
      return {
        ...state,
        publicOrders: action.payload,
      };
    default:
      return state;
  }
};
