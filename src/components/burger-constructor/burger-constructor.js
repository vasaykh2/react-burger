import React, { useContext, useState, useMemo, useEffect } from 'react';
import { Oval } from 'react-loader-spinner';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import { OrderDetails } from '../order-details/order-details';
import { Modal } from '../modal/modal';
import burgerConstructorStyles from './burger-constructor-styles.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { GET_CONSTRUCTOR_LIST } from '../../services/actions/constructor';

import {
  UPDATE_ORDER_DETAILS,
  postOrderDetails,
} from '../../services/actions/order-details';

import { useDrop } from "react-dnd";

export let listId = '';

export default function BurgerConstructor() {

  const { ingredientsLoad, ingredientsFailed, ingredients } = useSelector(
    (state) => state.ingredientsReducer
  );

  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.constructorReducer);
  //console.log(data.length);
  const isData = data.length == 0 ? false : true;
  //console.log(isData);

  const handleAllIngredients = () => {
    dispatch({
      type: GET_CONSTRUCTOR_LIST,
      data: ingredients,
    });
  };

  const constructorState = data;

  listId = useMemo(
    () => (!isData ? 0 : constructorState.map((item) => item._id)),
    [constructorState]
  );
  //console.log(listId);

  const orderDetails = useSelector((state) => state.orderDetailsReducer);
  // console.log(orderDetails);

  const handleOrder = () => {
    dispatch(postOrderDetails());
  };

  const handleClose = () => {
    dispatch({ type: UPDATE_ORDER_DETAILS });
  };

  const totalPrice = useMemo(
    () =>
      !isData
        ? 0
        : constructorState.reduce(
            (acc, item) => acc + item.price,
            !isData ? 0 : constructorState[0].price
          ),
    [constructorState]
  );

  const onDropHandler = (itemId) => {
    dispatch({
      type: GET_CONSTRUCTOR_LIST,
      data: ingredients,
    });
  };

  const itemId = '60d3b41abdacab0026a733cc';


  const [{ isHover }, drop] = useDrop({
    accept: "sauce",
    collect: monitor => ({
      isHover: monitor.isOver(),
  }),
    drop(itemId) {
        onDropHandler(itemId);
    },    
});

const borderColor = isHover ? 'lightgreen' : 'transparent';



  function renderedIngredients() {
    return !isData
      ? null
      : constructorState.map((item) => {
          if (item.type === 'sauce' || item.type === 'main') {
            return (
              <li
                className={burgerConstructorStyles.blockString + ' pr-2'}
                key={item._id}
              >
                <DragIcon type='primary' />
                <div className={burgerConstructorStyles.blockItem}>
                  <ConstructorElement
                    text={item.name}
                    thumbnail={item.image}
                    price={item.price}
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
    [constructorState]
  );

  return (
    <section     className={burgerConstructorStyles.section}>
      <div className={burgerConstructorStyles.blockItem + ' pl-8 pr-4'}>
        {!isData ? null : (
          <ConstructorElement
            text={constructorState[0].name + ' (верх)'}
            thumbnail={constructorState[0].image}
            price={constructorState[0].price}
            type='top'
            isLocked='undefined'
          />
        )}
      </div>
      <ul ref={drop}    style={{borderColor}}
        className={burgerConstructorStyles.blockTipes}>
        {rendererIngredients}
      </ul>
      <div className={burgerConstructorStyles.blockItem + ' pl-8 pr-4'}>
        {!isData ? null : (
          <ConstructorElement
            text={constructorState[0].name + ' (низ)'}
            thumbnail={constructorState[0].image}
            price={constructorState[0].price}
            type='bottom'
            isLocked='undefined'
          />
        )}
      </div>
      <div className={burgerConstructorStyles.blockPrice + ' mt-6 mb-10 pr-4'}>
        {orderDetails.isLoading && (
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
        <p className='text text_type_digits-medium pr-2'>{totalPrice}</p>
        <div
          onClick={handleAllIngredients}
          className={burgerConstructorStyles.blockCurrencyIcon + ' mr-10'}
        >
          <CurrencyIcon type='primary' />
        </div>
        <button
          className={burgerConstructorStyles.button}
          onClick={handleOrder}
        >
          Оформить заказ
        </button>
      </div>{' '}
      {orderDetails.isModalOrderDetails && (
        <Modal onClose={handleClose}>
          <OrderDetails orderDetails={orderDetails} />
        </Modal>
      )}
    </section>
  );
}
