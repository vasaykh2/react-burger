import ReactDOM from 'react-dom';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { hideInfoBoard } from '../../services/actions/user';

import styles from './info-board.module.css';

function InfoBoard() {
  const infoBoardRoot = document.getElementById('infoBoard');
  const dispatch = useDispatch();
  const boardRef = useRef(null);

  const infoMessage = 'Данные успешно изменены';

  const moveUp = () => {
    const board = boardRef.current;
    board && board.classList.add(styles.infoBoard_disabled);
  };

  useEffect(() => {
    const upTimer = setTimeout(() => moveUp(), 4000);
    const hideTimer = setTimeout(() => dispatch(hideInfoBoard()), 5000);
    return () => {
      clearTimeout(upTimer);
      clearTimeout(hideTimer);
    };
  }, [dispatch]);

  return ReactDOM.createPortal(
    <div className={styles.infoBoard} ref={boardRef}>
      <p className='text text_type_main-default mt-2 mb-2 mr-2 ml-2'>
        {infoMessage}
      </p>
    </div>,
    infoBoardRoot
  );
}

export default InfoBoard;
