import { Routes, Route } from 'react-router-dom';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile.module.css';
//import ProfileForm from '../../components/ProfileForm/ProfileForm';
//import ProfileOrders from '../../components/ProfileOrders/ProfileOrders';

const Profile = () => {
  const dispatch = useDispatch();

  //const { pathname } = useLocation();
  const pathname = '/';

  
  const handleLogout = () => {
    //dispatch(logOut());
  };

  return (
    <main className={styles.profile}>
      <ul className={styles.nav}>
        <li>
          <NavLink
            to='/profile'
            className={`${styles.link} text text_type_main-medium`}
            activeClassName={`${styles.link_active} text text_type_main-medium`}
          >
            Профиль
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/profile/orders'
            className={`${styles.link} text text_type_main-medium`}
            activeClassName={`${styles.link_active} text text_type_main-medium`}
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
      
      
    </main>
  );
};

export default Profile;
