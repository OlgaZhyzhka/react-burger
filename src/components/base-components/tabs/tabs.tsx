import { forwardRef, memo } from 'react'
import type { ForwardedRef } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import type { IngredientType } from '@/utils/types'
import { IngredientTypes } from '@/utils/constants'
import type { TabsProps } from './types/tab-props'

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ activeTab, onTabChange }: TabsProps, ref: ForwardedRef<HTMLDivElement>): React.JSX.Element => {
    const handleTabClick = (value: string): void => {
      const newTab = value as IngredientType
      onTabChange(newTab)
    }

    return (
      <div className="d-flex mb-10" ref={ref}>
        <Tab
          value={IngredientTypes.bun}
          active={activeTab === IngredientTypes.bun}
          onClick={handleTabClick}>
          Булки
        </Tab>
        <Tab
          value={IngredientTypes.sauce}
          active={activeTab === IngredientTypes.sauce}
          onClick={handleTabClick}>
          Соусы
        </Tab>
        <Tab
          value={IngredientTypes.main}
          active={activeTab === IngredientTypes.main}
          onClick={handleTabClick}>
          Начинки
        </Tab>
      </div>
    )
  },
)

Tabs.displayName = 'Tabs'

export default memo(Tabs)
