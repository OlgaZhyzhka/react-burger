import { createSelector } from 'reselect'

import { RootState } from '@/services/store'
import { Ingredient, IngredientCount } from '@/utils/interfaces'

export const getBurgerConstructorState = (state: RootState) => state.burgerConstructor
export const getBurgerConstructor = createSelector(
  (state: RootState) => state.burgerConstructor,
  burgerConstructor => burgerConstructor.burger,
)

export const getIngredientsCount = createSelector([getBurgerConstructor], burger => {
  const ingredientCount: IngredientCount = {}

  if (burger?.bun) {
    ingredientCount[burger.bun._id] = 2
  }

  burger?.ingredients.forEach((ingredient: Ingredient) => {
    if (ingredientCount[ingredient._id]) {
      ingredientCount[ingredient._id] += 1
    } else {
      ingredientCount[ingredient._id] = 1
    }
  })

  return ingredientCount
})

export const getOrderIngredients = createSelector([getBurgerConstructor], burger => {
  if (!burger || !burger.bun) {
    return { ingredients: [] }
  }

  const { bun, ingredients } = burger

  return {
    ingredients: [bun._id, ...ingredients.map((ingredient: Ingredient) => ingredient._id), bun._id],
  }
})
