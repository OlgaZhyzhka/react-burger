import { forwardRef, memo, useImperativeHandle, useRef } from 'react'
import classNames from 'classnames'

import { IngredientType } from '@/utils/types'
import { useAppSelector } from '@/hooks/store-hooks'
import { getSortedIngredients } from '@/services/ingredients/reducer'
import { getIngredientsCount } from '@/services/burger-constructor/reducer'
import { IngredientGroup } from '../ingredient-group'
import { IngredientGroupsProps } from './types/ingredient-groups-props'
import styles from './ingredient-groups.module.scss'

const IngredientGroups = forwardRef<
  { [key in IngredientType]?: HTMLHeadingElement | null },
  IngredientGroupsProps
>(({ onScroll }, ref) => {
  const sortedIngredients = useAppSelector(getSortedIngredients)
  const ingredientsCount = useAppSelector(getIngredientsCount)

  const bunRef = useRef<HTMLHeadingElement | null>(null)
  const sauceRef = useRef<HTMLHeadingElement | null>(null)
  const mainRef = useRef<HTMLHeadingElement | null>(null)

  useImperativeHandle(ref, () => ({
    bun: bunRef.current,
    sauce: sauceRef.current,
    main: mainRef.current,
  }))

  return (
    <div className={classNames(styles.tabs, 'custom-scroll')} onScroll={onScroll}>
      <h3 className="mt-0 mb-6 text text_type_main-medium" ref={bunRef}>
        Булки
      </h3>
      <IngredientGroup ingredients={sortedIngredients.bun} ingredientsCount={ingredientsCount} />
      <h3 className="mt-0 mb-6 text text_type_main-medium" ref={sauceRef}>
        Соусы
      </h3>
      <IngredientGroup ingredients={sortedIngredients.sauce} ingredientsCount={ingredientsCount} />
      <h3 className="mt-0 mb-6 text text_type_main-medium" ref={mainRef}>
        Начинки
      </h3>
      <IngredientGroup ingredients={sortedIngredients.main} ingredientsCount={ingredientsCount} />
    </div>
  )
})
IngredientGroups.displayName = 'IngredientGroups'

export default memo(IngredientGroups)
