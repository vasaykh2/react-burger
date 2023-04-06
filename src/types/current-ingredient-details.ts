import {
  ADD_CURRENT_INGREDIENT_DETAILS,
  DELETE_CURRENT_INGREDIENT_DETAILS,
} from '../services/actions/current-ingredient-details';

export type TCurrentIngredientDetailsState = {
  item: {
    _id: number;
    image_large: string;
    name: string;
    calories: number;
    proteins: number;
    fat: number;
    carbohydrates: number;
  };
};

export type TCurrentIngredientDetailsActions =
  | TAddCurrentIngredientDetailsAction
  | TDeleteCurrentIngredientDetailsAction;

export type TAddCurrentIngredientDetailsAction = {
  readonly type: typeof ADD_CURRENT_INGREDIENT_DETAILS;
  readonly payload: {
    item: {
      _id: number;
      image_large: string;
      name: string;
      calories: number;
      proteins: number;
      fat: number;
      carbohydrates: number;
    };
  };
};

export type TDeleteCurrentIngredientDetailsAction = {
  readonly type: typeof DELETE_CURRENT_INGREDIENT_DETAILS;
};
