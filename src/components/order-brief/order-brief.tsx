import { useMemo, FC } from 'react';
import { useSelector } from '../../types/store';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';

import {
  FormattedDate,
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-brief.module.css';

import { TOrderInfo } from '../../types/order';
import { TIngredient } from '../../types/ingredients';

type TOrderBriefProps = {
  order: TOrderInfo;
  forUser: boolean;
};

export type TIngredientsCount = {
  count: number;
} & TIngredient;

const OrderBrief: FC<TOrderBriefProps> = ({ order, forUser }) => {
  const location = useLocation();

  const path = useResolvedPath('').pathname;
  const { createdAt, ingredients, name, number, status } = order;

  const ingredientsInfo = useSelector((state) => state.ingredients.ingredients);

  const selectedIngredients = useMemo(() => {
    const ingredientsList = ingredients.reduce(
      (arr: TIngredient[], ingredient) => {
        const myIngredient = ingredientsInfo.find(
          (ingredientInfo) => ingredientInfo._id === ingredient
        );
        return myIngredient ? [...arr, myIngredient] : arr;
      },
      []
    );

    const ingredientsCount = ingredientsList.reduce(
      (arr: Array<TIngredientsCount>, ingredient) => {
        let currentIngredient = arr.find(
          (arrIngrredient) => arrIngrredient._id === ingredient._id
        );
        if (currentIngredient) {
          currentIngredient.count += 1;
        } else {
          let currentIngredient = {
            count: 1,
            ...ingredient,
          };
          arr.push(currentIngredient);
        }
        return arr;
      },
      []
    );
    return ingredientsCount;
  }, [ingredients, ingredientsInfo]);

  const totalPrice = useMemo(
    () =>
      selectedIngredients.reduce(
        (total, ingredient) => (total += ingredient.price * ingredient.count),
        0
      ),
    [selectedIngredients]
  );

  const hiddenImagesCount = useMemo(
    () =>
      selectedIngredients.length > 5 ? selectedIngredients.length - 5 : null,
    [selectedIngredients]
  );

  const headerNumber = useMemo(
    () => `${number.toString().padStart(6, '0')}`,
    [number]
  );

  const OrderStatuses = {
    created: 'Создан',
    pending: 'Готовится',
    done: 'Выполнен',
  };

  const mintoppingsCount = 1;
  const maxIngredientsCount = 6;

  return (
    <li>
      <Link
        className={styles.orderBrief}
        to={{
          pathname: `${path}/${number}`,
        }}
        state={{ background: location }}
      >
        <div className={styles.orderBrief_flexContainer}>
          <p className='text text_type_digits-default'>{headerNumber}</p>
          <p className='text text_type_main-default text_color_inactive'>
            <FormattedDate date={new Date(createdAt)} />
          </p>
        </div>
        <h3 className='text text_type_main-medium mt-6'>{name}</h3>
        {forUser && (
          <span
            className={`text text_type_main-small mt-2 ${
              status === 'done' ? styles.orderBrief_doneStatus : null
            }`}
          >
            {OrderStatuses[status]}
          </span>
        )}
        <div className={`${styles.orderBrief_flexContainer} mt-6`}>
          <ul className={styles.orderBrief_imageList}>
            {selectedIngredients.map(
              (ingredient, index) =>
                index < maxIngredientsCount && (
                  <li
                    className={styles.orderBrief_imageContainer}
                    key={ingredient._id}
                    style={{ zIndex: maxIngredientsCount - index }}
                  >
                    <img
                      className={styles.orderBrief_image}
                      src={ingredient.image}
                      alt={ingredient.name}
                    />
                    {index < maxIngredientsCount - 1 &&
                      ingredient.count > mintoppingsCount && (
                        <Counter
                          count={ingredient.count}
                          size='small'
                          extraClass={styles.orderBrief_counter}
                        />
                      )}
                    {index === maxIngredientsCount - 1 && (
                      <>
                        <div className={styles.orderBrief_imageOverlay}></div>
                        <span
                          className={`${styles.orderBrief_hiddenCount} text text_type_main-small`}
                        >{`+${hiddenImagesCount}`}</span>
                      </>
                    )}
                  </li>
                )
            )}
          </ul>
          <div className={styles.orderBrief_flexContainer}>
            <p className='text text_type_digits-default mr-2'>{totalPrice}</p>
            <CurrencyIcon type='primary' />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default OrderBrief;
