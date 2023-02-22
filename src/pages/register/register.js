import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
//import { register } from "../../services/actions/user";
import { Link, useHistory } from 'react-router-dom';
import { useForm } from '../../services/hooks/useForm';
import styles from './register.module.css';

const Register = () => {
  const dispatch = useDispatch();

  const { values, handleChange, isValid } = useForm(
    { name: '', email: '', password: '' },
    false
  );

  const handleSubmit = (evt) => {
    evt.preventDefault();
    //dispatch(register(values));
  };

  return (
    <div className={`${styles.container}`}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={`${styles.loginTitle}  text text_type_main-medium`}>
          Регистрация
        </h1>
        <Input
          type='text'
          placeholder='Имя'
          name='name'
          onChange={(evt) => handleChange(evt)}
          value={values.name ? values.name : ''}
        />
        <EmailInput
          placeholder='E-mail'
          name='email'
          onChange={(evt) => handleChange(evt)}
          value={values.email ? values.email : ''}
        />
        <PasswordInput
          placeholder='Пароль'
          name='password'
          onChange={(evt) => {
            handleChange(evt);
          }}
          value={values.password ? values.password : ''}
        />
        <Button
          htmlType='submit'
          type='primary'
          size='medium'
          disabled={!isValid}
        >
          Зарегистрироваться
        </Button>
      </form>
      <p className='text text_type_main-default text_color_inactive mt-20'>
        Уже зарегистрированы?
        <Link className={styles.link} to='/login'>
          Войти
        </Link>
      </p>
    </div>
  );
};

export default Register;