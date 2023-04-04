import { useMemo, useCallback, FC } from 'react';
import { Oval } from 'react-loader-spinner';

import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { Topping } from '../topping/topping';

import styles from './burger-constructor-styles.module.css';

import { useSelector, useDispatch } from '../../types/store';
import { useNavigate } from 'react-router-dom';

import {
  addIngredient,
  deleteIngredient,
  resetConstructor,
} from '../../services/actions/constructor';

import { postOrder, closeOrderInfo } from '../../services/actions/order';

import { useDrop } from 'react-dnd';
import { TConstuctorElement } from '../../types/constructor';
import { TIngredient } from '../../types/ingredients';
import { TOrder } from '../../types/order';

//declare module './burger-constructor';

const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.user.userInfo);

  const { bun, toppings } = useSelector((state) => state.constructorBurger);

  const { orderNumber, postOrderRequest, isOrderInfoOpened } = useSelector(
    (state) => state.order
  );

  const handleDeleteButton = useCallback(
    (ingredient: TConstuctorElement) => {
      dispatch(deleteIngredient(ingredient));
    },
    [dispatch]
  );

  const ingredientsIds = useMemo(
    () =>
      toppings.length && bun
        ? {
            ingredients: [
              bun.data._id,
              ...toppings.map((item: TConstuctorElement) => item.data._id),
              bun.data._id,
            ],
          }
        : null,
    [bun, toppings]
  );

  const handleOrder = (order: TOrder | null) => {
    if (!userInfo) {
      navigate('/login');
    } else {
      dispatch(postOrder(order));
    }
  };

  const closeModal = () => {
    dispatch(closeOrderInfo());
    dispatch(resetConstructor());
  };

  const counterTotalPrice = useMemo(() => {
    const bunTotalPrice = bun ? 2 * bun.data.price : 0;
    const totalPrice = toppings.reduce(
      (acc, item) => acc + item.data.price,
      bunTotalPrice
    );
    return totalPrice;
  }, [bun, toppings]);

  const handleOnDrop = (ingredient: TIngredient) => {
    dispatch(addIngredient(ingredient));
  };

  const [{ isHover, canDrop }, dropTarget] = useDrop({
    accept: 'ingredients',
    drop(ingredient: TIngredient) {
      handleOnDrop(ingredient);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const rendererIngredients = useMemo(
    () =>
      toppings.map((item, i) => (
        <Topping
          ingredient={item}
          key={item.id}
          index={i}
          handleClose={() => handleDeleteButton(item)}
        ></Topping>
      )),
    [toppings, handleDeleteButton]
  );

  return (
    <section className={styles.section}>
      <div
        className={`${canDrop && !isHover && styles.dropActive} ${
          isHover && styles.dropHover
        }`}
        ref={dropTarget}
      >
        <div className={styles.blockItem + ' pl-8 pr-4'}>
          {!bun ? (
            <p className='text text_type_main-medium mt-15 mb-5 pr-5'>
              Выберите и перетащите сюда булку
            </p>
          ) : (
            <ConstructorElement
              text={bun.data.name + ' (верх)'}
              thumbnail={bun.data.image}
              price={bun.data.price}
              type='top'
              isLocked={true}
            />
          )}
        </div>
        {toppings.length ? (
          <ul className={styles.blockTipes}>{rendererIngredients}</ul>
        ) : (
          <p className='text text_type_main-medium mt-5 mb-5 ml-8 pr-5'>
            Выберите и перетащите сюда начинки
          </p>
        )}
        <div className={styles.blockItem + ' pl-8 pr-4'}>
          {!bun ? null : (
            <ConstructorElement
              text={bun.data.name + ' (низ)'}
              thumbnail={bun.data.image}
              price={bun.data.price}
              type='bottom'
              isLocked={true}
            />
          )}
        </div>
        <div className={styles.blockPrice + ' mt-6 mb-10 pr-4'}>
          {postOrderRequest && (
            <Oval
              ariaLabel='loading-indicator'
              height={70}
              width={70}
              strokeWidth={5}
              strokeWidthSecondary={2}
              color='blue'
              secondaryColor='white'
            />
          )}
          <p className='text text_type_digits-medium pr-2'>
            {counterTotalPrice}
          </p>
          <div className={styles.blockCurrencyIcon + ' mr-10'}>
            <CurrencyIcon type='primary' />
          </div>
          <Button
            className={
              styles.button +
              ` ${(!toppings.length || !bun) && styles.buttonInvisible}`
            }
            onClick={() => handleOrder(ingredientsIds)}
            htmlType='button'
            type='primary'
            size='large'
            disabled={!toppings.length || !bun}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
      {isOrderInfoOpened && (
        <Modal closeModal={closeModal}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </section>
  );
};

export { BurgerConstructor };
