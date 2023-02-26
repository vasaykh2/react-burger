import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AppHeader from '../app-header/app-header';
import {
  BurgerMain,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  NotFound,
  Feed,
} from '../../pages';
import { Notifications } from '../notifications/notifications';
import InfoBoard from '../info-board/info-board';
import { ProtectedRouteElement } from '../protected-route-element/protected-route-element';
import { getIngredientsList } from '../../services/actions/ingredients';
import { getUserInfo } from '../../services/actions/user';

import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(getIngredientsList());
    dispatch(getUserInfo());
  }, [dispatch]);

  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const { errorMessage } = useSelector((state) => state.user);

  const idIngredientDetails = location.state?.idIngredientDetails;

  //console.log(location.pathname);

  const idPadge = `${location.pathname}`.split('/')[2];

  //console.log([!!background, idIngredientDetails,]);

  function closeModal() {
    navigate(-1);
  }

  return (
    <>
      <Notifications>
        {!ingredients && 'Загрузка...'}
        {errorMessage && 'Произошла ошибка'}
      </Notifications>
      {errorMessage && <InfoBoard />}
      {ingredients && !errorMessage && (
        <>
          <AppHeader />
          <Routes location={background || location}>
            <Route path='/' element={<BurgerMain />} />
            <Route path='/feed' element={<Feed />} />
            <Route
              path='/ingredients/:id'
              element={
                !background && ingredients.length ? (
                  <IngredientDetails ingredients={ingredients} id={idPadge} />
                ) : null
              }
            />
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
                <ProtectedRouteElement
                  onlyForAuth={true}
                  element={<Profile />}
                />
              }
            />
            <Route
              path='/profile/orders'
              element={
                <ProtectedRouteElement
                  onlyForAuth={true}
                  element={<Profile />}
                />
              }
            />
            <Route path='*' element={<NotFound />} />
          </Routes>
          {background && (
            <Modal closeModal={closeModal}>
              {ingredients.length ? (
                <IngredientDetails
                  ingredients={ingredients}
                  id={idIngredientDetails}
                />
              ) : null}
            </Modal>
          )}
        </>
      )}
    </>
  );
}

export default App;
