import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import orderAccpetedDone from '../../images/order accpeted-done.png';
import styles from './order-details-styles.module.css';

export function OrderDetails({ orderNumber }) {
  return (
    <div className={styles.block}>
      <p className='text text_type_digits-large pt-2 pb-8'>{orderNumber}</p>
      <p className='text text_type_main-medium pb-15'>Идентификатор заказа</p>
      <img src={orderAccpetedDone} alt='Заказ начали готовитьа' />
      <p className='text text_type_main-default pt-15 pb-2'>
        Ваш заказ начали готовить
      </p>
      <p className='text text_type_main-default text_color_inactive pb-15'>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

OrderDetails.propTypes = {
  orderNumber: PropTypes.number,
}.isRequired;
