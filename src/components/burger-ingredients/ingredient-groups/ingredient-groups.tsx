import { forwardRef, memo, useImperativeHandle, useMemo, useRef } from 'react'
import type { ForwardedRef } from 'react'
import classNames from 'classnames'

import type { IngredientType } from '@/utils/types'
import type { Ingredient, IngredientCount } from '@/utils/interfaces'
import { useAppSelector } from '@/services/store'
import { getBurgerConstructor } from '@/services/burger-constructor/selectors'
import { getSortedIngredients } from '@/services/ingredients/selectors'
import { IngredientGroup } from '../ingredient-group'
import type { IngredientGroupsProps } from './types/ingredient-groups-props'
import styles from './ingredient-groups.module.scss'

const IngredientGroups = forwardRef<
  { [key in IngredientType]?: HTMLHeadingElement | null },
  IngredientGroupsProps
>(
  (
    { onScroll }: IngredientGroupsProps,
    ref: ForwardedRef<{ [key in IngredientType]?: HTMLHeadingElement | null }>,
  ): React.JSX.Element => {
    const sortedIngredients = useAppSelector(getSortedIngredients)
    const { bun, ingredients } = useAppSelector(getBurgerConstructor)
    const ingredientsCount = useMemo<IngredientCount>((): IngredientCount => {
      const count: IngredientCount = {}
      if (bun) {
        count[bun._id] = 2
      }
      ingredients.forEach((ingredient: Ingredient) => {
        count[ingredient._id] = (count[ingredient._id] || 0) + 1
      })
      return count
    }, [bun, ingredients])

    const bunRef = useRef<HTMLHeadingElement | null>(null)
    const sauceRef = useRef<HTMLHeadingElement | null>(null)
    const mainRef = useRef<HTMLHeadingElement | null>(null)

    useImperativeHandle(
      ref,
      (): {
        bun: HTMLHeadingElement | null
        sauce: HTMLHeadingElement | null
        main: HTMLHeadingElement | null
      } => ({
        bun: bunRef.current,
        sauce: sauceRef.current,
        main: mainRef.current,
      }),
    )

    return (
      <div className={classNames(styles.tabs, 'custom-scroll')} onScroll={onScroll}>
        <h3 className="mt-0 mb-6 text text_type_main-medium" ref={bunRef}>
          Булки
        </h3>
        <IngredientGroup ingredients={sortedIngredients.bun} ingredientsCount={ingredientsCount} />
        <h3 className="mt-0 mb-6 text text_type_main-medium" ref={sauceRef}>
          Соусы
        </h3>
        <IngredientGroup
          ingredients={sortedIngredients.sauce}
          ingredientsCount={ingredientsCount}
        />
        <h3 className="mt-0 mb-6 text text_type_main-medium" ref={mainRef}>
          Начинки
        </h3>
        <IngredientGroup ingredients={sortedIngredients.main} ingredientsCount={ingredientsCount} />
      </div>
    )
  },
)
IngredientGroups.displayName = 'IngredientGroups'

export default memo(IngredientGroups)
