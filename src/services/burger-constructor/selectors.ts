import { createSelector } from 'reselect'

import type { RootState } from '@/services/store'
import type { Burger, Ingredient, IngredientCount } from '@/utils/interfaces'
import type { BurgerConstructorState } from './reducer'

export const getBurgerConstructorState = (state: RootState): BurgerConstructorState =>
  state.burgerConstructor
export const getBurgerConstructor = createSelector(
  (state: RootState) => state.burgerConstructor,
  burgerConstructor => burgerConstructor.burger,
)

export const getIngredientsCount = createSelector(
  [getBurgerConstructor],
  (burger: Burger): IngredientCount => {
    const ingredientCount: IngredientCount = {}

    if (burger?.bun) {
      ingredientCount[burger.bun._id] = 2
    }

    burger?.ingredients.forEach((ingredient: Ingredient): void => {
      if (ingredientCount[ingredient._id]) {
        ingredientCount[ingredient._id] += 1
      } else {
        ingredientCount[ingredient._id] = 1
      }
    })

    return ingredientCount
  },
)

export const getOrderIngredients = createSelector([getBurgerConstructor], (burger: Burger) => {
  if (!burger || !burger.bun) {
    return { ingredients: [] }
  }

  const { bun, ingredients } = burger

  return {
    ingredients: [bun._id, ...ingredients.map((ingredient: Ingredient) => ingredient._id), bun._id],
  }
})
