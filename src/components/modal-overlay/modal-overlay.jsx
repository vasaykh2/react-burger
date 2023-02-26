import PropTypes from 'prop-types';
import styles from './modal-overlay-styles.module.css';

function ModalOverlay({onClick}) {
  return <section className={styles.overlay} onClick={onClick}/>
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func
}.isRequired;

export  {ModalOverlay};