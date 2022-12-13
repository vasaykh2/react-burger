import React from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
import burgerMainStyles from './burger-main-styles.module.css';

function BurgerMain() {
  return (
    <main className={burgerMainStyles.blocks}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  );
}

export default BurgerMain;
