import { burgerData } from './constants'
import { Ingredient } from './interfaces'
import { IngredientType } from './types'

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

export const sortedIngredients = sortIngredients(burgerData)
