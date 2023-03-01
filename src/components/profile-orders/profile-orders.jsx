import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  startUserWsConnection,
  closeUserWsConnection,
} from '../../services/actions/ws-orders';

import { Oval } from 'react-loader-spinner';
import OrdersBriefList from '../orders-brief-list/orders-brief-list';

import { getCookie } from '../../utils/cookie';
import { refreshToken } from '../../services/actions/user';
import styles from './profile-orders.module.css';
import { Ingredient } from '../ingredient/ingredient';

const ProfileOrders = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const { userOrders, userConnectionError } = useSelector(
    (state) => state.wsOrders
  );

  /* const userOrders = {
    orders: [
      {
        _id: '63f8b302936b17001be610ed',
        ingredients: [
          '60d3b41abdacab0026a733cd',
          '60d3b41abdacab0026a733cd',
          '60d3b41abdacab0026a733c6',
          '60d3b41abdacab0026a733c6',
          '60d3b41abdacab0026a733c6',
          '60d3b41abdacab0026a733c6',
          '60d3b41abdacab0026a733c6',
          '60d3b41abdacab0026a733c6',
          '60d3b41abdacab0026a733c6',
          '60d3b41abdacab0026a733c6',
          '60d3b41abdacab0026a733c6',
          '60d3b41abdacab0026a733c6',
          '60d3b41abdacab0026a733c6',
        ],
        status: 'done',
        name: 'Space краторный бургер',
        createdAt: '2023-02-24T12:52:19.000Z',
        updatedAt: '2023-02-24T12:52:19.387Z',
        number: '41607',
      },
    ],
    total: '41703',
    totalToday: '54',
  };
  const userConnectionError = null;*/

  const token = getCookie('accessToken')?.replace('Bearer ', '');

  useEffect(() => {
    userInfo && token && dispatch(startUserWsConnection(token));
    return () => {
      dispatch(closeUserWsConnection());
    };
  }, [userInfo, token, dispatch]);

  const orders = useMemo(
    () => userOrders && [...userOrders.orders].reverse(),
    [userOrders]
  );

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
          <span>Идёт учёт</span>
        </div>
      );
    }
  };

  return <>{render()}</>;
};

export default ProfileOrders;
