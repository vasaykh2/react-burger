import React, { useContext } from 'react';
import orderAccpetedDone from '../../images/order accpeted-done.png';
import OrderDetailsStyles from './order-details-styles.module.css';

import { OrderDetailsContext } from '../../services/order-details-context';

export function OrderDetails() {
  const orderDetails = useContext(OrderDetailsContext);

  return (
    <div className={OrderDetailsStyles.block}>
      <p className='text text_type_digits-large pt-2 pb-8'>
        {orderDetails.order.number}
      </p>
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
