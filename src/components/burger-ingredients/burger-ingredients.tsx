import { FC, useMemo, useState } from 'react'
import classNames from 'classnames'

import { IngredientTypes } from '@/utils/constants'
import { Ingredient } from '@/utils/interfaces'
import { IngredientType } from '@/utils/types'
import { sortIngredients } from '@/utils/helpers'
import { Modal } from '@/components/modal'
import { Tabs } from '@/components/base-components/tabs'
import { IngredientDetails } from './ingredient-details'
import { IngredientGroups } from './ingredient-groups'
import styles from './burger-ingredients.module.scss'

type BurgerIngredientsProps = {
  ingredients: Ingredient[]
}

const BurgerIngredients: FC<BurgerIngredientsProps> = ({ ingredients }) => {
  const [currentTab, setCurrentTab] = useState<IngredientType>(IngredientTypes.bun)
  const [currentIngredient, setCurrentIngredient] = useState<Ingredient | null>(null)

  const handleTabClick = (value: string) => {
    setCurrentTab(value as IngredientType)
  }

  const memoSortedIngredients = useMemo(() => sortIngredients(ingredients), [ingredients])

  return (
    <section className={classNames(styles.root, 'pt-10')}>
      <h1 className={'text_type_main-large mt-0 mb-5'}>Соберите бургер</h1>
      <Tabs currentTab={currentTab} onTabClick={handleTabClick} />
      <IngredientGroups
        sortedIngredients={memoSortedIngredients}
        onIngredientClick={setCurrentIngredient}
      />
      {currentIngredient && (
        <Modal title="Детали ингредиента" onClose={() => setCurrentIngredient(null)}>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
    </section>
  )
}

export default BurgerIngredients
