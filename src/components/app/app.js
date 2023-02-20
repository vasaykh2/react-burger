import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AppHeader from '../app-header/app-header.js';
import BurgerMain from '../../pages/main/main';
import { Notifications } from '../notifications/notifications';
import { getIngredientsList } from '../../services/actions/ingredients';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsList());
  }, []);

  const { ingredientsLoad, ingredientsFailed, ingredients } = useSelector(
    (state) => state.ingredientsReducer
  );

  return (
    <>
      <Notifications>
        {ingredientsLoad && 'Загрузка...'}
        {ingredientsFailed && 'Произошла ошибка'}
      </Notifications>
      {!ingredientsLoad && !ingredientsFailed && (
        <>
          <AppHeader />
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<BurgerMain />} />
            </Routes>
          </BrowserRouter>
        </>
      )}
    </>
  );
}
