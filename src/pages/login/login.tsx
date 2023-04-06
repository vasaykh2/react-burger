import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../types/store';
import { FC, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import { useForm } from '../../services/hooks/useForm';
import { logIn } from '../../services/actions/user';

import styles from './login.module.css';

const Login: FC = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const { values, handleChange, isValid } = useForm(
    { email: '', password: '' },
    false
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(logIn(values));
  };

  return (
    <div className={`${styles.container}`}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={`${styles.title}  text text_type_main-medium`}>Вход</h1>
        <EmailInput
          placeholder='E-mail'
          name='email'
          onChange={(evt) => handleChange(evt)}
          value={values.email ? values.email : ''}
        />
        <PasswordInput
          placeholder='Пароль'
          name='password'
          onChange={(evt) => handleChange(evt)}
          value={values.password ? values.password : ''}
        />
        <Button
          htmlType='submit'
          type='primary'
          size='medium'
          disabled={!isValid && !!userInfo}
        >
          Войти
        </Button>
      </form>
      <p className='text text_type_main-default text_color_inactive mt-20'>
        Вы — новый пользователь?
        <Link className={styles.link} to='/register'>
          Зарегистрироваться
        </Link>
      </p>
      <p className='text text_type_main-default text_color_inactive mt-4'>
        Забыли пароль?
        <Link className={styles.link} to='/forgot-password'>
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
};

export default Login;
