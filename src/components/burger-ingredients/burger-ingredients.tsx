import { FC, memo, useCallback } from 'react'
import classNames from 'classnames'

import { SortIngredients } from '@/utils/interfaces'
import { IngredientType } from '@/utils/types'

import { Tabs } from '@/components/base-components/tabs'
import { IngredientGroups } from './ingredient-groups'
import styles from './burger-ingredients.module.scss'

type BurgerIngredientsProps = {
  ingredients: SortIngredients
}

const BurgerIngredients: FC<BurgerIngredientsProps> = ({ ingredients }) => {
  const handleTabChange = useCallback((newTab: IngredientType) => {
    console.log('Current tab:', newTab)
  }, [])

  return (
    <section className={classNames(styles.root, 'pt-10')}>
      <h1 className={'text_type_main-large mt-0 mb-5'}>Соберите бургер</h1>
      <Tabs onTabChange={handleTabChange} />
      <IngredientGroups ingredients={ingredients} />
    </section>
  )
}

BurgerIngredients.displayName = 'BurgerIngredients'

export default memo(BurgerIngredients)
