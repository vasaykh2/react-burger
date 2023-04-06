//import { useAuth } from '../services/auth';
import { Navigate /*RouteProps*/ } from 'react-router-dom';
import { useSelector } from '../../types/store';
import { Oval } from 'react-loader-spinner';
import { FC } from 'react';

//import { getUserInfo } from '../../services/actions/user';

import styles from './protected-route-element.module.css';

type TProtectedRouteElementProps = {
  onlyForAuth: boolean;
  children: JSX.Element;
};

const ProtectedRouteElement: FC<TProtectedRouteElementProps> = ({
  onlyForAuth,
  children,
}) => {
  const user = useSelector((state) => state.user);
  //const location = useLocation();
  //console.log(children.type.name);
  //const [isUserLoaded, setUserLoaded] = useState(false);

  //let awaitUserInfo = true;
  //const childrenName = children?.type;
  /*const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);*/

  const userInfo = user.userInfo;
  const logoutRequest = user.logoutRequest;
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
    return !user.getUserFailed && user.getUserRequest ? (
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

  if (!onlyForAuth && userInfo && !logoutRequest) {
    //console.log(localStorage.getItem('stateFrom'));
    return <Navigate to='/' replace />;
  }

  if (onlyForAuth && !userInfo) {
    return <Navigate to='/login' replace />;
  }

  return children;
};

export default ProtectedRouteElement;
