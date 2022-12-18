import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import modalOverlayStyles from './modal-overlay-styles.module.css';

const modalRoot = document.getElementById('react-modals');

export function ModalOverlay({ isVisible = false, onClose, ...props }) {

  return !isVisible
    ? null
    : ReactDOM.createPortal(
        <>
          <section
            className={modalOverlayStyles.modal}
            onClick={onClose}
          >            
              {props.children}            
          </section>
        </>,
        modalRoot
      );
}

ModalOverlay.propTypes = PropTypes.shape({
  children: PropTypes.node,  
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
}).isRequired;
