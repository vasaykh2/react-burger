import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useNavigate, useLocation } from 'react-router-dom';
import { default as BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';
import { getUserInfo } from '../../services/actions/user';

import styles from './main-styles.module.css';

export default function BurgerMain() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('stateFrom') === '/profile' && !location.state) {
      navigate('/profile', { state: { from: { pathname: '/profile' } } });
    } else {
      if (location.state && location.state.from) {
        localStorage.setItem('stateFrom', location.state.from.pathname);
        //console.log([location.state.from.pathname, localStorage.getItem('stateFrom')]);
      }
    }
    dispatch(getUserInfo());
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <main className={styles.blocks}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </DndProvider>
  );
}
