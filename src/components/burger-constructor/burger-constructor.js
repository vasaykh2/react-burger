import React, { useContext, useState } from 'react';
//import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

//import { ingredientType } from '../../utils/types';
import { OrderDetails } from '../order-details/order-details';
import { Modal } from '../modal/modal';
import burgerConstructorStyles from './burger-constructor-styles.module.css';
import { BASE_URL } from '../../utils/constants'


import { OrderDetailsContext } from '../../services/order-details-context';
import { TotalPriceContext } from '../../services/app-context';
import { BurgerConstructorContext } from '../../services/burger-constructor-context';

const urlOrders = BASE_URL + 'orders';

export default function BurgerConstructor() {
  const constructorState = useContext(BurgerConstructorContext);

  const listId = constructorState.data.map((item) => item._id);

  const [orderDetails, setModalOrderDetails] = useState({
    name: '',
    order: {
      number: 8888,
    },
    success: true,
    isModalOrderDetails: false,
  });

  //["60d3b41abdacab0026a733c6"]

  const handleOrder = () => {
    fetch(urlOrders, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredients: listId,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((res) => {
        //console.log(res);
        setModalOrderDetails({ ...res, isModalOrderDetails: true });
        //console.log(orderDetails);
      })
      .catch((e) => {
        console.log(e);
        setModalOrderDetails({
          ...orderDetails,
          success: false,
          isModalOrderDetails: false,
        });
      });
  };

  const handleClose = () => {
    setModalOrderDetails({ ...orderDetails, isModalOrderDetails: false });
  };

  const totalPrice = useContext(TotalPriceContext);

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
        {constructorState.data.map((item) => {
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
        })}
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
        <Modal header={'Детали ингредиента'} onClose={handleClose}>
          <OrderDetailsContext.Provider value={orderDetails}>
            <OrderDetails />
          </OrderDetailsContext.Provider>
        </Modal>
      )}
    </section>
  );
}

/*BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired,
}*/
