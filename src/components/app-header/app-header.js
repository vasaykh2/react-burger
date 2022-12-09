import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Box } from '@ya.praktikum/react-developer-burger-ui-components';

import appHeaderStyles from './app-header-styles.module.css';

class AppHeader extends React.Component {
  render() {
    return (
      <header className={appHeaderStyles.header}>
        <BurgerIcon type="primary" />
        <p className="text text_type_main-default">Конструктор</p>
        <Logo />
        <ListIcon type="primary" />
        <ProfileIcon type="primary" />
      </header>
    );
  }
}

export default AppHeader;
