import React from 'react';
import ReactDOM from 'react-dom';
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

  React.useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler);
  });

  return !isVisible
    ? null
    : ReactDOM.createPortal(
        <>
          <section className={modalOverlayStyles.modal} onClick={onClose}>
            <div className={modalOverlayStyles.block}>
              <div className={modalOverlayStyles.header}>
                <p className='text text_type_main-large'>{props.header}</p>
                <div
                  className={modalOverlayStyles.modalClose}
                  onClick={onClose}
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

/*
const App = () => {
  const [isModal, setModal] = React.useState(false);
  return (
    <>
      <button onClick={() => setModal(true)}>Click Here</button>
      <Modal

        isVisible={isModal}
        title="Modal Title"
        content={<p>Add your content here</p>}
        footer={<button>Cancel</button>}
        onClose={() => setModal(false)}
      />
    </>
  );
};
*/
