import React, { useContext, useState, useMemo, useEffect } from 'react';
import { Oval } from 'react-loader-spinner';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import { OrderDetails } from '../order-details/order-details';
import { Modal } from '../modal/modal';
import burgerConstructorStyles from './burger-constructor-styles.module.css';
import { BASE_URL } from '../../utils/constants';

import { TotalPriceContext } from '../../services/app-context';

import { BurgerConstructorContext } from '../../services/burger-constructor-context';
import { request } from '../../utils/request';

import { useSelector, useDispatch } from 'react-redux';
import {
  GET_CONSTRUCTOR_LIST,
  getIngredientsList,
} from '../../services/actions/constructor';

import { ADD_CURRENT_INGREDIENT_DETAILS } from '../../services/actions/current-ingredient-details';

const urlOrders = BASE_URL + 'orders';

export default function BurgerConstructor() {
  const { ingredientsLoad, ingredientsFailed, ingredients } = useSelector(
    (state) => state.ingredientsReducer
  );

  const { data } = useSelector((state) => state.constructorReducer);
  console.log(data);

  const dispatch = useDispatch();

  useEffect(() => {
        dispatch({
      type: GET_CONSTRUCTOR_LIST,
      data: ingredients,
    });
  }, []);

  const constructorState = useContext(BurgerConstructorContext);

  const listId = useMemo(
    () => constructorState.data.map((item) => item._id),
    [constructorState.data]
  );

  

  /*useEffect(() => {
    dispatch({
  type: UPDATE_ORDER_DETAILS,
  data: {
    name: '',
    order: {
      number: 8888,
    },
    success: true,
    isLoading: false,
    isModalOrderDetails: false,
  },
});
}, []);*/




const {  } = useSelector((state) => state.currentIngredientDetailsReducer);
  console.log(data);

  const [orderDetails, setModalOrderDetails] = useState({
    name: '',
    order: {
      number: 8888,
    },
    success: true,
    isLoading: false,
    isModalOrderDetails: false,
  });




  const handleOrder = () => {
    setModalOrderDetails({
      ...orderDetails,
      isLoading: true,
      isModalOrderDetails: false,
    });
    request(urlOrders, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredients: listId,
      }),
    })
      .then((res) => {
        //console.log(res);
        setModalOrderDetails({
          ...res,
          isLoading: false,
          isModalOrderDetails: true,
        });
        //console.log(orderDetails);
      })
      .catch((e) => {
        console.log(e);
        setModalOrderDetails({
          ...orderDetails,
          success: false,
          isLoading: false,
          isModalOrderDetails: false,
        });
      });
  };



  
  const handleClose = () => {
    setModalOrderDetails({ ...orderDetails, isModalOrderDetails: false });
  };
  const totalPrice = useContext(TotalPriceContext);

  function renderedIngredients() {
    return constructorState.data.map((item) => {
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
    [constructorState.data]
  );

  return (
    <section className={burgerConstructorStyles.section}>
      <div className={burgerConstructorStyles.blockItem + ' pl-8 pr-4'}>
        <ConstructorElement
          text={constructorState.data[0].name + ' (верх)'}
          thumbnail={constructorState.data[0].image}
          price={constructorState.data[0].price}
          type='top'
          isLocked='undefined'
        />
      </div>
      <ul className={burgerConstructorStyles.blockTipes}>
        {rendererIngredients}
      </ul>
      <div className={burgerConstructorStyles.blockItem + ' pl-8 pr-4'}>
        <ConstructorElement
          text={constructorState.data[0].name + ' (низ)'}
          thumbnail={constructorState.data[0].image}
          price={constructorState.data[0].price}
          type='bottom'
          isLocked='undefined'
        />
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
        <div className={burgerConstructorStyles.blockCurrencyIcon + ' mr-10'}>
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
