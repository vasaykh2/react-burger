import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ingredient-styles.module.css';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

export let idIngredientDetails;

export function Ingredient({ ingredient, onRightClick }) {
  const location = useLocation();

  const [, dragRef] = useDrag({
    type: 'ingredients',
    item: { ...ingredient },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const { toppings, bun } = useSelector((state) => state.constructorBurger);

  const countIngredient = useMemo(() => {
    if (ingredient.type !== 'bun') {
      const sameIngredients = toppings.filter(
        (topping) => topping.data._id === ingredient._id
      );
      return sameIngredients.length;
    }
    return bun ? (bun.data._id === ingredient._id ? 2 : 0) : 0;
  }, [toppings, bun, ingredient]);

  return (
    <li ref={dragRef} key={ingredient._id} onContextMenu={onRightClick}>
      <Link
        className={styles.cardIngredients}
        to={{
          pathname: `/ingredients/${ingredient._id}`,
        }}
        state={{ background: location, idIngredientDetails: ingredient._id }}
      >
        <Counter count={countIngredient} size='default' extraClass='m-1' />
        <img
          src={ingredient.image}
          alt={ingredient.name}
          className={'ml-4 mr-4'}
        />
        <div className={'mt-1 mb-1 ' + styles.blockDiscriptionCenter}>
          <p className='text text_type_digits-default'>{ingredient.price}</p>
          <CurrencyIcon type='primary' />
        </div>
        <p
          className={
            ' Apptext text_type_main-default pl-1 pr-1 ' +
            styles.blockCenter +
            styles.discriptionIngredients
          }
        >
          {ingredient.name}
        </p>
      </Link>
    </li>
  );
}

Ingredient.propTypes = {
  ingredient: ingredientType,
  onRightClick: PropTypes.func,
}.isRequired;
