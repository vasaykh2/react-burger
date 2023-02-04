import React from 'react';
import { applyMiddleware } from 'redux';

import { BASE_URL } from '../../utils/constants';
import { request } from '../../utils/request';

import {
  GET_INGREDIENTS_LIST_REQUEST,
  GET_INGREDIENTS_LIST_FAILED,
  GET_INGREDIENTS_LIST_SUCCESS,
  GET_CONSTRUCTOR_LIST,
  ADD_CURRENT_INGREDIENT_DETAILS,
  DELETE_CURRENT_INGREDIENT_DETAILS,
  UPDATE_ORDER_DETAILS,
} from '../actions/actions';

/*{
  calories: 420,
  carbohydrates: 53,
  fat: 24,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  name: 'Краторная булка N-200i',
  price: 1255,
  proteins: 80,
  type: 'bun',
  __v: 0,
  _id: '60d3b41abdacab0026a733c6',
},   */

const ingredientsInitialState = {
  ingredientsLoad: false,
  ingredientsFailed: false,
  ingredients: [],
};

export const ingredientsReducer = (state = ingredientsInitialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_LIST_REQUEST: {
      return {
        ...state,
        ingredientsLoad: true,
        ingredientsFailed: false,
      };
    }
    case GET_INGREDIENTS_LIST_SUCCESS: {
      return {
        ...state,
        ingredients: action.result,
        ingredientsLoad: false,
      };
    }
    case GET_INGREDIENTS_LIST_FAILED: {
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsLoad: false,
      };
    }
    default: {
      return state;
    }
  }
};
