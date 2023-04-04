import {
  PasswordInput,
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useDispatch } from '../../types/store';
import { Link } from 'react-router-dom';
import { FormEvent, FC } from 'react';
import { resetPassword } from '../../services/actions/user';

import { useForm } from '../../services/hooks/useForm';
import styles from './reset-password.module.css';

const ResetPassword: FC = () => {
  const dispatch = useDispatch();

  const { values, handleChange, isValid } = useForm(
    { password: '', token: '' },
    false
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetPassword(values));
  };

  return (
    <div className={`${styles.container}`}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={`${styles.title}  text text_type_main-medium`}>
          Восстановление пароля
        </h1>
        <PasswordInput
          placeholder='Введите новый пароль'
          name='password'
          onChange={(evt) => handleChange(evt)}
          value={values.password ? values.password : ''}
        />
        <Input
          type='text'
          placeholder='Введите код из письма'
          name='token'
          onChange={(evt) => handleChange(evt)}
          value={values.token ? values.token : ''}
          errorText={'Введите код из письма'}
        />
        <Button
          htmlType='submit'
          type='primary'
          size='medium'
          disabled={!isValid}
        >
          Сохранить
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

export default ResetPassword;
