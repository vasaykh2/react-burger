//import PropTypes from 'prop-types';
import React, {  useState } from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
//import { ingredientType } from '../../utils/types';
import burgerMainStyles from './burger-main-styles.module.css';

import { TotalPriceContext } from '../../services/app-context';

export default function BurgerMain() {
  const totalPrice = useState(0);
  return (
    <main className={burgerMainStyles.blocks}>
      <BurgerIngredients />
      <TotalPriceContext.Provider value={totalPrice}>
        <BurgerConstructor />
      </TotalPriceContext.Provider>
    </main>
  );
}

/*BurgerMain.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired,
};*/
