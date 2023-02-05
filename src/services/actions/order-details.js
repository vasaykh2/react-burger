import { BASE_URL } from '../../utils/constants';

import { listId } from '../../components/burger-constructor/burger-constructor';

export const GET_INGREDIENTS_LIST_REQUEST = 'GET_INGREDIENT_LIST_REQUEST';
export const GET_INGREDIENTS_LIST_FAILED = 'GET_INGREDIENT_LIST_FAILED';
export const GET_INGREDIENTS_LIST_SUCCESS = 'GET_INGREDIENT_LIST_SUCCESS';
export const GET_CONSTRUCTOR_LIST = 'GET_CONSTRUCTOR_LIST';
export const ADD_CURRENT_INGREDIENT_DETAILS = 'ADD_CURRENT_INGREDIENT_DETAILS';
export const DELETE_CURRENT_INGREDIENT_DETAILS =
  'DELETE_CURRENT_INGREDIENT_DETAILS';
export const UPDATE_ORDER_DETAILS = 'UPDATE_ORDER_DETAILS';
export const UPDATE_ORDER_DETAILS_SUCCESS = 'UPDATE_ORDER_DETAILS_SUCCESS';
export const UPDATE_ORDER_DETAILS_REQUEST = 'UPDATE_ORDER_DETAILS_REQUEST';
export const UPDATE_ORDER_DETAILS_FAILED = 'UPDATE_ORDER_DETAILS_FAILED';

const urlOrders = BASE_URL + 'orders';

export function postOrderDetails() {
  return function (dispatch) {
    dispatch({
      type: UPDATE_ORDER_DETAILS_REQUEST,
    });
    fetch(urlOrders, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredients: listId,
      }),
    })
      .then((res) => {
        if (res.ok) {
          //console.log(res.json());
          return res.json();
        } else {
          dispatch({
            type: UPDATE_ORDER_DETAILS_FAILED,
          });
        }
      })
      .then((res) => {
        //console.log(res);
        dispatch({
          type: UPDATE_ORDER_DETAILS_SUCCESS,
          result: res,
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_ORDER_DETAILS_FAILED,
          err: err,
        });
      });
  };
}
