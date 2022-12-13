import React from 'react';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { data } from '../utils/data';

import burgerIngredientsStyles from './burger-ingredients-styles.module.css';

function BurgerIngredients() {
  const [current, setCurrent] = React.useState('Булки');

  return (
    <section className={burgerIngredientsStyles.section}>
      <p className='text text_type_main-large pt-10 pb-5'>Соберите бургер</p>
      <div style={{ display: 'flex' }}>
        <Tab value='one' active={current === 'Булки'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value='two' active={current === 'Соусы'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value='three' active={current === 'Начинки'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <ul className={burgerIngredientsStyles.blockTipes}>
        <li>
          <p className='text text_type_main-medium pt-10 pb-6'>Булки</p>
          <ul className={burgerIngredientsStyles.blockCardsGrid}>
            {data.map(
              (ingredient) =>
                ingredient.type === 'bun' && (
                  <li className={burgerIngredientsStyles.cardIngredients}>
                    <Counter count={1} size='default' extraClass='m-1' />
                    <img
                      src={ingredient.image}
                      alt={ingredient.name}
                      className={'ml-4 mr-4'}
                    />
                    <div
                      className={
                        'mt-1 mb-1 ' +
                        burgerIngredientsStyles.blockDiscriptionCenter
                      }
                    >
                      <p className='text text_type_digits-default'>20</p>
                      <CurrencyIcon type='primary' />
                    </div>
                    <p
                      className={
                        ' Apptext text_type_main-default pl-1 pr-1 ' +
                        burgerIngredientsStyles.blockCenter +
                        burgerIngredientsStyles.discriptionIngredients
                      }
                    >
                      {ingredient.name}
                    </p>
                  </li>
                )
            )}
          </ul>
        </li>
        <li>
          <p className='text text_type_main-medium pt-10 pb-6'>Соусы</p>
          <ul className={burgerIngredientsStyles.blockCardsGrid}>
            {data.map(
              (ingredient) =>
                ingredient.type === 'sauce' && (
                  <li className={burgerIngredientsStyles.cardIngredients}>
                    <Counter count={1} size='default' extraClass='m-1' />
                    <img
                      src={ingredient.image}
                      alt={ingredient.name}
                      className={'ml-4 mr-4'}
                    />
                    <div
                      className={
                        'mt-1 mb-1 ' +
                        burgerIngredientsStyles.blockDiscriptionCenter
                      }
                    >
                      <p className='text text_type_digits-default'>30</p>
                      <CurrencyIcon type='primary' />
                    </div>
                    <p
                      className={
                        ' Apptext text_type_main-default pl-1 pr-1 ' +
                        burgerIngredientsStyles.blockCenter +
                        burgerIngredientsStyles.discriptionIngredients
                      }
                    >
                      {ingredient.name}
                    </p>
                  </li>
                )
            )}
          </ul>
        </li>
        <li>
          <p className='text text_type_main-medium pt-10 pb-6'>Начинки</p>
          <ul className={burgerIngredientsStyles.blockCardsGrid}>
            {data.map(
              (ingredient) =>
                ingredient.type === 'main' && (
                  <li className={burgerIngredientsStyles.cardIngredients}>
                    <Counter count={1} size='default' extraClass='m-1' />
                    <img
                      src={ingredient.image}
                      alt={ingredient.name}
                      className={'ml-4 mr-4'}
                    />
                    <div
                      className={
                        'mt-1 mb-1 ' +
                        burgerIngredientsStyles.blockDiscriptionCenter
                      }
                    >
                      <p className='text text_type_digits-default'>40</p>
                      <CurrencyIcon type='primary' />
                    </div>
                    <p
                      className={
                        ' Apptext text_type_main-default pl-1 pr-1 ' +
                        burgerIngredientsStyles.blockCenter +
                        burgerIngredientsStyles.discriptionIngredients
                      }
                    >
                      {ingredient.name}
                    </p>
                  </li>
                )
            )}
          </ul>
        </li>
      </ul>
    </section>
  );
}

export default BurgerIngredients;
