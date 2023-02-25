import { useSelector } from 'react-redux';

import { Oval } from 'react-loader-spinner';

import styles from './profile-orders.module.css';

const ProfileOrders = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  const render = () => {
    if (userInfo) {
      if (true) {
        return (
          <>
            <p className={`${styles.noOrders} text text_type_main-large`}>
              К сожалению, мы не смогли найти ваши заказы
            </p>
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
          </>
        );
      }
    }
  };

  return <>{render()}</>;
};

export default ProfileOrders;
