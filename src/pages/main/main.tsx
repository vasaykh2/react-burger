import { useEffect, FC } from 'react';
import { useDispatch } from '../../types/store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useNavigate, useLocation } from 'react-router-dom';
import { default as BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';
import { getUserInfo } from '../../services/actions/user';

import styles from './main-styles.module.css';

const BurgerMain: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('stateFrom') === '/profile' && !location.state) {
      //console.log([location.state?.from?.pathname, localStorage.getItem('stateFrom')]);
      navigate('/profile', { state: { from: { pathname: '/profile' } } });
    } else {
      if (
        localStorage.getItem('stateFrom') === '/profile/orders' &&
        !location.state
      ) {
        //console.log([location.state?.from?.pathname, localStorage.getItem('stateFrom')]);
        navigate('/profile/orders', {
          state: { from: { pathname: '/profile/orders' } },
        });
      } else {
        if (
          false /*localStorage.getItem('stateFrom').includes('background') &&
          !location.state*/
        ) {
          //console.log(localStorage.getItem('stateFrom').split('background')[1]);
          navigate('/profile/orders', {
            state: { background: { pathname: '/profile/orders' } },
          });
        } else {
          if (location.state && location.state.from) {
            localStorage.setItem('stateFrom', location.state.from.pathname);
            //console.log([location.state.from.pathname, localStorage.getItem('stateFrom')]);
          }
        }
      }
    }
    dispatch(getUserInfo());
  }, [location.state, navigate, dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <main className={styles.blocks}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </DndProvider>
  );
}

export default BurgerMain;