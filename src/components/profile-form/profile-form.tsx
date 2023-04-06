import { useSelector, useDispatch } from '../../types/store';
import { useMemo, FC, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { patchUserInfo } from '../../services/actions/user';
import { useForm } from '../../services/hooks/useForm';
import styles from './profile-form.module.css';

const ProfileForm: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);
  const { name, email } = userInfo || { name: '', email: '' };

  const { values, handleChange, isValid, resetForm, setValues } = useForm(
    {
      name: name,
      email: email,
      password: '',
    },
    true
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(patchUserInfo(values));
    setValues({ ...values, password: '' });
    navigate('/profile', { state: { from: { pathname: '/profile' } } });
  };

  const isValidChanges = useMemo(
    () =>
      userInfo &&
      isValid &&
      (userInfo.email !== values.email ||
        userInfo.name !== values.name ||
        (values.password && values.password.length)),
    [userInfo, values, isValid]
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        type='text'
        placeholder='Имя'
        name='name'
        onChange={(e) => handleChange(e)}
        value={values.name || ''}
        icon={'EditIcon'}
      />
      <EmailInput
        placeholder='E-mail'
        name='email'
        onChange={(e) => handleChange(e)}
        value={values.email || ''}
        isIcon={true}
      />
      <PasswordInput
        placeholder='Пароль'
        name='password'
        onChange={(e) => {
          handleChange(e);
        }}
        value={values.password || ''}
        icon={'EditIcon'}
      />
      {isValidChanges ? (
        <div className={styles.containerOfButtons}>
          <Button
            htmlType='button'
            type='secondary'
            size='medium'
            onClick={resetForm}
            extraClass={styles.cancelButton}
          >
            Отмена
          </Button>
          <Button htmlType='submit' type='primary' size='medium'>
            Сохранить
          </Button>
        </div>
      ) : null}
    </form>
  );
};

export default ProfileForm;
