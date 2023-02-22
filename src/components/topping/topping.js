import React, { useRef } from 'react';

import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';

import toppingStyles from './topping-styles.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { sortConstructor } from '../../services/actions/constructor';

export function Topping({ ingredient, index, handleClose }) {
  const dispatch = useDispatch();

  const { toppings } = useSelector((state) => state.constructorBurger);
  const id = ingredient.id;

  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'burgerConstructor',
    collect(monitor) {
      return {
        item: monitor.getItem(),
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(sortConstructor(toppings, dragIndex, hoverIndex));

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'burgerConstructor',
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref));

  const opacity = isDragging ? 0 : 1;

  return (
    <li
      className={toppingStyles.blockString + ' pr-2'}
      ref={ref}
      data-handler-id={handlerId}
      style={{ opacity }}
    >
      <DragIcon type='primary' />
      <div className={toppingStyles.blockItem}>
        <ConstructorElement
          text={ingredient.data.name}
          thumbnail={ingredient.data.image}
          price={ingredient.data.price}
          handleClose={handleClose}
        />
      </div>
    </li>
  );
}
