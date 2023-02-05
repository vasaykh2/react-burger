//import React from 'react';

import {
  GET_CONSTRUCTOR_LIST,
  ADD_CONSTRUCTOR_LIST,
} from '../actions/constructor';

const constructorInitialState = {
  selectedBun: {},
  selectedToppings: [],
  data: [],
};

export const constructorReducer = (state = constructorInitialState, action) => {
  switch (action.type) {
    // Добавление новой задачи в список дел
    case GET_CONSTRUCTOR_LIST:
      //console.log(action);
      return {
        ...state,
        selectedToppings: [
          ...state,
          { data: action.data },
        ],       
      };
    case ADD_CONSTRUCTOR_LIST:
      return action.payload.ingredient.type !== 'bun'
        ? {
            ...state,
            selectedToppings: [
              ...state.selectedToppings,
              { data: action.payload.ingredient },
            ],
          }
        : {
            ...state,
            selectedBun: {
              data: action.payload.ingredient,
            },
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
