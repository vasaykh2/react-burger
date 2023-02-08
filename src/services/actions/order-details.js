import { BASE_URL } from '../../utils/constants';
import { request } from '../../utils/request';

import { listId } from '../../components/burger-constructor/burger-constructor';

export const CLOSE_ORDER_DETAILS = 'CLOSE_ORDER_DETAILS';
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
    request(urlOrders, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredients: listId,
      }),
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

export const closeOrderDetails = () => ({
  type: CLOSE_ORDER_DETAILS,
});
