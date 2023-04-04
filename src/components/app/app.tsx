import { useEffect, FC } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from '../../types/store';

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
} from '..';

import { getIngredientsList } from '../../services/actions/ingredients';
import { getUserInfo } from '../../services/actions/user';

const App: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background;
  //console.log(location.state?.background?.state?.from?.pathname);
  //console.log(location);
  //console.log(background);

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
                <ProtectedRouteElement onlyForAuth={false}>
                  <Login />
                </ProtectedRouteElement>
              }
            />
            <Route
              path='/register'
              element={
                <ProtectedRouteElement onlyForAuth={false}>
                  <Register />
                </ProtectedRouteElement>
              }
            />
            <Route
              path='/forgot-password'
              element={
                <ProtectedRouteElement onlyForAuth={false}>
                  <ForgotPassword />
                </ProtectedRouteElement>
              }
            />
            <Route
              path='/reset-password'
              element={
                <ProtectedRouteElement onlyForAuth={false}>
                  <ResetPassword />
                </ProtectedRouteElement>
              }
            />

            <Route
              path='/profile'
              element={
                <ProtectedRouteElement onlyForAuth={true}>
                  <Profile />
                </ProtectedRouteElement>
              }
            >
              <Route
                path=''
                element={
                  <ProtectedRouteElement onlyForAuth={true}>
                    <ProfileForm />
                  </ProtectedRouteElement>
                }
              />
              <Route
                path='orders'
                element={
                  <ProtectedRouteElement onlyForAuth={true}>
                    <ProfileOrders />
                  </ProtectedRouteElement>
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
