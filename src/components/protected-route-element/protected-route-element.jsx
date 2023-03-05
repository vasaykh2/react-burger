//import { useAuth } from '../services/auth';
import { Navigate,  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { getUserInfo } from '../../services/actions/user';

export default function ProtectedRouteElement({ onlyForAuth, element }) {
  const user = useSelector((state) => state.user);  
  //const location = useLocation();
  //console.log(element.type.name);
  //const [isUserLoaded, setUserLoaded] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  const userInfo = user.userInfo;

  if (
    element.type.name === 'ResetPassword' &&
    !(user.forgotPasswordSuccess || user.forgotPasswordRequest)
  ) {
    return <Navigate to='/forgot-password' replace />;
  }

  if ((element.type.name === 'Profile' || element.type.name === 'ProfileOrders') && userInfo) {
    return element;
  }

  if (!onlyForAuth && userInfo) {
    //console.log(localStorage.getItem('stateFrom'));
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
