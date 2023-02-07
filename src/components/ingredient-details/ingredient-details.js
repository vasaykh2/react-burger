import React from 'react';
import PropTypes from 'prop-types';
import IngredientDetailsStyles from './ingredient-details-styles.module.css';

export function IngredientDetails(props) {
  const currentIngredientDetails = props.currentModalIngredientDetails;

  return (
    <div className={IngredientDetailsStyles.block}>
      <img
        src={currentIngredientDetails.image_large}
        alt={currentIngredientDetails.name}
      />
      <p className='text text_type_main-medium pt-2 pb-8'>
        {currentIngredientDetails.name}
      </p>
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
            {currentIngredientDetails.calories}
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
            {currentIngredientDetails.proteins}
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
            {currentIngredientDetails.fat}
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
            {currentIngredientDetails.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = PropTypes.object.isRequired;
