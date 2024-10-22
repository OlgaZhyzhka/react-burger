import { useMemo, useState } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames'

import { ingredients, IngredientTypes } from '@/utils/constants'
import { Ingredient } from '@/utils/interfaces'
import { IngredientType } from '@/utils/types'
import { sortIngredients } from '@/utils/helpers'
import { Modal } from '@/components/modal'
import { IngredientGroup } from './ingredient-group'
import { IngredientDetails } from './ingredient-details'
import styles from './burger-ingredients.module.scss'

const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState<IngredientType>(IngredientTypes.bun)
  const [currentIngredient, setCurrentIngredient] = useState<Ingredient | null>(null)

  const handleTabClick = (value: string) => {
    setCurrentTab(value as IngredientType)
  }

  const memoSortedIngredients = useMemo(() => sortIngredients(ingredients), [ingredients])

  return (
    <section className={classNames(styles.root, 'pt-10')}>
      <h1 className={'text_type_main-large mt-0 mb-5'}>Соберите бургер</h1>
      <div className="d-flex mb-10">
        <Tab
          value={IngredientTypes.bun}
          active={currentTab === IngredientTypes.bun}
          onClick={handleTabClick}>
          Булки
        </Tab>
        <Tab
          value={IngredientTypes.sauce}
          active={currentTab === IngredientTypes.sauce}
          onClick={handleTabClick}>
          Соусы
        </Tab>
        <Tab
          value={IngredientTypes.main}
          active={currentTab === IngredientTypes.main}
          onClick={handleTabClick}>
          Начинки
        </Tab>
      </div>
      <div className={classNames(styles.tabs, 'custom-scroll')}>
        <h3 className="mt-0 mb-6 text text_type_main-medium">Булки</h3>
        <IngredientGroup ingredients={memoSortedIngredients.bun} onClick={setCurrentIngredient} />
        <h3 className="mt-0 mb-6 text text_type_main-medium">Соусы</h3>
        <IngredientGroup ingredients={memoSortedIngredients.sauce} onClick={setCurrentIngredient} />
        <h3 className="mt-0 mb-6 text text_type_main-medium">Начинки</h3>
        <IngredientGroup ingredients={memoSortedIngredients.main} onClick={setCurrentIngredient} />
      </div>
      {currentIngredient && (
        <Modal title="Детали ингредиента" onClose={() => setCurrentIngredient(null)}>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
    </section>
  )
}

export default BurgerIngredients
