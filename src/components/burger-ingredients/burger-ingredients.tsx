import { FC, memo, useCallback, useState } from 'react'
import classNames from 'classnames'

import { Ingredient, SortIngredients } from '@/utils/interfaces'
import { IngredientType } from '@/utils/types'
import { Modal } from '@/components/modal'
import { Tabs } from '@/components/base-components/tabs'
import { IngredientDetails } from './ingredient-details'
import { IngredientGroups } from './ingredient-groups'
import styles from './burger-ingredients.module.scss'

type BurgerIngredientsProps = {
  ingredients: SortIngredients
}

const BurgerIngredients: FC<BurgerIngredientsProps> = ({ ingredients }) => {
  const [currentIngredient, setCurrentIngredient] = useState<Ingredient | null>(null)

  const handleTabChange = useCallback((newTab: IngredientType) => {
    console.log('Current tab:', newTab)
  }, [])

  return (
    <section className={classNames(styles.root, 'pt-10')}>
      <h1 className={'text_type_main-large mt-0 mb-5'}>Соберите бургер</h1>
      <Tabs onTabChange={handleTabChange} />
      <IngredientGroups ingredients={ingredients} onIngredientClick={setCurrentIngredient} />
      {currentIngredient && (
        <Modal title="Детали ингредиента" onClose={() => setCurrentIngredient(null)}>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
    </section>
  )
}

export default memo(BurgerIngredients)
