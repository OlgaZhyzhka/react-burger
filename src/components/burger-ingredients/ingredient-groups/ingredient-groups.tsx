import { FC, memo } from 'react'
import classNames from 'classnames'

import { IngredientGroup } from '../ingredient-group'
import { IngredientGroupsProps } from './types/ingredient-groups'
import styles from './ingredient-groups.module.scss'

const IngredientGroups: FC<IngredientGroupsProps> = ({ ingredients }) => (
  <div className={classNames(styles.tabs, 'custom-scroll')}>
    <h3 className="mt-0 mb-6 text text_type_main-medium">Булки</h3>
    <IngredientGroup ingredients={ingredients.bun} />
    <h3 className="mt-0 mb-6 text text_type_main-medium">Соусы</h3>
    <IngredientGroup ingredients={ingredients.sauce} />
    <h3 className="mt-0 mb-6 text text_type_main-medium">Начинки</h3>
    <IngredientGroup ingredients={ingredients.main} />
  </div>
)

IngredientGroups.displayName = 'IngredientGroups'

export default memo(IngredientGroups)
