import React from 'react';
import AppHeader from '../app-header/app-header.js';
import BurgerMain from '../burger-main/burger-main.js';
import { data } from '../../utils/data';
import appStyles from './app-styles.module.css';

function App() {
  return (
    <>
      <AppHeader />
      <BurgerMain data={data} />
    </>
  );
}

export default App;