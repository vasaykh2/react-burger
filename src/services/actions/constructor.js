import { nanoid } from 'nanoid';

export const GET_CONSTRUCTOR_LIST = 'GET_CONSTRUCTOR_LIST';
export const ADD_CONSTRUCTOR_LIST = 'ADD_CONSTRUCTOR_LIST';
export const DELETE_CONSTRUCTOR_LIST = 'DELETE_CONSTRUCTOR_LIST';
export const SORT_CONSTRUCTOR = 'SORT_CONSTRUCTOR';
export const RESET_CONSTRUCTOR = 'RESET_CONSTRUCTOR';


export function getConstructorList(ingredients) {
  return function (dispatch) {
    dispatch({
      type: GET_CONSTRUCTOR_LIST,
      payload: ingredients,
    });
  };
}

export const addConstructorList = (ingredient) => ({
  type: ADD_CONSTRUCTOR_LIST,
  payload: { ingredient: ingredient, id: nanoid(16) },
});


export const deleteConstructorList = (ingredient)=> ({
  type: DELETE_CONSTRUCTOR_LIST,
  payload: ingredient,
});

export const sortConstructor = (toppings, dragIndex, hoverIndex) => {
  const dragTopping = toppings[dragIndex];
  toppings.splice(dragIndex, 1);
  toppings.splice(hoverIndex, 0, dragTopping);
  return {
    type: SORT_CONSTRUCTOR,
    payload: [...toppings],
  };
};

export const resetConstructor = () => ({
  type: RESET_CONSTRUCTOR,
});
