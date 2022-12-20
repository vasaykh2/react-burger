import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import appHeaderStyles from './app-header-styles.module.css';

export default function AppHeader() {
  return (
    <header className={appHeaderStyles.header + ' ' + appHeaderStyles.blocks}>
      <div className={'mr-2 ' + appHeaderStyles.blocks}>
        <div className='mt-4 mb-4 ml-5'>
          <BurgerIcon type='primary' />
        </div>
        <p className='text text_type_main-default mt-4 mr-5 mb-4 ml-2'>
          Конструктор
        </p>
      </div>
      <div className={appHeaderStyles.blocks}>
        <div className='mt-4 mb-4 ml-5'>
          <ListIcon type='secondary' />
        </div>
        <p className='text text_type_main-default mt-4 mr-5 mb-4 ml-2 text_color_inactive'>
          Лента заказов
        </p>
      </div>
      <div className={appHeaderStyles.logo}>
        <Logo />
      </div>
      <div className={appHeaderStyles.blocks}>
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

