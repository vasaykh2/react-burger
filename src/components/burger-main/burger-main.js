import React from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
import burgerMainStyles from './burger-main-styles.module.css';

function BurgerMain(props) {
  return (
    <main className={burgerMainStyles.blocks}>
      <BurgerIngredients data={props.data} />
      <BurgerConstructor data={props.data} />
    </main>
  );
}

export default BurgerMain;
