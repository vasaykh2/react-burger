import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerIngredientsStyles from './burger-ingredients-styles.module.css';

const data = [
  {
    _id: '60666c42cc7b410027a1a9b1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0,
  },
  {
    _id: '60666c42cc7b410027a1a9b5',
    name: 'Говяжий метеорит (отбивная)',
    type: 'main',
    proteins: 800,
    fat: 800,
    carbohydrates: 300,
    calories: 2674,
    price: 3000,
    image: 'https://code.s3.yandex.net/react/code/meat-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
    __v: 0,
  },
];

function BurgerIngredients() {
  return (
    <section className={burgerIngredientsStyles.section}>
      <p className='text text_type_main-large pt-10 pb-5'>Соберите бургер</p>
      <ul className={burgerIngredientsStyles.blockTitleGrid}>
        <li
          className={
            burgerIngredientsStyles.blockCenter +
            ' Apptext text_type_main-default'
          }
        >
          Булки
        </li>
        <li
          className={
            burgerIngredientsStyles.blockCenter +
            ' Apptext text_type_main-default'
          }
        >
          Соусы
        </li>
        <li
          className={
            burgerIngredientsStyles.blockCenter +
            ' Apptext text_type_main-default'
          }
        >
          Начинки
        </li>
      </ul>
      <ul className={burgerIngredientsStyles.blockTitles}>
        <li>
          <p className='text text_type_main-medium pt-10 pb-6'>Булки</p>

          <ul className={burgerIngredientsStyles.blockCardsGrid}>
            {data.map((ingredient) => (
              <li>
                <img src={ingredient.image} alt={ingredient.name} />
                <p
                  className={
                    burgerIngredientsStyles.blockCenter +
                    ' Apptext text_type_main-default'
                  }
                >
                  {ingredient.name}
                </p>
              </li>
            ))}
          </ul>
        </li>
        <li className='text text_type_main-medium pt-10 pb-6'>Соусы</li>
        <li className='text text_type_main-medium pt-10 pb-6'>Начинки</li>
      </ul>
    </section>
  );
}

export default BurgerIngredients;
