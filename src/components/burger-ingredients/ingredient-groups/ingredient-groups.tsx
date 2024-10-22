import { FC, memo } from 'react'
import classNames from 'classnames'

import { Ingredient } from '@/utils/interfaces'
import { IngredientGroup } from '../ingredient-group'
import styles from './ingredient-groups.module.scss'

type IngredientGroupsProps = {
  sortedIngredients: {
    bun: Ingredient[]
    sauce: Ingredient[]
    main: Ingredient[]
  }
  onIngredientClick: (ingredient: Ingredient) => void
}

const IngredientGroups: FC<IngredientGroupsProps> = ({ sortedIngredients, onIngredientClick }) => (
  <div className={classNames(styles.tabs, 'custom-scroll')}>
    <h3 className="mt-0 mb-6 text text_type_main-medium">Булки</h3>
    <IngredientGroup ingredients={sortedIngredients.bun} onClick={onIngredientClick} />
    <h3 className="mt-0 mb-6 text text_type_main-medium">Соусы</h3>
    <IngredientGroup ingredients={sortedIngredients.sauce} onClick={onIngredientClick} />
    <h3 className="mt-0 mb-6 text text_type_main-medium">Начинки</h3>
    <IngredientGroup ingredients={sortedIngredients.main} onClick={onIngredientClick} />
  </div>
)

export default memo(IngredientGroups)
