import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './ingredients';
import { currentIngredientDetailsReducer } from './ingredients';
import { orderDetailsReducer } from './ingredients';

export const rootReducer = combineReducers({
  ingredientsReducer,
  constructorReducer,
  currentIngredientDetailsReducer,
  orderDetailsReducer,
});
