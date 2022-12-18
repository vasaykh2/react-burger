import React from 'react';
import PropTypes from 'prop-types';
import orderAccpetedDone from '../../images/order accpeted-done.png';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import OrderDetailsStyles from './order-details-styles.module.css';

export function OrderDetails({ isVisible = false, onClose, ...props }) {
  return (
    <ModalOverlay isVisible={isVisible} onClose={onClose} header=''>
      <div className={OrderDetailsStyles.block}>
        <p className='text text_type_digits-large pt-2 pb-8'>034536</p>
        <p className='text text_type_main-medium pb-15'>Идентификатор заказа</p>
        <img src={orderAccpetedDone} alt='Заказ начали готовитьа' />
        <p className='text text_type_main-default pt-15 pb-2'>Ваш заказ начали готовить</p>
        <p className='text text_type_main-default text_color_inactive pb-15'>
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </ModalOverlay>
  );
}

OrderDetails.propTypes = PropTypes.shape({
  isVisible: PropTypes.bool, 
  onClose: PropTypes.func, 
}).isRequired;
