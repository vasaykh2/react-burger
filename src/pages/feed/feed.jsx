import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useMemo } from 'react';
import OrdersBriefList from '../../components/orders-brief-list/orders-brief-list';
import OrdersSummary from '../../components/orders-summary/orders-summary';
import { Oval } from 'react-loader-spinner';
import {
  startPublicWsConnection,
  closePublicWsConnection,
} from '../../services/actions/ws-orders';
import styles from './feed.module.css';

const Feed = () => {
  const dispatch = useDispatch();

  const wsOrdersInitialState = {
    isUserConnection: false,
    isPublicConnection: false,
    userConnectionError: null,
    publicConnectionError: null,
    userOrders: null,
    publicOrders: {
      orders: [
        {
          _id: '63fb4cbe936b17001be61998',
          ingredients: [
            '60d3b41abdacab0026a733c7',
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733d3',
            '60d3b41abdacab0026a733d4',
            '60d3b41abdacab0026a733c7',
          ],
          status: 'done',
          name: 'Астероидный space экзо-плантаго флюоресцентный бургер',
          createdAt: '2023-02-26T12:12:46.931Z',
          updatedAt: '2023-02-26T12:12:47.377Z',
          number: 41793,
        },
      ],
      total: 41700,
      totalToday: 70,
    },
  };

  /*const { publicOrders, publicConnectionError } = useSelector(
    (state) => state.wsOrders
  );*/
  const publicOrders = {
    orders: [
      {
        _id: '63fb4cbe936b17001be61998',
        ingredients: [
          '60d3b41abdacab0026a733c7',
          '60d3b41abdacab0026a733cd',
          '60d3b41abdacab0026a733d3',
          '60d3b41abdacab0026a733d4',
          '60d3b41abdacab0026a733c7',
        ],
        status: 'done',
        name: 'Астероидный space экзо-плантаго флюоресцентный бургер',
        createdAt: '2023-02-26T12:12:46.931Z',
        updatedAt: '2023-02-26T12:12:47.377Z',
        number: '41793',
      },
    ],
    total: '41700',
    totalToday: '70',
  };
  const publicConnectionError = null;

  const ordersList = useMemo(() => publicOrders?.orders, [publicOrders]);

  /*useEffect(() => {
    dispatch(startPublicWsConnection());

    return () => {
      dispatch(closePublicWsConnection());
    };
  }, [dispatch]);*/

  const render = () => {
    if (publicOrders) {
      return (
        <main className={styles.feed}>
          <section>
            <h1 className='text text_type_main-large mt-10 mb-5'>
              Лента заказов
            </h1>
            {ordersList && <OrdersBriefList orders={ordersList} />}
          </section>
          <OrdersSummary orders={publicOrders} />
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
          <span>Идёт учёт</span>
        </div>
      );
    }
  };

  return <>{render()}</>;
};

export default Feed;
