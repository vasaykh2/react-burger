import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { NavLink, useLocation } from 'react-router-dom';

import styles from './app-header-styles.module.css';

export default function AppHeader() {
  //const { pathname } = useLocation();
  const pathname = '/';

  return (
    <header className={styles.header + ' ' + styles.blocks}>
      <div className={'mr-2 ' + styles.blocks}>
        <div className='mt-4 mb-4 ml-5'>
          <BurgerIcon type='primary' />
        </div>
        <p className='text text_type_main-default mt-4 mr-5 mb-4 ml-2'>
          Конструктор
        </p>
      </div>
      <div className={styles.blocks}>
        <div className='mt-4 mb-4 ml-5'>
          <ListIcon type='secondary' />
        </div>
        <p className='text text_type_main-default mt-4 mr-5 mb-4 ml-2 text_color_inactive'>
          Лента заказов
        </p>
      </div>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.blocks}>
        <div className='mt-4 mb-4 ml-5'>
          <ProfileIcon type='secondary' />
        </div>
        <p className='text text_type_main-default mt-4 mr-5 mb-4 ml-2 text_color_inactive'>
          Личный кабинет
        </p>
      </div>
    </header>
  );
}
