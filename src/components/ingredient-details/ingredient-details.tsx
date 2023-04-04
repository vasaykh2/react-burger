import { useMemo, FC } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styles from './ingredient-details-styles.module.css';
import { TIngredient } from '../../types/ingredients';
import NotFound from '../../pages/not-found/not-found';

type TIngredientDetailsProps = {
  ingredients: Array<TIngredient>;
  id: string;
};

const IngredientDetails: FC<TIngredientDetailsProps> = ({
  ingredients,
  id,
}) => {
  const location = useLocation();
  const background = location.state?.background;

  const currentIngredientDetails = useMemo(
    () => ingredients?.find((el) => el._id === id),
    [ingredients, id]
  );

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
};

export default IngredientDetails;
