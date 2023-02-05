//import React from 'react';

import {
  GET_CONSTRUCTOR_LIST,
  ADD_CURRENT_INGREDIENT_DETAILS,
  DELETE_CURRENT_INGREDIENT_DETAILS,
  UPDATE_ORDER_DETAILS,
} from '../actions/constructor';

const constructorInitialState = {
  data: [],
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

/*const currentIngredientDetailsInitialState = {
  _id: ingredientsInitialState.ingredients[0]._id,
  image_large: ingredientsInitialState.ingredients[0].image_large,
  name: ingredientsInitialState.ingredients[0].name,
  calories: ingredientsInitialState.ingredients[0].calories,
  proteins: ingredientsInitialState.ingredients[0].proteins,
  fat: ingredientsInitialState.ingredients[0].fat,
  carbohydrates: ingredientsInitialState.ingredients[0].carbohydrates,
};*/
