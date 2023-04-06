import React, { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';
//import { Outlet  } from "react-router-dom";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../modal-overlay/modal-overlay';

import styles from './modal-styles.module.css';

type TModalProps = {
  closeModal: () => void;
  children: ReactNode;
};

const Modal: FC<TModalProps> = ({ closeModal, children }) => {
  const modalRoot = document.getElementById('react-modals') as HTMLElement;

  React.useEffect(() => {
    const keydownHandler = (event: KeyboardEvent) => {
      event.key === 'Escape' && closeModal();
    };

    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler);
  }, [closeModal]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClick={closeModal} />
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.modalClose} onClick={closeModal}>
            <CloseIcon type='primary' />
          </div>
        </div>

        {children}
      </div>
    </>,
    modalRoot
  );
};

export default Modal;
