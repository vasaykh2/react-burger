import React from 'react';
import ReactDOM  from 'react-dom';
//import PropTypes from 'prop-types';
//import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
//import BurgerConstructor from '../burger-constructor/burger-constructor.js';
//import { ingredientType } from '../../utils/types';
//import burgerMainStyles from './burger-main-styles.module.css';

const modalRoot = document.getElementById("react-modals");


export function ModalOverlay(props) {

  //const onClose = () =>{};

  return ReactDOM.createPortal(
    (
        <>
            <div className="Modal">
                            {props.children}
            </div>
            
        </>
    ), 
    modalRoot
);
}




