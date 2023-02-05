//import React, {  useMemo } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';

import burgerMainStyles from './burger-main-styles.module.css';

export default function BurgerMain() {
  return (
    <DndProvider backend={HTML5Backend}>
    <main className={burgerMainStyles.blocks}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
    </DndProvider>
  );
}
