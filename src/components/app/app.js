import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AppHeader from '../app-header/app-header.js';
import { BurgerMain, Login, Register, ForgotPassword, ResetPassword, Profile } from '../../pages';
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
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/reset-password' element={<ResetPassword />} />
              <Route path='/profile' element={<Profile />} />
            </Routes>
          </BrowserRouter>
        </>
      )}
    </>
  );
}
