import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  startUserWsConnection,
  closeUserWsConnection,
} from '../../services/actions/ws-user-orders';

import { Oval } from 'react-loader-spinner';
import OrdersBriefList from '../orders-brief-list/orders-brief-list';

import { getCookie } from '../../utils/cookie';
import { refreshToken } from '../../services/actions/user';
import styles from './profile-orders.module.css';

const ProfileOrders = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const { userOrders, userConnectionError } = useSelector(
    (state) => state.wsUser
  );

  const token = getCookie('accessToken')?.replace('Bearer ', '');

  useEffect(() => {
    userInfo && token && dispatch(startUserWsConnection(token));
    return () => {
      dispatch(closeUserWsConnection());
    };
  }, [userInfo, token, dispatch]);

  const orders = userOrders && userOrders.orders;

  const render = () => {
    if (userInfo && userOrders) {
      if (orders) {
        return userOrders.orders.length ? (
          <OrdersBriefList orders={orders} />
        ) : (
          <p className={`${styles.noOrders} text text_type_main-large`}>
            К сожалению, мы не смогли найти ваши заказы
          </p>
        );
      }
      if (
        userOrders.message &&
        userOrders.message === 'Invalid or missing token'
      ) {
        dispatch(refreshToken());
      }
    } else if (userConnectionError) {
      return (
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
          <span>Обновите страницу</span>
        </div>
      );
    } else {
      return (
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
      );
    }
  };

  return <>{render()}</>;
};

export default ProfileOrders;
