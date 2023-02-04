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

const constructorInitialState = {
  data: [],
};

/*const currentIngredientDetailsInitialState = {
  _id: ingredientsInitialState.ingredients[0]._id,
  image_large: ingredientsInitialState.ingredients[0].image_large,
  name: ingredientsInitialState.ingredients[0].name,
  calories: ingredientsInitialState.ingredients[0].calories,
  proteins: ingredientsInitialState.ingredients[0].proteins,
  fat: ingredientsInitialState.ingredients[0].fat,
  carbohydrates: ingredientsInitialState.ingredients[0].carbohydrates,
};*/

const currentIngredientDetailsInitialState = [];

const orderDetailsInitialState = {
  name: '',
  order: {
    number: 8888,
  },
  success: true,
  isLoading: false,
  isModalOrderDetails: false,
};

export const constructorReducer = (state = constructorInitialState, action) => {
  switch (action.type) {
    // Добавление новой задачи в список дел
    case GET_CONSTRUCTOR_LIST:
      //console.log(action);
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
};

export const currentIngredientDetailsReducer = (
  state = currentIngredientDetailsInitialState,
  action
) => {
  switch (action.type) {
    // Добавление новой задачи в список дел
    case ADD_CURRENT_INGREDIENT_DETAILS:
    /*return (...state,
        {  
          isLoading: false,
          hasError: false,        
        })
      */
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
