import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';
import { currentIngredientDetailsReducer } from './current-ingredient-details';
import { orderDetailsReducer } from './order-details';
import { userReducer } from './user';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorBurger: constructorReducer,
  oder: orderReducer,
  user: userReducer,
  currentIngredientDetails: currentIngredientDetailsReducer,
  orderDetails: orderDetailsReducer,  
});
