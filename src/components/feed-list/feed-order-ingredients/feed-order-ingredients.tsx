import { useMemo } from 'react'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames'

import { useAppSelector } from '@/services/store'
import { getMappedIngredients } from '@/services/ingredients/selectors'
import FeedIngredientIcon from '../feed-ingredient-icon/feed-ingredient-icon'
import type { FeedOrderIngredientsProps } from './types/feed-order-ingredients-props'
import styles from './feed-order-ingredients.module.scss'

const FeedOrderIngredients = ({
  ingredients,
  className = '',
}: FeedOrderIngredientsProps): React.JSX.Element => {
  const mappedIngredients = useAppSelector(getMappedIngredients)
  const ingredientCount = useMemo(
    () =>
      ingredients.reduce(
        (countMap, ingredientId) => {
          countMap[ingredientId] = (countMap[ingredientId] || 0) + 1
          return countMap
        },
        {} as Record<string, number>,
      ),
    [ingredients],
  )

  return (
    <ul className={classNames(styles.root, className)}>
      {Object.entries(ingredientCount).map(([ingredientId, count], index) => {
        const ingredient = mappedIngredients.get(ingredientId)

        if (!ingredient) {
          return null
        }

        return (
          <li key={index} className={styles.item}>
            <FeedIngredientIcon className={styles.icon} image={ingredient.image} />
            <h3 className="text text_type_main-default">{ingredient.name}</h3>
            <span className={classNames(styles.price)}>
              <span className="text text_type_digits-default mr-2">
                {count} x {ingredient.price}{' '}
              </span>
              <CurrencyIcon type="primary" />
            </span>
          </li>
        )
      })}
    </ul>
  )
}

export default FeedOrderIngredients
