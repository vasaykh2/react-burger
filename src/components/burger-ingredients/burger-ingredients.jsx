import React, { useMemo, useRef, useEffect, useCallback } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import { Ingredient } from '../ingredient/ingredient';
import burgerIngredientsStyles from './burger-ingredients-styles.module.css';

import { useSelector, useDispatch } from 'react-redux';

import { addConstructorList } from '../../services/actions/constructor';

function BurgerIngredients() {
  const dispatch = useDispatch();

  const { ingredients } = useSelector((state) => state.ingredients);

  const [current, setCurrent] = React.useState('one');

  const handleRightClick = useCallback(
    (ingredient) => {
      dispatch(addConstructorList(ingredient));
    },
    [dispatch]
  );

  function renderedIngredients(typeIngredients) {
    return ingredients.map(
      (ingredient) =>
        ingredient.type === typeIngredients && (
          <Ingredient
            ingredient={ingredient}
            key={ingredient._id}
            onRightClick={(evt) => {
              evt.preventDefault();
              handleRightClick(ingredient);
            }}
          ></Ingredient>
        )
    );
  }

  const rendererBun = useMemo(
    () => renderedIngredients('bun'),
    [ingredients, handleRightClick]
  );

  const rendererSauce = useMemo(
    () => renderedIngredients('sauce'),
    [ingredients, handleRightClick]
  );

  const rendererMain = useMemo(
    () => renderedIngredients('main'),
    [ingredients, handleRightClick]
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
    </section>
  );
}

export default BurgerIngredients;
