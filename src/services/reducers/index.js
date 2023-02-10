import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';
import { currentIngredientDetailsReducer } from './current-ingredient-details';
import { orderDetailsReducer } from './order-details';

export const rootReducer = combineReducers({
  ingredientsReducer,
  constructorReducer,
  currentIngredientDetailsReducer,
  orderDetailsReducer,
});
