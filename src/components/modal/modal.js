import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../modal-overlay/modal-overlay';

import modalStyles from './modal-styles.module.css';
import modalOverlayStyles from '../modal-overlay/modal-overlay-styles.module.css';

export function Modal({ onClose, ...props }) {
  const modalRoot = document.getElementById('react-modals');
  const handlerClickOverlay = (e) => {
    e.stopPropagation();
    e.preventDefault();
    //console.log(e);
    e.target.classList.contains(modalOverlayStyles.modal) && onClose();
  };

  const handlerClickClose = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onClose();
  };

  React.useEffect(() => {
    const keydownHandler = ({ key }) => {
      switch (key) {
        case 'Escape':
          onClose();
          break;
        default:
      }
    };

    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler);
  }, []);

  return ReactDOM.createPortal(
    <ModalOverlay onClose={handlerClickOverlay}>
      <div className={modalStyles.block}>
        <div className={modalStyles.header}>
          <p className='text text_type_main-large'>{props.header}</p>
          <div className={modalStyles.modalClose} onClick={handlerClickClose}>
            <CloseIcon type='primary' />
          </div>
        </div>
        {props.children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.string,
  onClose: PropTypes.func.isRequired,
}
