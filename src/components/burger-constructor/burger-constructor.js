import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerConstructorStyles from './burger-constructor-styles.module.css';

function BurgerConstructor(props) {
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
            <li className={burgerConstructorStyles.blockString + ' pr-2'}>
              <div className={visibilDrag}>
              <DragIcon type='primary'  />
              </div>
              <div className={burgerConstructorStyles.blockItem}>
                <ConstructorElement
                  text={item.name}
                  thumbnail={item.image}
                  price={item.price}
                  type={typeItem}
                  isLocked={isLockedItem}
                  extraClass='undefined'
                  handleClose='(() => void)'
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

export default BurgerConstructor;