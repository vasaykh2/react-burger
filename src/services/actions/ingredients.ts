import { api } from '../../utils/api';
import { AppDispatch, AppThunk } from '../../types/store';

export const GET_INGREDIENTS_LIST_REQUEST: 'GET_INGREDIENT_LIST_REQUEST' = 'GET_INGREDIENT_LIST_REQUEST';
export const GET_INGREDIENTS_LIST_FAILED: 'GET_INGREDIENT_LIST_FAILED' = 'GET_INGREDIENT_LIST_FAILED';
export const GET_INGREDIENTS_LIST_SUCCESS: 'GET_INGREDIENT_LIST_SUCCESS' = 'GET_INGREDIENT_LIST_SUCCESS';
//export const GET_CONSTRUCTOR_LIST = 'GET_CONSTRUCTOR_LIST';

export const getIngredientsList: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_INGREDIENTS_LIST_REQUEST,
    });
    api
      .getIngredients()
      .then((res) => {
        dispatch({
          type: GET_INGREDIENTS_LIST_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_INGREDIENTS_LIST_FAILED,
        });
      });
  };
};
