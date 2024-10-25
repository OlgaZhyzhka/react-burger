import { FC } from 'react'
import classNames from 'classnames'

import { Ingredient } from '@/utils/interfaces'
import { IngredientItem } from '../ingredient-item'
import styles from './ingredient-group.module.scss'

type IngredientGroupProps = {
  ingredients: Ingredient[]
}

const IngredientGroup: FC<IngredientGroupProps> = ({ ingredients }) => (
  <ul className={classNames(styles.root, 'ml-4 mr-4')}>
    {ingredients.map(ingredient => (
      <IngredientItem key={ingredient._id} ingredient={ingredient} />
    ))}
  </ul>
)

export default IngredientGroup
