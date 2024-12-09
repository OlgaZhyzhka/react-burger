import type { Ingredient } from './interfaces'
import type { IngredientType } from './types'

export const sortIngredients = (
  ingredients: Ingredient[],
): Record<IngredientType, Ingredient[]> => {
  const sortedIngredients: Record<IngredientType, Ingredient[]> = {
    bun: [],
    sauce: [],
    main: [],
  }

  ingredients.forEach(ingredient => {
    sortedIngredients[ingredient.type].push(ingredient)
  })

  return sortedIngredients
}
