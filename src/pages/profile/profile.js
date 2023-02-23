import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { logOut } from '../../services/actions/user';
import styles from './profile.module.css';
import ProfileForm from '../../components/profile-form/profile-form';
import ProfileOrders from '../../components/profile-orders/profile-orders';

const Profile = () => {
  const dispatch = useDispatch();
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);
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
          <NavLink
            to='/profile'
            className={({ isActive }) =>
              isActive
                ? `text text_type_main-medium ${styles.link_active}`
                : `${styles.link} text text_type_main-medium`
            }
          >
            Профиль
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/profile/orders'
            className={({ isActive }) =>
              isActive
                ? `text text_type_main-medium ${styles.link_active}`
                : `${styles.link} text text_type_main-medium`
            }
          >
            История заказов
          </NavLink>
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
        className={`${styles.profile__caption} text text_type_main-default text_color_inactive`}
      >
        {profileCaption()}
      </p>     
      {pathname === '/profile' ? <ProfileForm /> : pathname == '/profile/orders' ? <ProfileOrders /> : null}      
    </main>
  );
};

export default Profile;
