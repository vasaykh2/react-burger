import React from 'react';
import PropTypes from 'prop-types';
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
        <img src={props.img} alt={props.name} />
        <p className='text text_type_main-medium pt-2 pb-8'>{props.name}</p>
        <div className={IngredientDetailsStyles.contentString}>
          <div className={IngredientDetailsStyles.content}>
            <p className='text text_type_main-default text_color_inactive pb-2'>
              Калории, ккал
            </p>
            <p
              className={
                'text  text_color_inactive ' + IngredientDetailsStyles.textValue
              }
            >
              {props.calories}
            </p>
          </div>
          <div className={IngredientDetailsStyles.content}>
            <p className='text text_type_main-default text_color_inactive pb-2'>
              Белки, г
            </p>
            <p
              className={
                'text  text_color_inactive ' + IngredientDetailsStyles.textValue
              }
            >
              {props.proteins}
            </p>
          </div>
          <div className={IngredientDetailsStyles.content}>
            <p className='text text_type_main-default text_color_inactive pb-2'>
              Жиры, г
            </p>
            <p
              className={
                'text  text_color_inactive ' + IngredientDetailsStyles.textValue
              }
            >
              {props.fat}
            </p>
          </div>
          <div className={IngredientDetailsStyles.content}>
            <p className='text text_type_main-default text_color_inactive pb-2'>
              Углеводы, г
            </p>
            <p
              className={
                'text  text_color_inactive ' + IngredientDetailsStyles.textValue
              }
            >
              {props.carbohydrates}
            </p>
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
}

IngredientDetails.propTypes = PropTypes.shape({
  calories: PropTypes.number,
  carbohydrates: PropTypes.number,
  fat: PropTypes.number,
  img: PropTypes.string,
  isVisible: PropTypes.bool,
  name: PropTypes.string,
  onClose: PropTypes.func,
  proteins: PropTypes.number,
}).isRequired;
