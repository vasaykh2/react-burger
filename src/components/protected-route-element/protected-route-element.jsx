//import { useAuth } from '../services/auth';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getUserInfo } from '../../services/actions/user';

export function ProtectedRouteElement({ onlyForAuth, element }) {
  const user = useSelector((state) => state.user);
  const userInfo = user.userInfo;
  //const location = useLocation();

  //console.log(element.type.name);

  //const [isUserLoaded, setUserLoaded] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  if (
    element.type.name === 'ResetPassword' &&
    !(user.forgotPasswordSuccess || user.forgotPasswordRequest)
  ) {
    return <Navigate to='/forgot-password' replace />;
  }

  if (!onlyForAuth && userInfo) {
    return <Navigate to='/' replace />;
  }

  if (onlyForAuth && !userInfo) {
    return <Navigate to='/login' replace />;
  }

  return element;
}

ProtectedRouteElement.propTypes = {
  onlyForAuth: PropTypes.bool,
  element: PropTypes.node,
}.isRequired;
