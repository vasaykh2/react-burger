import PropTypes from 'prop-types';
import modalOverlayStyles from './modal-overlay-styles.module.css';

export function ModalOverlay(props) {
  return  (<section className={modalOverlayStyles.modal} onClick={props.onClose}>
    {props.children}
  </section>)
}

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired, 
  onClose: PropTypes.func.isRequired, 
}
