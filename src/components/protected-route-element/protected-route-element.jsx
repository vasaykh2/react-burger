//import { useAuth } from '../services/auth';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Oval } from 'react-loader-spinner';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { getUserInfo } from '../../services/actions/user';

import styles from './protected-route-element.module.css';

export default function ProtectedRouteElement({ onlyForAuth, children }) {
  const user = useSelector((state) => state.user);
  //const location = useLocation();
  //console.log(children.type.name);
  //const [isUserLoaded, setUserLoaded] = useState(false);

  //let awaitUserInfo = true;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  const userInfo = user.userInfo;
  //console.log(localStorage.getItem('stateFrom'));
  //console.log(location.state);

  if (
    children.type.name === 'ResetPassword' &&
    !(user.forgotPasswordSuccess || user.forgotPasswordRequest)
  ) {
    return <Navigate to='/forgot-password' replace />;
  }

  if (
    (children.type.name === 'Profile' ||
      children.type.name === 'ProfileOrders') &&
    !userInfo
  ) {
    //awaitUserInfo = setTimeout(() => false, 8000);
    //console.log(user.getUserRequest);
    //console.log(awaitUserInfo);
    return !user.getUserFailed ? (
      <div className={styles.loader}>
        <Oval
          ariaLabel='loading-indicator'
          height={70}
          width={70}
          strokeWidth={5}
          strokeWidthSecondary={2}
          color='blue'
          secondaryColor='white'
        />
        <span>Собираем сведения</span>
      </div>
    ) : (
      <Navigate to='/login' replace />
    );
  }

  if (
    (children.type.name === 'Profile' ||
      children.type.name === 'ProfileOrders') &&
    userInfo
  ) {
    return children;
  }

  if (!onlyForAuth && userInfo) {
    //console.log(localStorage.getItem('stateFrom'));
    return <Navigate to='/' replace />;
  }

  if (onlyForAuth && !userInfo) {
    return <Navigate to='/login' replace />;
  }

  return children;
}

ProtectedRouteElement.propTypes = {
  onlyForAuth: PropTypes.bool,
  children: PropTypes.node,
}.isRequired;
