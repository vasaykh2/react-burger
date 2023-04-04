import { useCallback, FC } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import styles from './not-found.module.css';

const NotFound: FC = () => {
  const navigate = useNavigate();

  const comeback = useCallback(
    () => navigate('/', { replace: true }),
    [navigate]
  );

  return (
    <>
      <div className={styles.container}>404</div>
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
