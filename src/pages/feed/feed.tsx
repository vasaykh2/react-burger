import { useSelector, useDispatch } from '../../types/store';
import { useEffect, FC } from 'react';
import OrdersBriefList from '../../components/orders-brief-list/orders-brief-list';
import OrdersSummary from '../../components/orders-summary/orders-summary';
import { Oval } from 'react-loader-spinner';
import {
  startPublicWsConnection,
  closePublicWsConnection,
} from '../../services/actions/ws-public-orders';
import styles from './feed.module.css';

const Feed: FC = () => {
  const dispatch = useDispatch();

  const { publicOrders, publicConnectionError } = useSelector(
    (state) => state.wsPublic
  );

  const ordersList = publicOrders?.orders;

  useEffect(() => {
    dispatch(startPublicWsConnection());

    return () => {
      dispatch(closePublicWsConnection());
    };
  }, [dispatch]);

  const render = () => {
    if (publicOrders) {
      return (
        <main className={styles.main}>
          <div className={styles.feed}>
            <section>
              <h1 className='text text_type_main-large mt-10 mb-5'>
                Лента заказов
              </h1>
              {ordersList && <OrdersBriefList orders={ordersList} />}
            </section>
            <OrdersSummary orders={publicOrders} />
          </div>
        </main>
      );
    } else if (publicConnectionError) {
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

export default Feed;
