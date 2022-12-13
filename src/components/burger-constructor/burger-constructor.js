import React from 'react';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerConstructorStyles from './burger-constructor-styles.module.css';

function BurgerConstructor() {
  return (
    <>
      <div className={burgerConstructorStyles.blocks}>
        <ConstructorElement
          text="string"
          thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
          price="20"
          type="top"
          isLocked="undefined"
          extraClass="undefined"
          handleClose="(() => void)"
        />
        <ConstructorElement
          text="string"
          thumbnail="string"
          price="number"
          type="undefined"
          isLocked=""
          extraClass="undefined"
          handleClose="(undefined)"
        />
        <ConstructorElement
          text="string"
          thumbnail="string"
          price="number"
          type="undefined"
          isLocked=""
          extraClass="undefined"
          handleClose="undefined"
        />
        <ConstructorElement
          text="string"
          thumbnail="string"
          price="number"
          type="undefined"
          isLocked=""
          extraClass="undefined"
          handleClose="undefined"
        />
        <ConstructorElement
          text="string"
          thumbnail="string"
          price="number"
          type="bottom"
          isLocked="undefined"
          extraClass="undefined"
          handleClose="(() => void)"
        />
      </div>
    </>
  );
}

export default BurgerConstructor;
