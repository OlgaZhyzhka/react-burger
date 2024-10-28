import { FC, memo, useState } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import { IngredientType } from '@/utils/types'
import { IngredientTypes } from '@/utils/constants'
import { TabsProps } from './types/tab-props'

const Tabs: FC<TabsProps> = ({ onTabChange }) => {
  const [currentTab, setCurrentTab] = useState<IngredientType>(IngredientTypes.bun)

  const handleTabClick = (value: string) => {
    const newTab = value as IngredientType
    setCurrentTab(newTab)
    onTabChange?.(newTab)
  }

  return (
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
  )
}

Tabs.displayName = 'Tabs'

export default memo(Tabs)
