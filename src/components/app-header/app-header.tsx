import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { NavLink, useLocation } from 'react-router-dom';
import { FC } from 'react';

import styles from './app-header-styles.module.css';

const AppHeader: FC = () => {
  const { pathname } = useLocation();

  return (
    <header className={`${styles.header} pt-4 pb-4 pr-4 pl-4`}>
      <div className={`${styles.container}`}>
        <ul className={styles.nav}>
          <li className='mr-5 pr-4'>
            <NavLink
              to='/'
              state={{ from: { pathname: '/' } }}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.link_active}` : styles.link
              }
            >
              <BurgerIcon type={pathname === '/' ? 'primary' : 'secondary'} />
              <p className='text text_type_main-default ml-2'>Конструктор</p>
            </NavLink>
          </li>
          <li className='pl-4 pr-4'>
            <NavLink
              to='/feed'
              state={{ from: { pathname: '/feed' } }}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.link_active}` : styles.link
              }
            >
              <ListIcon type={pathname === '/feed' ? 'primary' : 'secondary'} />
              <p className='text text_type_main-default ml-2'>Лента заказов</p>
            </NavLink>
          </li>
        </ul>
        <NavLink to='/'>
          <Logo />
        </NavLink>
        <NavLink
          to={'/profile'}
          state={{ from: { pathname: '/profile' } }}
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.link_active}` : styles.link
          }
        >
          <ProfileIcon
            type={pathname.startsWith('/profile') ? 'primary' : 'secondary'}
          />
          <p className='text text_type_main-default ml-2'>Личный кабинет</p>
        </NavLink>
      </div>
    </header>
  );
}

export default AppHeader;
