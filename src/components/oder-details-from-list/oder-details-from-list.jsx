import {
  FormattedDate,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useMemo, useEffect } from 'react';
import { getOrder } from '../../services/actions/order';
import NotFound from '../../pages/not-found/not-found';
import styles from './oder-details-from-list.module.css';

const OderDetailsFromList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state?.background;
  const number = `${location.pathname}`.split('/')[
    `${location.pathname}`.split('/').length - 1
  ];
  //console.log(number);

  const { userOrders, publicOrders } = useSelector((state) => state.wsOrders);
  //console.log(location);

  const { orderInfo } = useSelector((state) => state.oder);
  //console.log(stateOder);

  const { ingredients } = useSelector((state) => state.ingredients);

  const orders = useMemo(
    () =>
      userOrders
        ? userOrders.orders
        : publicOrders
        ? publicOrders.orders
        : null,
    [userOrders, publicOrders]
  );

  const order =
    orders?.find((order) => order.number === Number(number)) || orderInfo;
  //console.log(order);

  useEffect(() => {
    if (!order) {
      dispatch(getOrder(number));
    }
  }, [order, number, dispatch]);

  const headerNumber = useMemo(
    () => order !== 'notFound' && `#${String(order?.number).padStart(6, '0')}`,
    [order]
  );

  const orderIngredients = useMemo(
    () =>
      order &&
      order !== 'notFound' &&
      order?.ingredients?.reduce(
        (object, id) => {
          let orderIngredient = object.ingredients.find(
            (ingredient) => ingredient._id === id
          );
          if (orderIngredient) {
            orderIngredient.count++;
            object.totalPrice += orderIngredient.price;
          } else {
            let currentIngredient = ingredients.find(
              (ingredient) => ingredient._id === id
            );
            if (currentIngredient) {
              orderIngredient = {
                ...currentIngredient,
                count: 1,
              };
              object.ingredients.push(orderIngredient);
              object.totalPrice += orderIngredient.price;
            }
          }
          return object;
        },
        { ingredients: [], totalPrice: 0 }
      ),

    [order, ingredients]
  );

  const OrderStatuses = {
    created: 'Создан',
    pending: 'Готовится',
    done: 'Выполнен',
  };

  return (
    <>
      {order && order !== 'notFound' && (
        <div
          className={`${styles.container} ${
            !background && styles.container_fullPage
          }`}
        >
          <span
            className={`${
              background ? styles.number : styles.number_fullPage
            } text text_type_digits-default pt-5 pb-5 mb-5`}
          >
            {headerNumber}
          </span>
          <h1 className='text text_type_main-medium mb-2'>{order.name}</h1>
          <span
            className={`text text_type_main-default ${
              order.status === 'done' ? styles.doneStatus : null
            }`}
          >
            {OrderStatuses[order.status]}
          </span>
          <div className={styles.ingredients}>
            <h2 className='text text_type_main-medium'>Состав:</h2>
            <ul className={styles.ingredients_container}>
              {orderIngredients &&
                orderIngredients.ingredients.map((ingredient, index) => (
                  <li className={styles.ingredient} key={index}>
                    <img
                      className={styles.ingredient_image}
                      src={ingredient.image}
                      alt={ingredient.name}
                    ></img>
                    <p className='text text_type_main-default'>
                      {ingredient.name}
                    </p>
                    <div className={styles.ingredient_priceContainer}>
                      <span className='text text_type_digits-default'>{`${ingredient.count} x ${ingredient.price}`}</span>
                      <CurrencyIcon type='primary' />
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <div className={styles.footer}>
            <p className='text text_type_main-default text_color_inactive'>
              <FormattedDate date={new Date(order.createdAt)} />
            </p>
            <div className={styles.ingredient_priceContainer}>
              <span className='text text_type_digits-default'>
                {orderIngredients && orderIngredients.totalPrice}
              </span>
              <CurrencyIcon type='primary' />
            </div>
          </div>
        </div>
      )}
      {order === 'notFound' && <NotFound />}
    </>
  );
};

export default OderDetailsFromList;
