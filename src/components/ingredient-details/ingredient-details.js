import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { ingredientsType } from '../../utils/types';
import styles from './ingredient-details-styles.module.css';

import NotFound from '../../pages/not-found/not-found';

function IngredientDetails({ ingredients, id }) {
  //const currentIngredientDetails = props.currentModalIngredientDetails;

  const location = useLocation();
  const background = location.state?.background;
  //const  {id}  = useParams();

  const currentIngredientDetails = useMemo(
    () => ingredients?.find((el) => el._id === id),
    [ingredients, id]
  );

  //console.log(id);

  return currentIngredientDetails ? (
    <div
      className={`${styles.container} ${
        !background && styles.container_fullPage
      }`}
    >
      <img
        src={currentIngredientDetails.image_large}
        alt={currentIngredientDetails.name}
      />
      <p className='text text_type_main-medium pt-2 pb-8'>
        {currentIngredientDetails.name}
      </p>
      <ul className={styles.contentString}>
        <li className={styles.content}>
          <span className='text text_type_main-default'>Калории, ккал</span>
          <p className={'text text_type_digits-default'}>
            {currentIngredientDetails.calories}
          </p>
        </li>
        <li className={styles.content}>
          <span className='text text_type_main-default'>Белки, г</span>
          <p className={'text text_type_digits-default'}>
            {currentIngredientDetails.proteins}
          </p>
        </li>
        <li className={styles.content}>
          <span className='text text_type_main-default'>Жиры, г</span>
          <p className={'text text_type_digits-default'}>
            {currentIngredientDetails.fat}
          </p>
        </li>
        <li className={styles.content}>
          <span className='text text_type_main-default'>Углеводы, г</span>
          <p className={'text text_type_digits-default'}>
            {currentIngredientDetails.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  ) : (
    <NotFound />
  );
}

export default IngredientDetails;

IngredientDetails.propTypes = {
  ingredients: ingredientsType,
  id: PropTypes.number,
}.isRequired;

/*IngredientDetails.propTypes = {
  currentModalIngredientDetails: PropTypes.shape({
    _id: PropTypes.string,
    calories: PropTypes.number,
    carbohydrates: PropTypes.number,
    fat: PropTypes.number,
    image_large: PropTypes.string,
    name: PropTypes.string,    
    proteins: PropTypes.number,    
  }.isRequired)
};*/
