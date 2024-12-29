import { useMemo } from 'react'
import classNames from 'classnames'

import { useAppSelector } from '@/services/store'
import { getMappedIngredients } from '@/services/ingredients/selectors'
import FeedIngredientIcon from '../feed-ingredient-icon/feed-ingredient-icon'
import type { FeedIngredientsProps } from './types/feed-ingredients-props'
import styles from './feed-ingredients.module.scss'

const FeedIngredients = ({
  ingredients,
  maxVisibleItemCount = 1,
  className = '',
}: FeedIngredientsProps): React.JSX.Element | null => {
  const mappedIngredients = useAppSelector(getMappedIngredients)
  const feedIngredients = useMemo(
    () =>
      ingredients
        .map(ingredientId => mappedIngredients.get(ingredientId))
        .filter(ingredient => ingredient !== null),
    [ingredients, mappedIngredients],
  )

  if (!feedIngredients.length) {
    return null
  }

  const hideItemCount = feedIngredients.length - maxVisibleItemCount
  const visibleIngredients = feedIngredients.slice(0, maxVisibleItemCount - 1)

  return (
    <ul className={classNames(styles.root, className)}>
      {visibleIngredients.map(
        (ingredient, index) =>
          ingredient && (
            <li key={index} className={styles.item} style={{ zIndex: maxVisibleItemCount - index }}>
              <FeedIngredientIcon image={ingredient.image_mobile} />
            </li>
          ),
      )}

      {hideItemCount > 0 && (
        <li className={classNames(styles.item, styles.hidden)}>
          <FeedIngredientIcon
            image={feedIngredients[maxVisibleItemCount]?.image_mobile}
            hideItemCount={hideItemCount}
          />
        </li>
      )}
    </ul>
  )
}
export default FeedIngredients
