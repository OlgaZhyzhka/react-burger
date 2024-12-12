import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames'

import type { FeedOrderIngredientsProps } from './types/feed-order-ingredients-props'
import styles from './feed-order-ingredients.module.scss'
import FeedIngredientIcon from '../feed-ingredient-icon/feed-ingredient-icon'

const FeedOrderIngredients = ({
  ingredients,
  className = '',
}: FeedOrderIngredientsProps): React.JSX.Element => {
  return (
    <ul className={classNames(styles.root, className)}>
      {ingredients.map((ingredient, index) => (
        <li key={index} className={styles.item}>
          <FeedIngredientIcon className={styles.icon} image={ingredient.image} />
          <h3 className="text text_type_main-default">{ingredient.name}</h3>
          <span className={classNames(styles.price)}>
            <span className="text text_type_digits-default mr-2"> 3 X {ingredient.price} </span>
            <CurrencyIcon type="primary" />
          </span>
        </li>
      ))}
    </ul>
  )
}

export default FeedOrderIngredients
