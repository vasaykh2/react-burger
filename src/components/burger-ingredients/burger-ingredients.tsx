import React, { useMemo, useRef, useEffect, useCallback, FC } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import { Ingredient } from '../ingredient/ingredient';
import burgerIngredientsStyles from './burger-ingredients-styles.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { TIngredient } from "../../types/ingredients";
import { addIngredient } from '../../services/actions/constructor';
import { IngredientEnum } from "../../types/ingredients";

const BurgerIngredients: FC = () => {
  const bun = IngredientEnum.bun;
  const sauce = IngredientEnum.sauce;
  const main = IngredientEnum.main;

  const dispatch = useDispatch();

  const { ingredients } = useSelector((state: any) => state.ingredients);

  const [current, setCurrent] = React.useState(bun);

  const handleRightClick = useCallback(
    (ingredient: TIngredient) => {
      dispatch(addIngredient(ingredient));
    },
    [dispatch]
  );

  const renderedIngredients = useCallback((typeIngredients: IngredientEnum) => {
    return ingredients.map(
      (ingredient: TIngredient) =>
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
  }, [handleRightClick, ingredients]) 

  const rendererBun = useMemo(
    () => renderedIngredients(bun),
    [ renderedIngredients, bun]
  );

  const rendererSauce = useMemo(
    () => renderedIngredients(sauce),
    [renderedIngredients, sauce]
  );

  const rendererMain = useMemo(
    () => renderedIngredients(main),
    [renderedIngredients, main]
  );

  const refeHeder = useRef<HTMLInputElement>('heder');
  const refBun = useRef<HTMLInputElement>(bun);
  const refSauce = useRef(sauce);
  const refMain = useRef(main);

  function handleOnClickCurrent(el: IngredientEnum) {
    //console.log(refMain.current);

    setCurrent(el);
    switch (el) {
      case bun:
        refBun.current.scrollIntoView(true, { behavior: 'smooth' });
        break;
      case sauce:
        refSauce.current.scrollIntoView(true, { behavior: 'smooth' });
        break;
      case main:
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
          value={`${bun}`}
          active={current === bun}
          onClick={() => handleOnClickCurrent (bun)}
        >
          Булки
        </Tab>
        <Tab
          value={`${sauce}`}
          active={current === sauce}
          onClick={() => handleOnClickCurrent(sauce)}
        >
          Соусы
        </Tab>
        <Tab
          value={`${main}`}
          active={current === main}
          onClick={() => handleOnClickCurrent(main)}
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
