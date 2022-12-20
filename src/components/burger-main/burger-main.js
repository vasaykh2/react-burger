import PropTypes from 'prop-types';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
import { ingredientType } from '../../utils/types';
import burgerMainStyles from './burger-main-styles.module.css';

export default function BurgerMain(props) {
  return (
    <main className={burgerMainStyles.blocks}>
      <BurgerIngredients data={props.data} />
      <BurgerConstructor data={props.data} />
    </main>
  );
}

BurgerMain.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired,
};
