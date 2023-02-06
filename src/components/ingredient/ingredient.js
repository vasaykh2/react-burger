import React from 'react';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './ingredient-styles.module.css';
import { useDrag } from 'react-dnd';

export function Ingredient({ ingredient, handleIngredientDetails }) {
  const [, dragRef] = useDrag({
    type: 'ingredients',
    item: { ...ingredient },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <li
      ref={dragRef}
      className={ingredientsStyles.cardIngredients}
      key={ingredient._id}
      onClick={() => handleIngredientDetails(ingredient._id)}
    >
      <Counter count={1} size='default' extraClass='m-1' />
      <img
        src={ingredient.image}
        alt={ingredient.name}
        className={'ml-4 mr-4'}
      />
      <div className={'mt-1 mb-1 ' + ingredientsStyles.blockDiscriptionCenter}>
        <p className='text text_type_digits-default'>{ingredient.price}</p>
        <CurrencyIcon type='primary' />
      </div>
      <p
        className={
          ' Apptext text_type_main-default pl-1 pr-1 ' +
          ingredientsStyles.blockCenter +
          ingredientsStyles.discriptionIngredients
        }
      >
        {ingredient.name}
      </p>
    </li>
  );
}
