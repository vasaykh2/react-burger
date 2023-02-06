import React, { useContext, useState, useMemo, useEffect } from 'react';
import { Oval } from 'react-loader-spinner';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import { OrderDetails } from '../order-details/order-details';
import { Modal } from '../modal/modal';
import burgerConstructorStyles from './burger-constructor-styles.module.css';

import { useSelector, useDispatch } from 'react-redux';
import {
  GET_CONSTRUCTOR_LIST,
  ADD_CONSTRUCTOR_LIST,
  addConstructorList,
} from '../../services/actions/constructor';

import {
  UPDATE_ORDER_DETAILS,
  postOrderDetails,
} from '../../services/actions/order-details';

import { useDrop } from 'react-dnd';

export let listId = '';

export default function BurgerConstructor() {
  const { ingredientsLoad, ingredientsFailed, ingredients } = useSelector(
    (state) => state.ingredientsReducer
  );

  const dispatch = useDispatch();

  const { bun, toppings } = useSelector((state) => state.constructorReducer);
  //console.log(data.length);
  //const isData = data.length == 0 ? false : true;
  //console.log(isData);

  /*const handleAllIngredients = () => {
    dispatch({
      type: GET_CONSTRUCTOR_LIST,
      payload: ingredients,
    });
  };*/

  listId = useMemo(
    () => (!toppings ? '' : toppings.map((item) => item.data._id)),
    [toppings]
  );
  const bunId = bun ? bun.data._id : '';
  listId.push(bunId);
  //console.log(listId);

  const { orderNumber, isLoading, isModalOrderDetails } = useSelector(
    (state) => state.orderDetailsReducer
  );
  // console.log(orderDetails);

  const handleOrder = () => {
    dispatch(postOrderDetails());
  };

  const handleClose = () => {
    dispatch({ type: UPDATE_ORDER_DETAILS });
  };

  const counterTotalPrice = useMemo(
    () => {
      const bunTotalPrice = bun ?  2 * bun.data.price : 0;
      const totalPrice = toppings.reduce(
        (acc, item) => acc + item.data.price, bunTotalPrice
        );
        return totalPrice;
    },
    [bun, toppings]
  );

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
      : toppings.map((item) => {
          if (item.data.type === 'sauce' || item.data.type === 'main') {
            return (
              <li
                className={burgerConstructorStyles.blockString + ' pr-2'}
                key={item.data._id}
              >
                <DragIcon type='primary' />
                <div className={burgerConstructorStyles.blockItem}>
                  <ConstructorElement
                    text={item.data.name}
                    thumbnail={item.data.image}
                    price={item.data.price}
                    type='undefined'
                    isLocked=''
                  />
                </div>
              </li>
            );
          }
        });
  }

  const rendererIngredients = useMemo(
    () => renderedIngredients(),
    [toppings]
  );

  return (
    <section className={burgerConstructorStyles.section}>
      <div
        className={`${
          canDrop && !isHover && burgerConstructorStyles.dropActive
        } ${isHover && burgerConstructorStyles.dropHover}`}
        ref={dropTarget}
      >
        <div className={burgerConstructorStyles.blockItem + ' pl-8 pr-4'}>
          {!bun ? null : (
            <ConstructorElement
              text={bun.data.name + ' (верх)'}
              thumbnail={bun.data.image}
              price={bun.data.price}
              type='top'
              isLocked='undefined'
            />
          )}
        </div>
        <ul className={burgerConstructorStyles.blockTipes}>
          {rendererIngredients}
        </ul>
        <div className={burgerConstructorStyles.blockItem + ' pl-8 pr-4'}>
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
        <div
          className={burgerConstructorStyles.blockPrice + ' mt-6 mb-10 pr-4'}
        >
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
          <p className='text text_type_digits-medium pr-2'>{counterTotalPrice}</p>
          <div className={burgerConstructorStyles.blockCurrencyIcon + ' mr-10'}>
            <CurrencyIcon type='primary' />
          </div>
          <button
            className={burgerConstructorStyles.button}
            onClick={handleOrder}
          >
            Оформить заказ
          </button>
        </div>
      </div>
      {isModalOrderDetails && (
        <Modal onClose={handleClose}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </section>
  );
}
