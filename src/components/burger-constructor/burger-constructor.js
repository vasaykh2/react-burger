import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerConstructorStyles from './burger-constructor-styles.module.css';
function BurgerConstructor(props) {
  const hc = () => props.void;
  return (
    <section className={burgerConstructorStyles.section}>
      <ul className={burgerConstructorStyles.blockTipes}>
        {props.data.map((item, index, array) => {
          let typeItem;
          let isLockedItem;
          let visibilDrag;
          if (index === 0) {
            typeItem = 'top';
            isLockedItem = 'undefined';
            visibilDrag = burgerConstructorStyles.blockDrag;
          } else {
            if (index === array.length - 1) {
              typeItem = 'bottom';
              isLockedItem = 'undefined';
              visibilDrag = burgerConstructorStyles.blockDrag;
            } else {
              typeItem = 'undefined';
              isLockedItem = '';
              visibilDrag = '';
            }
          }
          return (
            <li className={burgerConstructorStyles.blockString + ' pr-2'} key={item._id}>
              <div className={visibilDrag}>
                <DragIcon type='primary' />
              </div>
              <div className={burgerConstructorStyles.blockItem}>
                <ConstructorElement
                  text={item.name}
                  thumbnail={item.image}
                  price={item.price}
                  type={typeItem}
                  isLocked={isLockedItem}
                  extraClass='undefined'
                  handleClose={hc}
                />
              </div>
            </li>
          );
        })}
      </ul>
      <div className={burgerConstructorStyles.blockPrice + ' mt-10 mb-10 pr-4'}>
        <p className='text text_type_digits-medium pr-2'>610</p>
        <div className={burgerConstructorStyles.blockCurrencyIcon + ' mr-10'}>
          <CurrencyIcon type='primary' />
        </div>
        <button className={burgerConstructorStyles.button}>
          Оформить заказ
        </button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      price: PropTypes.number,
      image: PropTypes.string,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,
      __v: PropTypes.number,
    })
  ),
};

export default BurgerConstructor;
