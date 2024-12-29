import type { ReactNode } from 'react'

import type { IngredientType, OrderStatusType } from './types'

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
  key?: string
}

export interface Orders {
  success: boolean
  orders: Order[]
  total: number
  totalToday: number
}

export interface Order {
  _id: string
  status: OrderStatusType
  name: string
  createdAt: string
  number: string
  ingredients: string[]
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

export interface Burger {
  bun: Ingredient | null
  ingredients: Ingredient[]
}

export interface IngredientCount {
  [key: string]: number
}

export interface OrderDTO {
  ingredients: string[]
}

export interface OrderResponse {
  name: string
  order: { number: number }
}

export interface ErrorBoundaryProps {
  children: ReactNode
}

export interface ErrorBoundaryState {
  hasError: boolean
}

export interface AuthDTO {
  email: string
  password: string
  name: string
}

export interface User {
  email: string
  name: string
}

export interface ErrorResponse {
  message: string
}

export interface ApiResponse {
  success: boolean
  accessToken: string
  refreshToken: string
  user: User
  message?: string
}

export interface FeedResponse {
  success: boolean
  orders: Order[]
  total: number
  totalToday: number
}
