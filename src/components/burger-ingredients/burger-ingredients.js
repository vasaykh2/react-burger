import React, { useMemo, useRef, useEffect } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Ingredient } from '../ingredient/ingredient';
import burgerIngredientsStyles from './burger-ingredients-styles.module.css';

import { useSelector, useDispatch } from 'react-redux';
import {
  ADD_CURRENT_INGREDIENT_DETAILS,
  DELETE_CURRENT_INGREDIENT_DETAILS,
} from '../../services/actions/current-ingredient-details';

function BurgerIngredients() {
  const dispatch = useDispatch();

  const { ingredientsLoad, ingredientsFailed, ingredients } = useSelector(
    (state) => state.ingredients
  );
  //console.log(ingredientsLoad, ingredientsFailed, ingredients );

  const isData = ingredients.length == 0 ? false : true;
  //console.log(isData);

  const idIngredients = useMemo(
    () => (!isData ? 0 : ingredients.map((item) => item._id)),
    [ingredients]
  );
  //console.log(idIngredients);

  const [current, setCurrent] = React.useState('one');

  const [isModalIngredientDetails, setModalIngredientDetails] =
    React.useState(false);

  const currentModalIngredientDetails = useSelector(
    (state) => state.currentIngredientDetails
  );
  //console.log(currentModalIngredientDetails);

  const handleIngredientDetails = (id) => {
    setModalIngredientDetails(true);
    //console.log(id);
    let currentIngredient = ingredients.find((item) => item._id == id);

    const currentModalIngredient = {};
    for (let i in currentModalIngredientDetails.item) {
      currentModalIngredient[i] = currentIngredient[i];
    }
    //console.log(currentModalIngredient);
    dispatch({
      type: ADD_CURRENT_INGREDIENT_DETAILS,
      item: currentModalIngredient,
    });
  };

  const handleClose = () => {
    setModalIngredientDetails(false);
    dispatch({
      type: DELETE_CURRENT_INGREDIENT_DETAILS,
    });
  };

  function renderedIngredients(typeIngredients) {
    return ingredients.map(
      (ingredient) =>
        ingredient.type === typeIngredients && (
          <Ingredient
            ingredient={ingredient}
            key={ingredient._id}
            handleIngredientDetails={() =>
              handleIngredientDetails(ingredient._id)
            }
          ></Ingredient>
        )
    );
  }

  const rendererBun = useMemo(() => renderedIngredients('bun'), [ingredients]);

  const rendererSauce = useMemo(
    () => renderedIngredients('sauce'),
    [ingredients]
  );

  const rendererMain = useMemo(
    () => renderedIngredients('main'),
    [ingredients]
  );

  const refeHeder = useRef('heder');
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

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  function handleScroll() {
    const distBun = Math.abs(
      refBun.current.getBoundingClientRect().top -
        refeHeder.current.getBoundingClientRect().top
    );
    /*const distSauce = Math.abs(refBun.current.getBoundingClientRect().top - refeHeder.current.getBoundingClientRect().top);
    const distMain = Math.abs(refBun.current.getBoundingClientRect().top - refeHeder.current.getBoundingClientRect().top);*/
    const scale = distBun > 800 ? 'three' : distBun < 200 ? 'one' : 'two';

    switch (scale) {
      case 'one':
        setCurrent('one');
        break;
      case 'two':
        setCurrent('two');
        break;
      case 'three':
        setCurrent('three');
        break;
      default:
        return;
    }
  }

  return (
    <section className={burgerIngredientsStyles.section}>
      <p className='text text_type_main-large pt-10 pb-5'>Соберите бургер</p>
      <div ref={refeHeder} className={burgerIngredientsStyles.blockTab}>
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
      {/*{isModalIngredientDetails && (
        <Modal header={'Детали ингредиента'} onClose={handleClose}>
          <IngredientDetails
            currentModalIngredientDetails={ingredients}
          />
        </Modal>
      )}*/}
    </section>
  );
}

export default BurgerIngredients;