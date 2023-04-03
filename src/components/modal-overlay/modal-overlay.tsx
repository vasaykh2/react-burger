import { FC } from 'react';
import styles from './modal-overlay-styles.module.css';

type TModalOverlayProps = {
  onClick: () => void;
};

const ModalOverlay: FC<TModalOverlayProps> = ({ onClick }) => {
  return <section className={styles.overlay} onClick={onClick} />;
};

export { ModalOverlay };
