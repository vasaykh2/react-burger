import React, { useMemo, useRef, useEffect, useCallback, FC } from 'react';
import { useInView } from 'react-intersection-observer';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import { Ingredient } from '../ingredient/ingredient';
import burgerIngredientsStyles from './burger-ingredients-styles.module.css';
import { useSelector, useDispatch } from '../../types/store';
import { TIngredient } from '../../types/ingredients';
import { addIngredient } from '../../services/actions/constructor';
import { IngredientEnum } from '../../types/ingredients';

const BurgerIngredients: FC = () => {
  const bun = IngredientEnum.bun;
  const sauce = IngredientEnum.sauce;
  const main = IngredientEnum.main;

  const dispatch = useDispatch();

  const { ingredients } = useSelector((state) => state.ingredients);

  const [current, setCurrent] = React.useState(bun);

  const handleRightClick = useCallback(
    (ingredient: TIngredient) => {
      dispatch(addIngredient(ingredient));
    },
    [dispatch]
  );

  const renderedIngredients = useCallback(
    (typeIngredients: IngredientEnum) => {
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
    },
    [handleRightClick, ingredients]
  );

  const rendererBun = useMemo(
    () => renderedIngredients(bun),
    [renderedIngredients, bun]
  );

  const rendererSauce = useMemo(
    () => renderedIngredients(sauce),
    [renderedIngredients, sauce]
  );

  const rendererMain = useMemo(
    () => renderedIngredients(main),
    [renderedIngredients, main]
  );

  function handleOnClickCurrent(el: IngredientEnum) {
    //console.log(refMain.current);

    setCurrent(el);
    const element = document.getElementById(el);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  //const refeHeder = useRef(null);

  const [refBun, inViewBun] = useInView({
    threshold: 0,
  });

  const [refSauce, inViewMain] = useInView({
    threshold: 0,
  });
  const [refMain, inViewSauce] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inViewBun) {
      setCurrent(bun);
    } else if (inViewSauce) {
      setCurrent(sauce);
    } else if (inViewMain) {
      setCurrent(main);
    }
  }, [inViewBun, inViewMain, inViewSauce, bun, main, sauce]);

  return (
    <section className={burgerIngredientsStyles.section}>
      <p className='text text_type_main-large pt-10 pb-5'>Соберите бургер</p>
      <div /*ref={refeHeder}*/ className={burgerIngredientsStyles.blockTab}>
        <Tab
          value={`${bun}`}
          active={current === bun}
          onClick={() => handleOnClickCurrent(bun)}
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
};

export default BurgerIngredients;
