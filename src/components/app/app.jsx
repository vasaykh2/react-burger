import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

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

import {
  AppHeader,
  InfoBoard,
  IngredientDetails,
  Modal,
  Notifications,
  ProtectedRouteElement,
  OderDetailsFromList,
  ProfileForm,
  ProfileOrders,
} from '../../components';

import { getIngredientsList } from '../../services/actions/ingredients';
import { getUserInfo } from '../../services/actions/user';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background;
  //console.log(location.state?.background?.state?.from?.pathname);
  //console.log(location);

  useEffect(() => {
    dispatch(getIngredientsList());
    dispatch(getUserInfo());
  }, [dispatch]);

  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const { errorMessage } = useSelector((state) => state.user);

  const idIngredientDetails = location.state?.idIngredientDetails;

  //console.log(location.pathname);

  const idPadge = `${location.pathname}`.split('/')[
    `${location.pathname}`.split('/').length - 1
  ];

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
              path='/feed/:number'
              element={!background ? <OderDetailsFromList /> : null}
            />
            <Route
              path='/profile/orders/:number'
              element={!background ? <OderDetailsFromList /> : null}
            />
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
            >
              <Route
                path=''
                element={
                  <ProtectedRouteElement
                    onlyForAuth={true}
                    element={<ProfileForm />}
                  />
                }
              />
              <Route
                path='orders'
                element={
                  <ProtectedRouteElement
                    onlyForAuth={true}
                    element={<ProfileOrders />}
                  />
                }
              />
            </Route>

            {!background && <Route path='*' element={<NotFound />} />}
          </Routes>

          {background && ingredients.length && idIngredientDetails ? (
            <Modal closeModal={closeModal}>
              <IngredientDetails
                ingredients={ingredients}
                id={idIngredientDetails}
              />
            </Modal>
          ) : null}

          {background &&
          location.state?.background?.state?.from?.pathname === '/feed' ? (
            <Modal closeModal={closeModal}>
              <OderDetailsFromList />
            </Modal>
          ) : null}

          {background &&
          location.state?.background?.state?.from?.pathname ===
            '/profile/orders' ? (
            <Modal closeModal={closeModal}>
              <OderDetailsFromList />
            </Modal>
          ) : null}
        </>
      )}
    </>
  );
}

export default App;
