//import React from 'react';

import {
  GET_INGREDIENTS_LIST_REQUEST,
  GET_INGREDIENTS_LIST_FAILED,
  GET_INGREDIENTS_LIST_SUCCESS,
} from '../actions/ingredients';

import {
  TIngredientsActions,
  TIngredientsState,
} from '../../types/ingredients';

const ingredientsInitialState: TIngredientsState = {
  ingredientsLoad: false,
  ingredientsFailed: false,
  ingredients: [],
};

export const ingredientsReducer = (
  state = ingredientsInitialState,
  action: TIngredientsActions
) => {
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
        ingredients: action.payload,
        ingredientsLoad: false,
        ingredientsFailed: false,
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
