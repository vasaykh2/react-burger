import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { logOut } from '../../services/actions/user';
import styles from './profile.module.css';
import ProfileForm from '../../components/profile-form/profile-form';
import ProfileOrders from '../../components/profile-orders/profile-orders';

const Profile = () => {
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const profileCaption = () => {
    switch (pathname) {
      case '/profile':
        return 'В этом разделе вы можете изменить свои персональные данные';
      case '/profile/orders':
        return 'В этом разделе вы можете просмотреть свою историю заказов';
      default:
        return '';
    }
  };

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <main className={styles.profile}>
      <ul className={styles.nav}>
        <li>
          <p className={styles.link}>
          <NavLink
            exact
            to='/profile'
            /*isActive={(match, location) => {
              if (match) {
                return true;
              } else {
                return false;
              }
            }}*/
            className={({ isActive }) =>
              'text text_type_main-medium' +
              (isActive && pathname === '/profile'
                ? ` ${styles.link_active}`
                : ` ${styles.link}`)
            }
          >
            Профиль
          </NavLink>
          </p>
        </li>
        <li>
        <p className={styles.link}>
          <NavLink
            to='/profile/orders'
            className={({ isActive }) =>
              'text text_type_main-medium' +
              (isActive ? ` ${styles.link_active}` : ` ${styles.link}`)
            }
          >
            История заказов
          </NavLink>
          </p>
        </li>
        <li>
          <Button
            htmlType='button'
            type='secondary'
            onClick={handleLogout}
            extraClass={`${styles.link} text text_type_main-medium`}
          >
            Выход
          </Button>
        </li>
      </ul>
      <p
        className={`${styles.caption} text text_type_main-default text_color_inactive`}
      >
        {profileCaption()}
      </p>
      {pathname === '/profile' ? (
        <ProfileForm />
      ) : pathname === '/profile/orders' ? (
        <ProfileOrders />
      ) : null}
    </main>
  );
};

export default Profile;
