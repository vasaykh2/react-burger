import React, { useContext, useMemo } from 'react';

import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import burgerIngredientsStyles from './burger-ingredients-styles.module.css';

import { BurgerIngredientsContext } from '../../services/burger-ingredients-context';

export default function BurgerIngredients() {
  const [current, setCurrent] = React.useState('one');

  const [isModalIngredientDetails, setModalIngredientDetails] =
    React.useState(false);

  const ingredientsState = useContext(BurgerIngredientsContext);

  const [currentModalIngredientDetails, setcurrentModalIngredientDetails] =
    React.useState({
      _id: ingredientsState.data[0]._id,
      image_large: ingredientsState.data[0].image_large,
      name: ingredientsState.data[0].name,
      calories: ingredientsState.data[0].calories,
      proteins: ingredientsState.data[0].proteins,
      fat: ingredientsState.data[0].fat,
      carbohydrates: ingredientsState.data[0].carbohydrates,
    });

  const handleIngredientDetails = (id) => {
    setModalIngredientDetails(true);
    //console.log(id);
    let currentIngredient = ingredientsState.data.find(
      (item) => item._id == id
    );
    const currentModalIngredient = {};
    for (let i in currentModalIngredientDetails) {
      currentModalIngredient[i] = currentIngredient[i];
    }
    setcurrentModalIngredientDetails(currentModalIngredient);
  };

  const handleClose = () => {
    setModalIngredientDetails(false);
  };

  function renderedIngredients(typeIngredients) {
    return ingredientsState.data.map(
      (ingredient) =>
        ingredient.type === typeIngredients && (
          <li
            className={burgerIngredientsStyles.cardIngredients}
            key={ingredient._id}
            onClick={() => handleIngredientDetails(ingredient._id)}
          >
            <Counter count={1} size='default' extraClass='m-1' />
            <img
              src={ingredient.image}
              alt={ingredient.name}
              className={'ml-4 mr-4'}
            />
            <div
              className={
                'mt-1 mb-1 ' + burgerIngredientsStyles.blockDiscriptionCenter
              }
            >
              <p className='text text_type_digits-default'>
                {ingredient.price}
              </p>
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
    );
  }

  const rendererBun = useMemo(
    () => renderedIngredients('bun'),
    [ingredientsState.data]
  );

  const rendererSauce = useMemo(
    () => renderedIngredients('sauce'),
    [ingredientsState.data]
  );

  const rendererMain = useMemo(
    () => renderedIngredients('main'),
    [ingredientsState.data]
  );

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
            {rendererBun}
          </ul>
        </li>
        <li>
          <p className='text text_type_main-medium pt-10 pb-6'>Соусы</p>
          <ul className={burgerIngredientsStyles.blockCardsGrid}>
            {rendererSauce}
          </ul>
        </li>
        <li>
          <p className='text text_type_main-medium pt-10 pb-6'>Начинки</p>
          <ul className={burgerIngredientsStyles.blockCardsGrid}>
            {rendererMain}
          </ul>
        </li>
      </ul>
      {isModalIngredientDetails && (
        <Modal header={'Детали ингредиента'} onClose={handleClose}>
          <IngredientDetails
            currentModalIngredientDetails={currentModalIngredientDetails}
          />
        </Modal>
      )}
    </section>
  );
}
