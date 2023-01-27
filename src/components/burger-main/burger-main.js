import React, { useContext, useMemo, } from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';

import burgerMainStyles from './burger-main-styles.module.css';

import { BurgerIngredientsContext } from '../../services/burger-ingredients-context';
import { TotalPriceContext } from '../../services/app-context';
import { BurgerConstructorContext } from '../../services/burger-constructor-context';

export default function BurgerMain() {
  const ingredientsState = useContext(BurgerIngredientsContext);
  const constructorState = {};
  constructorState.data = ingredientsState.data;

  const totalPrice = useMemo(
    () => constructorState.data.reduce(
      (acc, item) => acc + item.price,
      constructorState.data[0].price
    ),
    [constructorState.data]
  );

  return (
    <main className={burgerMainStyles.blocks}>
      <BurgerIngredients />
      <BurgerConstructorContext.Provider value={constructorState}>
        <TotalPriceContext.Provider value={totalPrice}>
          <BurgerConstructor />
        </TotalPriceContext.Provider>
      </BurgerConstructorContext.Provider>
    </main>
  );
}