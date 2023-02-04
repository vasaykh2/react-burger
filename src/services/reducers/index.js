import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';
import { currentIngredientDetailsReducer } from './constructor';
import { orderDetailsReducer } from './constructor';

export const rootReducer = combineReducers({
  ingredientsReducer,
  constructorReducer,
  currentIngredientDetailsReducer,
  orderDetailsReducer,
});
