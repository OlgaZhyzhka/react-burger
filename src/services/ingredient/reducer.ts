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
  selectors: {
    getIngredient: state => state.ingredient,
  },
  reducers: {
    setIngredient: (state, { payload }) => {
      state.ingredient = payload
    },
  },
})

export const { setIngredient } = ingredientSlice.actions
export const { getIngredient } = ingredientSlice.selectors
