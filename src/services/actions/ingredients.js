import { api } from '../../utils/api';

export const GET_INGREDIENTS_LIST_REQUEST = 'GET_INGREDIENT_LIST_REQUEST';
export const GET_INGREDIENTS_LIST_FAILED = 'GET_INGREDIENT_LIST_FAILED';
export const GET_INGREDIENTS_LIST_SUCCESS = 'GET_INGREDIENT_LIST_SUCCESS';
export const GET_CONSTRUCTOR_LIST = 'GET_CONSTRUCTOR_LIST';
export const ADD_CURRENT_INGREDIENT_DETAILS = 'ADD_CURRENT_INGREDIENT_DETAILS';
export const DELETE_CURRENT_INGREDIENT_DETAILS =
  'DELETE_CURRENT_INGREDIENT_DETAILS';
export const UPDATE_ORDER_DETAILS = 'UPDATE_ORDER_DETAILS';

export function getIngredientsList() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_LIST_REQUEST,
    });
    api
      .getIngredients()
      .then((res) => {
        dispatch({
          type: GET_INGREDIENTS_LIST_SUCCESS,
          result: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_INGREDIENTS_LIST_FAILED,
        });
      });
  };
}
