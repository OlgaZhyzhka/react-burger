import { FC } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import { IngredientType } from '@/utils/types'
import { IngredientTypes } from '@/utils/constants'

type TabsProps = {
  currentTab: IngredientType
  onTabClick: (value: string) => void
}

const Tabs: FC<TabsProps> = ({ currentTab, onTabClick }) => (
  <div className="d-flex mb-10">
    <Tab
      value={IngredientTypes.bun}
      active={currentTab === IngredientTypes.bun}
      onClick={onTabClick}>
      Булки
    </Tab>
    <Tab
      value={IngredientTypes.sauce}
      active={currentTab === IngredientTypes.sauce}
      onClick={onTabClick}>
      Соусы
    </Tab>
    <Tab
      value={IngredientTypes.main}
      active={currentTab === IngredientTypes.main}
      onClick={onTabClick}>
      Начинки
    </Tab>
  </div>
)

export default Tabs
