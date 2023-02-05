//import React from 'react';

import {
  ADD_CURRENT_INGREDIENT_DETAILS,
  DELETE_CURRENT_INGREDIENT_DETAILS,
} from '../actions/current-ingredient-details';

const currentIngredientDetailsInitialState = {
  item: {
    _id: 0,
    image_large: '',
    name: '',
    calories: 0,
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
  },
};

export const currentIngredientDetailsReducer = (
  state = currentIngredientDetailsInitialState,
  action
) => {
  switch (action.type) {
    case ADD_CURRENT_INGREDIENT_DETAILS:
      return {
        ...state,
        item: action.item,
      };
    case DELETE_CURRENT_INGREDIENT_DETAILS:
      return {
        ...state,
        item: currentIngredientDetailsInitialState.item,
      };
    default:
      return state;
  }
};
