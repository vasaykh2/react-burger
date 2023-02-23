import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AppHeader from '../app-header/app-header.js';
import {
  BurgerMain,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
} from '../../pages';
import { Notifications } from '../notifications/notifications';
import { ProtectedRouteElement } from '../protected-route-element/protected-route-element';
import { getIngredientsList } from '../../services/actions/ingredients';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsList());
  }, []);

  const { ingredientsLoad, ingredientsFailed, ingredients } = useSelector(
    (state) => state.ingredients
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
          <Routes>
            <Route path='/' element={<BurgerMain />} />
            <Route path='/login' element={<ProtectedRouteElement onlyForAuth={false} element={<Login />}/>} />
            <Route path='/register' element={<ProtectedRouteElement onlyForAuth={false} element={<Register />}/>} />
            <Route path='/forgot-password' element={<ProtectedRouteElement onlyForAuth={false} element={<ForgotPassword />}/>} />
            <Route path='/reset-password' element={<ProtectedRouteElement onlyForAuth={false} element={<ResetPassword />}/>} />
            <Route path='/profile' element={<ProtectedRouteElement onlyForAuth element={<Profile />}/>} />
            <Route path='/profile/orders' element={<ProtectedRouteElement onlyForAuth element={<Profile />}/>} />
          </Routes>
        </>
      )}
    </>
  );
}
