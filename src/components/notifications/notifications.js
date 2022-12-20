import React from 'react';
import ReactDOM from 'react-dom';
//import PropTypes from 'prop-types';
//import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
//import BurgerConstructor from '../burger-constructor/burger-constructor.js';
//import { ingredientType } from '../../utils/types';
//import burgerMainStyles from './burger-main-styles.module.css';

const notificationRoot = document.getElementById('react-notifications');

export function Notifications(props) {
  //const onClose = () =>{};

  return  props.children ? null : ReactDOM.createPortal(
    <>
      <div className='notification'>{props.children}</div>
    </>,
    notificationRoot
  );
}
