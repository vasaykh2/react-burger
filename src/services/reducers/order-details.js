//import React from 'react';

import {
  UPDATE_ORDER_DETAILS,
  UPDATE_ORDER_DETAILS_SUCCESS,
  UPDATE_ORDER_DETAILS_REQUEST,
  UPDATE_ORDER_DETAILS_FAILED,
} from '../actions/order-details';

const orderDetailsInitialState = {
  orderNumber: null,
  isLoading: false,
  isModalOrderDetails: false,
  success: true,
};

export const orderDetailsReducer = (
  state = orderDetailsInitialState,
  action
) => {
  switch (action.type) {
    case UPDATE_ORDER_DETAILS: {
      return {
        ...state,
        isLoading: false,
        isModalOrderDetails: false,
      };
    }
    case UPDATE_ORDER_DETAILS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isModalOrderDetails: false,
      };
    }
    case UPDATE_ORDER_DETAILS_SUCCESS: {
      //console.log(action);
      return {
        ...state,
        order: action.result.order,
        isLoading: false,
        isModalOrderDetails: true,
      };
    }
    case UPDATE_ORDER_DETAILS_FAILED: {
      return {
        ...state,
        success: false,
        isLoading: false,
        isModalOrderDetails: false,
      };
    }
    default: {
      return state;
    }
  }
};

/*const orderDetailses = {
    name: '',
    order: {
      number: 8888,
    },
    success: true,
    isLoading: false,
    isModalOrderDetails: false,
  }*/
