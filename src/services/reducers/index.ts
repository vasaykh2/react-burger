import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';
import { userReducer } from './user';
import { orderReducer } from './order';
import { wsPublicOrdersReducer } from './ws-public-orders';
import { wsUserOrdersReducer } from './ws-user-orders';
import { currentIngredientDetailsReducer } from './current-ingredient-details';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorBurger: constructorReducer,
  order: orderReducer,
  user: userReducer,
  wsPublic: wsPublicOrdersReducer,
  wsUser: wsUserOrdersReducer,
  currentIngredientDetails: currentIngredientDetailsReducer,
});
