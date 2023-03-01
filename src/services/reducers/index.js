import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';
import { currentIngredientDetailsReducer } from './current-ingredient-details';
import { orderDetailsReducer } from './order-details';
import { userReducer } from './user';
import { orderReducer } from './order';
import { wsOrdersReducer } from './ws-orders';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorBurger: constructorReducer,
  oder: orderReducer,
  user: userReducer,
  wsOrders: wsOrdersReducer,
  currentIngredientDetails: currentIngredientDetailsReducer,
  orderDetails: orderDetailsReducer,
});
