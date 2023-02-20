//import React, {  useMemo } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

import styles from './main-styles.module.css';

export default function BurgerMain() {
  return (
    <DndProvider backend={HTML5Backend}>
    <main className={styles.blocks}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
    </DndProvider>
  );
}
