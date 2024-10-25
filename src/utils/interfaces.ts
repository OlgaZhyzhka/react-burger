import { ReactNode } from 'react'

import { IngredientType } from './types'

export interface Ingredient {
  _id: string
  name: string
  type: IngredientType
  proteins: number
  fat: number
  carbohydrates: number
  calories: number
  price: number
  image: string
  image_mobile: string
  image_large: string
  __v: number
}

export interface SortIngredients {
  bun: Ingredient[]
  sauce: Ingredient[]
  main: Ingredient[]
}

export interface ApiState {
  data: Ingredient[]
  loading: boolean
  error: string | null
}

export interface ErrorBoundaryProps {
  children: ReactNode
}

export interface ErrorBoundaryState {
  hasError: boolean
}
