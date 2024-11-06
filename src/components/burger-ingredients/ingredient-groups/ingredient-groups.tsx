import { FC, memo } from 'react'
import classNames from 'classnames'

import { useAppSelector } from '@/hooks/store-hooks'
import { getSortedIngredients } from '@/services/ingredients/reducer'
import { getIngredientsCount } from '@/services/burger-constructor/reducer'
import { IngredientGroup } from '../ingredient-group'
import styles from './ingredient-groups.module.scss'

const IngredientGroups: FC = () => {
  const sortedIngredients = useAppSelector(getSortedIngredients)
  const ingredientsCount = useAppSelector(getIngredientsCount)

  return (
    <div className={classNames(styles.tabs, 'custom-scroll')}>
      <h3 className="mt-0 mb-6 text text_type_main-medium">Булки</h3>
      <IngredientGroup ingredients={sortedIngredients.bun} ingredientsCount={ingredientsCount} />
      <h3 className="mt-0 mb-6 text text_type_main-medium">Соусы</h3>
      <IngredientGroup ingredients={sortedIngredients.sauce} ingredientsCount={ingredientsCount} />
      <h3 className="mt-0 mb-6 text text_type_main-medium">Начинки</h3>
      <IngredientGroup ingredients={sortedIngredients.main} ingredientsCount={ingredientsCount} />
    </div>
  )
}
IngredientGroups.displayName = 'IngredientGroups'

export default memo(IngredientGroups)
