import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useForm } from '../../services/hooks/useForm';
import { logIn } from '../../services/actions/user';

import styles from './login.module.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  //console.log(location.state);
  const { userInfo, isAuthChecked } = useSelector((state) => state.user);
  const { values, handleChange, isValid } = useForm(
    { email: '', password: '' },
    false
  );

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(logIn(values));
    //console.log(document.cookie);
  };

  useEffect(() => {
    if (userInfo) {
      location.state && location.state.from
        ? navigate(location.state.from.pathname)
        : navigate('/');
    }
  }, [userInfo, navigate, location]);

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
          disabled={!isValid}
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
