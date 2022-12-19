import React, { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header.js';
import BurgerMain from '../burger-main/burger-main.js';
import { Notifications } from '../notifications/notifications';
import appStyles from './app-styles.module.css';

const urlDomen = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setState({ ...state, hasError: false, isLoading: true });
    fetch(urlDomen)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((res) => {
        //console.log(res.data);
        const data = res.data;
        setState({ ...state, data, isLoading: false });
      })
      .catch((e) => {
        setState({ ...state, hasError: true, isLoading: false });
      });
  };

  return (
    <>
      <Notifications>
        {state.isLoading && 'Загрузка...'}
        {state.hasError && 'Произошла ошибка'}
      </Notifications>
      {!state.isLoading && !state.hasError && state.data.length && (
        <>
          <AppHeader />
          <BurgerMain data={state.data} />
        </>
      )}
    </>
  );
}

export default App;
