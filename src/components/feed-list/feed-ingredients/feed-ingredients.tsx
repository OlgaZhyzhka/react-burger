import classNames from 'classnames'

import FeedIngredientIcon from '../feed-ingredient-icon/feed-ingredient-icon'
import type { FeedIngredientsProps } from './types/feed-ingredients-props'
import styles from './feed-ingredients.module.scss'

const FeedIngredients = ({
  ingredients,
  maxVisibleItemCount = 1,
  className = '',
}: FeedIngredientsProps): React.JSX.Element => {
  const hideItemCount = ingredients.length - maxVisibleItemCount
  const visibleIngredients = ingredients.slice(0, maxVisibleItemCount - 1)

  return (
    <ul className={classNames(styles.root, className)}>
      {visibleIngredients.map((ingredient, index) => (
        <li key={index} className={styles.item} style={{ zIndex: maxVisibleItemCount - index }}>
          <FeedIngredientIcon image={ingredient.image_mobile} />
        </li>
      ))}

      {hideItemCount > 0 && (
        <li className={classNames(styles.item, styles.hidden)}>
          <FeedIngredientIcon
            image={ingredients[maxVisibleItemCount].image_mobile}
            hideItemCount={hideItemCount}
          />
        </li>
      )}
    </ul>
  )
}

export default FeedIngredients
