import { nanoid } from 'nanoid';
import { AppDispatch } from "../../types/store";
import { TIngredient } from "../../types/ingredients";
import {
  TConstuctorElement,
  TAddIngredientAction,
  TDeleteIngredientAction,
  TResetConstructorAction,
  TSortConstructorAction,
} from "../../types/constructor";

export const GET_CONSTRUCTOR_LIST: 'GET_CONSTRUCTOR_LIST' = 'GET_CONSTRUCTOR_LIST';
export const ADD_INGREDIENT: "ADD_INGREDIENT" = "ADD_INGREDIENT";
export const DELETE_INGREDIENT: "DELETE_INGREDIENT" = "DELETE_INGREDIENT";
export const SORT_CONSTRUCTOR: 'SORT_CONSTRUCTOR' = 'SORT_CONSTRUCTOR';
export const RESET_CONSTRUCTOR: 'RESET_CONSTRUCTOR' = 'RESET_CONSTRUCTOR';


export function getConstructorList(ingredients: Array<TIngredient>) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_CONSTRUCTOR_LIST,
      payload: ingredients,
    });
  };
}

export const addIngredient = (ingredient: TIngredient): TAddIngredientAction => ({
  type: ADD_INGREDIENT,
  payload: { ingredient: ingredient, id: nanoid(16) },
});


export const deleteIngredient = (ingredient: TConstuctorElement): TDeleteIngredientAction => ({
  type: DELETE_INGREDIENT,
  payload: ingredient,
});

export const sortConstructor = (toppings: Array<TConstuctorElement>, dragIndex: number, hoverIndex: number): TSortConstructorAction => {
  const dragTopping = toppings[dragIndex];
  toppings.splice(dragIndex, 1);
  toppings.splice(hoverIndex, 0, dragTopping);
  return {
    type: SORT_CONSTRUCTOR,
    payload: [...toppings],
  };
};

export const resetConstructor = (): TResetConstructorAction => ({
  type: RESET_CONSTRUCTOR,
});
