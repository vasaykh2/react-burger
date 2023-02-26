import { useMemo, useCallback } from 'react';
import styles from './orders-summary.module.css';

const OrdersSummary = ({ orders }) => {
  const { total, totalToday } = orders;

  const doneOrders = useMemo(
    () => orders.orders.filter((order) => order.status === 'done'),
    [orders]
  );
  const pendingOrders = useMemo(
    () => orders.orders.filter((order) => order.status === 'pending'),
    [orders]
  );

  const renderNumber = useCallback((number) => number.padStart(6, '0'), []);

  return (
    <section className={styles.ordersSummary}>
      <div className={styles.ordersSummary_statuses}>
        {doneOrders.length && (
          <div>
            <h2 className='text text_type_main-medium mb-6'>Готовы:</h2>
            <div className={styles.ordersSummary_numbers}>
              <ul className={styles.ordersSummary_list}>
                {doneOrders.map(
                  (order, index) =>
                    index < 10 && (
                      <li
                        className={`${styles.ordersSummary_done} text text_type_digits-default`}
                        key={order.number}
                      >
                        {renderNumber(order.number)}
                      </li>
                    )
                )}
              </ul>
              <ul className={styles.ordersSummary_list}>
                {doneOrders.map(
                  (order, index) =>
                    index >= 10 &&
                    index < 20 && (
                      <li
                        className={`${styles.ordersSummary_done} text text_type_digits-default`}
                        key={order.number}
                      >
                        {renderNumber(order.number)}
                      </li>
                    )
                )}
              </ul>
            </div>
          </div>
        )}
        {!!pendingOrders.length && (
          <div>
            <h2 className='text text_type_main-medium mb-6'>В работе:</h2>
            <div className={styles.ordersSummary_numbers}>
              <ul className={styles.ordersSummary_list}>
                {pendingOrders.map(
                  (order, index) =>
                    index < 10 && (
                      <li className='text text_type_digits-default' key={index}>
                        {renderNumber(order.number)}
                      </li>
                    )
                )}
              </ul>
              <ul className={styles.ordersSummary_list}>
                {pendingOrders.map(
                  (order, index) =>
                    index >= 10 &&
                    index < 20 && (
                      <li className='text text_type_digits-default' key={index}>
                        {renderNumber(order.number)}
                      </li>
                    )
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
      <div>
        <p className='text text_type_main-medium'>Выполнено за все время:</p>
        <span
          className={`${styles.ordersSummary_digits} text text_type_digits-large`}
        >
          {total}
        </span>
      </div>
      <div>
        <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
        <span
          className={`${styles.ordersSummary_digits} text text_type_digits-large`}
        >
          {totalToday}
        </span>
      </div>
    </section>
  );
};

export default OrdersSummary;
