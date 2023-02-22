import { api } from '../../utils/api';

export const CLOSE_ORDER_DETAILS = 'CLOSE_ORDER_DETAILS';
export const UPDATE_ORDER_DETAILS = 'UPDATE_ORDER_DETAILS';
export const UPDATE_ORDER_DETAILS_SUCCESS = 'UPDATE_ORDER_DETAILS_SUCCESS';
export const UPDATE_ORDER_DETAILS_REQUEST = 'UPDATE_ORDER_DETAILS_REQUEST';
export const UPDATE_ORDER_DETAILS_FAILED = 'UPDATE_ORDER_DETAILS_FAILED';

export function postOrderDetails(listId) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_ORDER_DETAILS_REQUEST,
    });
    api
      .postOrderDetails(listId)
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
