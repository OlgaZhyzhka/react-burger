import classNames from 'classnames'

import { IngredientItem } from '../ingredient-item'
import type { IngredientGroupProps } from './types/ingredient-group-props'
import styles from './ingredient-group.module.scss'

const IngredientGroup = ({
  ingredients,
  ingredientsCount,
}: IngredientGroupProps): React.JSX.Element => (
  <ul className={classNames(styles.root, 'ml-4 mr-4')}>
    {ingredients.map(ingredient => (
      <IngredientItem
        key={ingredient._id}
        count={ingredientsCount[ingredient._id] || 0}
        ingredient={ingredient}
      />
    ))}
  </ul>
)

export default IngredientGroup
