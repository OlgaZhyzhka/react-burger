import { createSelector } from 'reselect'

import type { Ingredient, SortIngredients } from '@/utils/interfaces'
import type { RootState } from '../store'
import type { IngredientsState } from './reducer'

export const getIngredientsState = (state: RootState): IngredientsState => state.ingredients
export const getIngredients = (state: RootState): Ingredient[] | null => state.ingredients.data
export const getSortedIngredients = createSelector(
  [getIngredients],
  (data: Ingredient[] | null): SortIngredients => {
    const sortedIngredients: SortIngredients = {
      bun: [],
      sauce: [],
      main: [],
    }

    data?.forEach((ingredient: Ingredient): void => {
      sortedIngredients[ingredient.type].push(ingredient)
    })

    return sortedIngredients
  },
)
export const getMappedIngredients = createSelector(
  [getIngredients],
  (data: Ingredient[] | null): Map<string, Ingredient> => {
    const ingredientMap = new Map<string, Ingredient>()
    data?.forEach(ingredient => {
      ingredientMap.set(ingredient._id, ingredient)
    })
    return ingredientMap
  },
)
