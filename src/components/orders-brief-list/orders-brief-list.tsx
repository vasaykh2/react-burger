import OrderBrief from '../order-brief/order-brief';
import { useResolvedPath } from 'react-router-dom';
import { useMemo, FC } from 'react';
import styles from './orders-brief-list.module.css';
import { TOrderInfo } from '../../types/order';

type TOrderBriefListProps = {
  orders: Array<TOrderInfo>;
};

const OrdersBriefList: FC<TOrderBriefListProps> = ({ orders }) => {
  //const { path1 } = useRouteMatch();
  const path = useResolvedPath('').pathname;
  //console.log(path)
  const forUser = useMemo(() => path.startsWith('/profile'), [path]);

  return (
    <ul className={styles.orderList}>
      {orders.map((order, index) => (
        <OrderBrief order={order} key={index} forUser={forUser} />
      ))}
    </ul>
  );
};

export default OrdersBriefList;
