import React from 'react';
import { applyMiddleware } from 'redux';

import { BASE_URL } from '../../utils/constants';
import { request } from '../../utils/request';

import {
  GET_CONSTRUCTOR_LIST,
  ADD_CURRENT_INGREDIENT_DETAILS,
  DELETE_CURRENT_INGREDIENT_DETAILS,
  UPDATE_ORDER_DETAILS,
} from '../actions/actions';



const currentIngredientDetailsInitialState = [1];

const orderDetailsInitialState = {
  name: '',
  order: {
    number: 8888,
  },
  success: true,
  isLoading: false,
  isModalOrderDetails: false,
};


export const currentIngredientDetailsReducer = (
  state = currentIngredientDetailsInitialState,
  action
) => {
  switch (action.type) {
    // Добавление новой задачи в список дел
    case ADD_CURRENT_INGREDIENT_DETAILS:
      return {
        ...state,
        item: action.item,
      };
    case DELETE_CURRENT_INGREDIENT_DETAILS:
    /*return (...state,
              {  
                isLoading: false,
                hasError: false,        
              })
            */
    // Реакция на прочие типы экшенов
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = orderDetailsInitialState,
  action
) => {
  switch (action.type) {
    // Добавление новой задачи в список дел
    case UPDATE_ORDER_DETAILS:
    /*return (...state,
        {  
          isLoading: false,
          hasError: false,        
        })
      */
    // Реакция на прочие типы экшенов
    default:
      return state;
  }
};
