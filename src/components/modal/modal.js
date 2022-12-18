import React from 'react';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../modal-overlay/modal-overlay';

import modalStyles from './modal-styles.module.css';
import modalOverlayStyles from '../modal-overlay/modal-overlay-styles.module.css';

export function Modal({ isVisible = false, onClose, ...props }) {
  const keydownHandler = ({ key }) => {
    switch (key) {
      case 'Escape':
        onClose();
        break;
      default:
    }
  };

  const handlerClickOverlay = (e) => {
    e.stopPropagation();
    e.preventDefault();    
    e.target.classList.contains(modalOverlayStyles.modal) && onClose();
  };

  const handlerClickClose = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onClose();
  };

  React.useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler);
  });

  return (
    <ModalOverlay onClose={handlerClickOverlay} isVisible={isVisible}>
      <div className={modalStyles.block}>
        <div className={modalStyles.header}>
          <p className='text text_type_main-large'>{props.header}</p>
          <div className={modalStyles.modalClose} onClick={handlerClickClose}>
            <CloseIcon type='primary' />
          </div>
        </div>
        {props.children}
      </div>
    </ModalOverlay>
  );
}

Modal.propTypes = PropTypes.shape({
  children: PropTypes.node,
  header: PropTypes.string,
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
}).isRequired;
