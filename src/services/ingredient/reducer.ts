import { createSlice } from '@reduxjs/toolkit'

import { Ingredient } from '@/utils/interfaces'

export interface ingredientState {
  ingredient: Ingredient | null
}

const initialState: ingredientState = {
  ingredient: null,
}

export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {},
})
