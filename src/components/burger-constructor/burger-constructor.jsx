import { useMemo, useCallback } from 'react';
import { Oval } from 'react-loader-spinner';

import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { OrderDetails } from '../order-details/order-details';
import { default as Modal } from '../modal/modal';
import { Topping } from '../topping/topping';
import styles from './burger-constructor-styles.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import {
  addConstructorList,
  deleteConstructorList,
  resetConstructor,
} from '../../services/actions/constructor';

import {
  postOrderDetails,
  closeOrderDetails,
} from '../../services/actions/order-details';

import { useDrop } from 'react-dnd';

//let listId = '';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteButton = useCallback(
    (ingredient) => {
      dispatch(deleteConstructorList(ingredient));
    },
    [dispatch]
  );

  const userInfo = useSelector((state) => state.user.userInfo);

  const { bun, toppings } = useSelector((state) => state.constructorBurger);

  const { order, isLoading, isModalOrderDetails } = useSelector(
    (state) => state.orderDetails
  );
  // console.log(orderDetails);

  const handleOrder = () => {
    const ingredientsIds = [
      bun.data._id,
      ...toppings.map((item) => item.data._id),
      bun.data._id,
    ];
    if (!userInfo) {
      navigate('/login');
      
    } else {
      dispatch(postOrderDetails(ingredientsIds));
      //console.log(ingredientsIds);
    }
  };

  const closeModal = () => {
    dispatch(closeOrderDetails());
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

  const handleOnDrop = (ingredient) => {
    dispatch(addConstructorList(ingredient));
  };

  const [{ isHover, canDrop }, dropTarget] = useDrop({
    accept: 'ingredients',
    drop(ingredient) {
      handleOnDrop(ingredient);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  function renderedIngredients() {
    return !toppings
      ? null
      : toppings.map((item, i) => {
          if (item.data.type === 'sauce' || item.data.type === 'main') {
            return (
              <Topping
                ingredient={item}
                key={item.id}
                index={i}
                handleClose={() => handleDeleteButton(item)}
              ></Topping>
            );
          }
        });
  }

  const rendererIngredients = useMemo(() => renderedIngredients(), [toppings]);

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
              isLocked='undefined'
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
              isLocked='undefined'
            />
          )}
        </div>
        <div className={styles.blockPrice + ' mt-6 mb-10 pr-4'}>
          {isLoading && (
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
            className={styles.button + ` ${(!toppings.length || !bun) && styles.buttonInvisible}`}
            onClick={handleOrder}
            htmlType='button'
            type='primary'
            size='large'
            disabled={!toppings.length || !bun}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
      {isModalOrderDetails && (
        <Modal closeModal={closeModal}>
          <OrderDetails orderNumber={order.number} />
        </Modal>
      )}
    </section>
  );
}

export { BurgerConstructor };
