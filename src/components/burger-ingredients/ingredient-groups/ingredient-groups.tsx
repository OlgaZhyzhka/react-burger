import { FC, memo } from 'react'
import classNames from 'classnames'

import { IngredientGroup } from '../ingredient-group'
import { IngredientGroupsProps } from './types/ingredient-groups-props'
import styles from './ingredient-groups.module.scss'

// рассчитать тут отдельный объект в котором будет хранится кол-во ингредиентов = { id1: count1}
// рассчитать с помощью редьюс на массиве, обвернуть в мемое и передать количество в карточку

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
