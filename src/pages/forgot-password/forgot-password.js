import {
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { requestPasswordReset } from "../../services/actions/user";
import { useForm } from '../../services/hooks/useForm';
import styles from './forgot-password.module.css';

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const { values, handleChange, isValid } = useForm({ email: '' }, false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(requestPasswordReset(values));
  };

  return (
    <div className={`${styles.container}`}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={`${styles.title}  text text_type_main-medium`}>
          Восстановление пароля
        </h1>
        <EmailInput
          placeholder='Укажите e-mail'
          name='email'
          onChange={(evt) => handleChange(evt)}
          value={values.email ? values.email : ''}
        />
        <Button
          htmlType='submit'
          type='primary'
          size='medium'
          disabled={!isValid}
        >
          Восстановить
        </Button>
      </form>
      <p className='text text_type_main-default text_color_inactive mt-20'>
        Вспомнили пароль?
        <Link className={styles.link} to='/login'>
          Войти
        </Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
