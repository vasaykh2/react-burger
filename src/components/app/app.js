import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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
import { getUserInfo } from '../../services/actions/user';

import IngredientDetails from "../ingredient-details/ingredient-details";

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background;
  console.log(location);

  useEffect(() => {
    dispatch(getIngredientsList());
    dispatch(getUserInfo());
  }, [dispatch]);

  const { ingredientsLoad, ingredientsFailed, ingredients } = useSelector(
    (state) => state.ingredients
  );

  const closeModal = () => {
    navigate(-1);
  };

  return (
    <>
      <Notifications>
        {ingredientsLoad && 'Загрузка...'}
        {ingredientsFailed && 'Произошла ошибка'}
      </Notifications>
      {!ingredientsLoad && !ingredientsFailed && (
        <>
          <AppHeader />
          <Routes location={background || location}>
            <Route path='/' element={<BurgerMain />} />
            <Route path='/ingredients/:id' element={ingredients.length && (
                <IngredientDetails ingredients={ingredients} />
              )} />
              
            
            <Route
              path='/login'
              element={
                <ProtectedRouteElement
                  onlyForAuth={false}
                  element={<Login />}
                />
              }
            />
            <Route
              path='/register'
              element={
                <ProtectedRouteElement
                  onlyForAuth={false}
                  element={<Register />}
                />
              }
            />
            <Route
              path='/forgot-password'
              element={
                <ProtectedRouteElement
                  onlyForAuth={false}
                  element={<ForgotPassword />}
                />
              }
            />
            <Route
              path='/reset-password'
              element={
                <ProtectedRouteElement
                  onlyForAuth={false}
                  element={<ResetPassword />}
                />
              }
            />
            <Route
              path='/profile'
              element={
                <ProtectedRouteElement onlyForAuth element={<Profile />} />
              }
            />
            <Route
              path='/profile/orders'
              element={
                <ProtectedRouteElement onlyForAuth element={<Profile />} />
              }
            />
          </Routes>
        </>
      )}
    </>
  );
}
