import { useState } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames'

import { IngredientTypes } from '@/utils/constants'
import { IngredientType } from '@/utils/types'
import { IngredientGroup } from './ingredient-group'
import { sortedIngredients } from '@/utils/helpers'
import styles from './burger-ingredients.module.scss'

const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState<IngredientType>(IngredientTypes.bun)

  const handleTabClick = (value: string) => {
    setCurrentTab(value as IngredientType)
  }

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
        {currentTab === IngredientTypes.bun && (
          <>
            <h3 className="mt-0 mb-6 text text_type_main-medium">Булки</h3>
            <IngredientGroup ingredients={sortedIngredients.bun} />
          </>
        )}
        {currentTab === IngredientTypes.sauce && (
          <>
            <h3 className="mt-0 mb-6 text text_type_main-medium">Соусы</h3>
            <IngredientGroup ingredients={sortedIngredients.sauce} />
          </>
        )}
        {currentTab === IngredientTypes.main && (
          <>
            <h3 className="mt-0 mb-6 text text_type_main-medium">Начинки</h3>
            <IngredientGroup ingredients={sortedIngredients.main} />
          </>
        )}
      </div>
    </section>
  )
}

export default BurgerIngredients
