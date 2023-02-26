import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { logOut } from '../../services/actions/user';
import styles from './profile.module.css';
import { ProfileForm, ProfileOrders } from '../../components';

const Profile = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { pathname } = location;

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
    localStorage.setItem('stateFrom', '');
  };

  useEffect(() => {
    if (location.state && location.state.from) {
      localStorage.setItem('stateFrom', location.state.from.pathname);
    }
    //console.log(location);
  }, [location]);

  return (
    <main className={styles.profile}>
      <ul className={styles.nav}>
        <li>
          <p className={styles.link}>
            <NavLink
              to='/profile'
              className={({ isActive }) =>
                'text text_type_main-medium' +
                (isActive && pathname === '/profile'
                  ? ` ${styles.link_active}`
                  : ` ${styles.link}`)
              }
              state={{ from: { pathname: '/profile' } }}
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
              state={{ from: { pathname: '/profile' } }}
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
