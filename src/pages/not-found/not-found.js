import img from '../../images/order accpeted-done.png';
import { useCallback } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './not-found.module.css';

const NotFound = () => {
  const navigate = useNavigate();

  const comeback = useCallback(
    () => navigate('/', { replace: true }),
    [navigate]
  );

  return (
    <>
      <div className={styles.container}>
        <span className={styles.errorNumber}>4</span>
        <img src={img} alt='галочка' />
        <span className={styles.errorNumber}>4</span>
      </div>
      <p className='text text_type_main-medium mb-15'>
        Ошибочный путь - возвращайтесь.
      </p>
      <Button htmlType='button' type='primary' size='large' onClick={comeback}>
        Вернуться
      </Button>
    </>
  );
};
export default NotFound;
