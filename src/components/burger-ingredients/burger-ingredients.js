import React from 'react';
import PropTypes from 'prop-types';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { ingredientType } from '../../utils/types';
import burgerIngredientsStyles from './burger-ingredients-styles.module.css';

function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('one');

  const [isModalIngredientDetails, setModalIngredientDetails] =
    React.useState(false);

  const [currentModalIngredientDetails, setcurrentModalIngredientDetails] =
    React.useState({
      _id: props.data[0]._id,
      image_large: props.data[0].image_large,
      name: props.data[0].name,
      calories: props.data[0].calories,
      proteins: props.data[0].proteins,
      fat: props.data[0].fat,
      carbohydrates: props.data[0].carbohydrates,
    });

  const handlerIngredientDetails = (id) => {
    setModalIngredientDetails(true);
    //console.log(id);
    let currentIngredient = props.data.find((item) => item._id == id);
    const currentModalIngredient = {};
    for (let i in currentModalIngredientDetails) {
      currentModalIngredient[i] = currentIngredient[i];
    }
    setcurrentModalIngredientDetails(currentModalIngredient);
  };

  const handlerClose = () => {
    setModalIngredientDetails(false);
  };

  return (
    <section className={burgerIngredientsStyles.section}>
      <p className='text text_type_main-large pt-10 pb-5'>Соберите бургер</p>
      <div className={burgerIngredientsStyles.blockTab}>
        <Tab value='one' active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value='two' active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value='three' active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <ul className={burgerIngredientsStyles.blockTipes}>
        <li>
          <p className='text text_type_main-medium pt-10 pb-6'>Булки</p>
          <ul className={burgerIngredientsStyles.blockCardsGrid}>
            {props.data.map(
              (ingredient) =>
                ingredient.type === 'bun' && (
                  <li
                    className={burgerIngredientsStyles.cardIngredients}
                    key={ingredient._id}
                    onClick={() => handlerIngredientDetails(ingredient._id)}
                  >
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
                      <p className='text text_type_digits-default'>{ingredient.price}</p>
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
            {props.data.map(
              (ingredient) =>
                ingredient.type === 'sauce' && (
                  <li
                    className={burgerIngredientsStyles.cardIngredients}
                    key={ingredient._id}
                    onClick={() => handlerIngredientDetails(ingredient._id)}
                  >
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
                      <p className='text text_type_digits-default'>{ingredient.price}</p>
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
            {props.data.map(
              (ingredient) =>
                ingredient.type === 'main' && (
                  <li
                    className={burgerIngredientsStyles.cardIngredients}
                    key={ingredient._id}
                    onClick={() => handlerIngredientDetails(ingredient._id)}
                  >
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
                      <p className='text text_type_digits-default'>{ingredient.price}</p>
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
      <IngredientDetails
        isVisible={isModalIngredientDetails}
        onClose={handlerClose}
        img={currentModalIngredientDetails.image_large}
        name={currentModalIngredientDetails.name}
        calories={currentModalIngredientDetails.calories}
        proteins={currentModalIngredientDetails.proteins}
        fat={currentModalIngredientDetails.fat}
        carbohydrates={currentModalIngredientDetails.carbohydrates}
      />
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired,
};

export default BurgerIngredients;
