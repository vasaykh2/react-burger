export const GET_CONSTRUCTOR_LIST = 'GET_CONSTRUCTOR_LIST';
export const ADD_CONSTRUCTOR_LIST = 'ADD_CONSTRUCTOR_LIST';

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
  payload: { ingredient: ingredient },
});
