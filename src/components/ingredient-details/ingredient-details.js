import React from 'react';
import PropTypes from 'prop-types';
import IngredientDetailsStyles from './ingredient-details-styles.module.css';

export function IngredientDetails(props) {
  return (
    <div className={IngredientDetailsStyles.block}>
      <img src={props.currentIngredient.image_large} alt={props.currentIngredient.name} />
      <p className='text text_type_main-medium pt-2 pb-8'>{props.currentIngredient.name}</p>
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
            {props.currentIngredient.calories}
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
            {props.currentIngredient.proteins}
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
            {props.currentIngredient.fat}
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
            {props.currentIngredient.carbohydrates}
          </p>
        </div>
      </div>
    </div>
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
