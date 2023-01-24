import React, { useContext } from 'react';
//import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

//import { ingredientType } from '../../utils/types';
import { OrderDetails } from '../order-details/order-details';
import { Modal } from '../modal/modal';
import burgerConstructorStyles from './burger-constructor-styles.module.css';

import { IngredientContext, } from '../../services/ingredient-context'

export default function BurgerConstructor() {
  const [isModalOrderDetails, setModalOrderDetails] = React.useState(false);

  const handleOrder = () => {
    setModalOrderDetails(true);
  };

  const handleClose = () => {
    setModalOrderDetails(false);
  };

  const constructorState =  useContext(IngredientContext);

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
        <p className='text text_type_digits-medium pr-2'>610</p>
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
      {isModalOrderDetails && (
        <Modal header={'Детали ингредиента'} onClose={handleClose}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}

/*BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired,
}*/

