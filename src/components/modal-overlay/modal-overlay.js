import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import modalOverlayStyles from './modal-overlay-styles.module.css';

const modalRoot = document.getElementById('react-modals');

export function ModalOverlay({ isVisible = false, onClose, ...props }) {
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

  return !isVisible
    ? null
    : ReactDOM.createPortal(
        <>
          <section
            className={modalOverlayStyles.modal}
            onClick={handlerClickOverlay}
          >
            <div className={modalOverlayStyles.block}>
              <div className={modalOverlayStyles.header}>
                <p className='text text_type_main-large'>{props.header}</p>
                <div
                  className={modalOverlayStyles.modalClose}
                  onClick={handlerClickClose}
                >
                  <CloseIcon type='primary' />
                </div>
              </div>
              {props.children}
            </div>
          </section>
        </>,
        modalRoot
      );
}

ModalOverlay.propTypes = PropTypes.shape({
  children: PropTypes.node,
  header: PropTypes.string,
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
}).isRequired;
