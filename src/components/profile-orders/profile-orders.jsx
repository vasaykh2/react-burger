import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Oval } from 'react-loader-spinner';
//import { getCookie } from "../../utils/cookie";
import { refreshToken } from '../../services/actions/user';
import styles from './profile-orders.module.css';

const ProfileOrders = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const { userOrders, userConnectionError } = useSelector(
    (state) => state.wsOrders
  );

  //const token = getCookie("accessToken")?.replace("Bearer ", "");

  const orders = useMemo(
    () => userOrders && [...userOrders.orders].reverse(),
    [userOrders]
  );

  const render = () => {
    if (userInfo && userOrders) {
      if (orders) {
        return (
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
        </div>
      );
    }
  };

  return <>{render()}</>;
};

export default ProfileOrders;
