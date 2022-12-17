import React from 'react';
import orderAccpetedDone from '../../images/order accpeted-done.png';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import IngredientDetailsStyles from './ingredient-details-styles.module.css';

export function IngredientDetails({ isVisible = false, onClose, ...props }) {
  return (
    <ModalOverlay
      isVisible={isVisible}
      onClose={onClose}
      header='Детали ингредиента'
    >
      <div className={IngredientDetailsStyles.block}>
        <img src={orderAccpetedDone} alt='name' />
        <p className='text text_type_main-medium pb-15'>name</p>
        <div className={IngredientDetailsStyles.contentString}>
          <div className={IngredientDetailsStyles.content}>
            <p className='text text_type_main-default text_color_inactive pb-15'>
              Каллории, ккал
            </p>{' '}
            <p className='text text_type_main-default text_color_inactive pb-15'>
              cal
            </p>
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
}
