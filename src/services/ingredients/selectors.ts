import { createSelector } from 'reselect'

import { RootState } from '@/services/store'
import { IngredientsState } from './reducer'
import { Ingredient, SortIngredients } from '@/utils/interfaces'

export const getIngredientsState = (state: RootState): IngredientsState => state.ingredients
export const getIngredients = (state: RootState): Ingredient[] | null => state.ingredients.data
export const getSortedIngredients = createSelector([getIngredients], (data): SortIngredients => {
  const sortedIngredients: SortIngredients = {
    bun: [],
    sauce: [],
    main: [],
  }

  data?.forEach((ingredient: Ingredient) => {
    sortedIngredients[ingredient.type].push(ingredient)
  })

  return sortedIngredients
})
