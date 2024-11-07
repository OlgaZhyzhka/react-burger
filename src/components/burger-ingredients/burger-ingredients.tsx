import { FC, memo, useCallback, useRef, useState } from 'react'
import classNames from 'classnames'

import { IngredientType } from '@/utils/types'
import { IngredientTypes } from '@/utils/constants'
import { Tabs } from '@/components/base-components/tabs'
import { IngredientGroups } from './ingredient-groups'
import styles from './burger-ingredients.module.scss'

const BurgerIngredients: FC = () => {
  const [activeTab, setActiveTab] = useState<IngredientType>(IngredientTypes.bun)
  const tabRef = useRef<HTMLDivElement | null>(null)
  const ingredientGroupsRef = useRef<{ [key in IngredientType]?: HTMLHeadingElement }>({})

  const handleTabChange = useCallback((newTab: IngredientType) => {
    setActiveTab(newTab)

    const heading = ingredientGroupsRef.current[newTab]
    if (heading) {
      heading.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const handleScroll = useCallback(() => {
    const { bun, sauce, main } = ingredientGroupsRef.current
    if (!bun || !sauce || !main) return

    const tabsBottom = tabRef.current?.getBoundingClientRect().bottom
    if (!tabsBottom) return

    const diffs = [
      { type: IngredientTypes.bun, diff: Math.abs(bun.getBoundingClientRect().top - tabsBottom) },
      {
        type: IngredientTypes.sauce,
        diff: Math.abs(sauce.getBoundingClientRect().top - tabsBottom),
      },
      { type: IngredientTypes.main, diff: Math.abs(main.getBoundingClientRect().top - tabsBottom) },
    ]

    const closest = diffs.reduce((prev, curr) => (curr.diff < prev.diff ? curr : prev))
    setActiveTab(closest.type)
  }, [])

  return (
    <section className={classNames(styles.root, 'pt-10')}>
      <h1 className={'text_type_main-large mt-0 mb-5'}>Соберите бургер</h1>
      <Tabs onTabChange={handleTabChange} activeTab={activeTab} ref={tabRef} />
      <IngredientGroups onScroll={handleScroll} ref={ingredientGroupsRef} />
    </section>
  )
}

BurgerIngredients.displayName = 'BurgerIngredients'

export default memo(BurgerIngredients)
