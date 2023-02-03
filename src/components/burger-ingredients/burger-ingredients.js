import React, { useContext, useMemo, useRef, useEffect } from 'react';

import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import burgerIngredientsStyles from './burger-ingredients-styles.module.css';

import { BurgerIngredientsContext } from '../../services/burger-ingredients-context';


import { useSelector, useDispatch } from 'react-redux';
import { getIngredientsList } from '../../services/actions/actions';



export default function BurgerIngredients() {

  const { ingredientsLoad, ingredientsFailed, ingredients } = useSelector(state => state.ingredientsReducer);

  const dispatch = useDispatch();

  useEffect(()=> {
    // Отправляем экшен-функцию
    dispatch(getIngredientsList())
}, []);

//console.log(ingredientsLoad, ingredientsFailed, ingredients );

  const [current, setCurrent] = React.useState('one');

  const [isModalIngredientDetails, setModalIngredientDetails] =
    React.useState(false);

  //const ingredientsState = useContext(BurgerIngredientsContext);
  //console.log(ingredients[0])

  const [currentModalIngredientDetails, setcurrentModalIngredientDetails] =
    React.useState({
      _id: 0,
      image_large: '',
      name: '',
      calories: 0,
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
    });

  const handleIngredientDetails = (id) => {
    setModalIngredientDetails(true);
    //console.log(id);
    let currentIngredient = ingredients.find(
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
    return ingredients.map(
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
    [ingredients]
  );

  const rendererSauce = useMemo(
    () => renderedIngredients('sauce'),
    [ingredients]
  );

  const rendererMain = useMemo(
    () => renderedIngredients('main'),
    [ingredients]
  );

  const refBun = useRef('bun');
  const refSauce = useRef('sauce');
  const refMain = useRef('main');

  function handleOnClickCurrent(e) {
    //console.log(refMain.current);
    setCurrent(e);
    switch (e) {
      case 'one':
        refBun.current.scrollIntoView(true, { behavior: 'smooth' });
        break;
      case 'two':
        refSauce.current.scrollIntoView(true, { behavior: 'smooth' });
        break;
      case 'three':
        refMain.current.scrollIntoView(true, { behavior: 'smooth' });
        break;
      default:
        refBun.current.scrollIntoView(true, { behavior: 'smooth' });
    }
  }

  return (
    <section className={burgerIngredientsStyles.section}>
      <p className='text text_type_main-large pt-10 pb-5'>Соберите бургер</p>
      <div className={burgerIngredientsStyles.blockTab}>
        <Tab
          value='one'
          active={current === 'one'}
          onClick={handleOnClickCurrent}
        >
          Булки
        </Tab>
        <Tab
          value='two'
          active={current === 'two'}
          onClick={handleOnClickCurrent}
        >
          Соусы
        </Tab>
        <Tab
          value='three'
          active={current === 'three'}
          onClick={handleOnClickCurrent}
        >
          Начинки
        </Tab>
      </div>
      <ul className={burgerIngredientsStyles.blockTipes}>
        <li>
          <p ref={refBun} className='text text_type_main-medium pt-10 pb-6'>
            Булки
          </p>
          <ul className={burgerIngredientsStyles.blockCardsGrid}>
            {rendererBun}
          </ul>
        </li>
        <li>
          <p ref={refSauce} className='text text_type_main-medium pt-10 pb-6'>
            Соусы
          </p>
          <ul className={burgerIngredientsStyles.blockCardsGrid}>
            {rendererSauce}
          </ul>
        </li>
        <li>
          <p ref={refMain} className='text text_type_main-medium pt-10 pb-6'>
            Начинки
          </p>
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
