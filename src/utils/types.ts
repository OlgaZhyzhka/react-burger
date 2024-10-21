import { IngredientTypes } from './constants'

export type IngredientType = (typeof IngredientTypes)[keyof typeof IngredientTypes]
