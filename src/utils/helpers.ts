import type { Ingredient, Order } from './interfaces'
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

export const getOrderTotalPrice = (
  ingredientMap: Map<string, Ingredient>,
  order: Order,
): number => {
  return order.ingredients.reduce((total, ingredientId) => {
    const ingredient = ingredientMap.get(ingredientId)
    return ingredient ? total + ingredient.price : total
  }, 0)
}
