//import React from 'react';

import {
  GET_CONSTRUCTOR_LIST,
  ADD_CONSTRUCTOR_LIST,
  SORT_CONSTRUCTOR,
} from '../actions/constructor';

const constructorInitialState = {
  bun: null,
  toppings: [],
};

export const constructorReducer = (state = constructorInitialState, action) => {
  switch (action.type) {
    // Добавление новой задачи в список дел
    case GET_CONSTRUCTOR_LIST:
      //console.log(action);
      return {
        ...state,
        bun: {
          data: action.payload[0],
        },
        toppings: [...state, { data: action.payload }],
      };
    case ADD_CONSTRUCTOR_LIST:
      return action.payload.ingredient.type !== 'bun'
        ? {
            ...state,
            toppings: [
              ...state.toppings,
              { data: action.payload.ingredient, id: action.payload.id },
            ],
          }
        : {
            ...state,
            bun: {
              data: action.payload.ingredient,
              id: action.payload.id,
            },
          };
    case SORT_CONSTRUCTOR:
      return {
        ...state,
        toppings: action.payload,
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
