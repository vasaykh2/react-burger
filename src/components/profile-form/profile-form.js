import { useSelector, useDispatch } from 'react-redux';
import { useMemo } from 'react';
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { patchUserInfo } from '../../services/actions/user';
import { useForm } from '../../services/hooks/useForm';
import styles from './profile-form.module.css';

const ProfileForm = () => {
  const dispatch = useDispatch();
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

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(patchUserInfo(values));
    setValues({ ...values, password: '' });
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
        onChange={(evt) => handleChange(evt)}
        value={values.name || ''}
        icon={'EditIcon'}
      />
      <EmailInput
        placeholder='E-mail'
        name='email'
        onChange={(evt) => handleChange(evt)}
        value={values.email || ''}
        isIcon={true}
      />
      <PasswordInput
        placeholder='Пароль'
        name='password'
        onChange={(evt) => {
          handleChange(evt);
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
