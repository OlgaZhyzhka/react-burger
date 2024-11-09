import { createSlice } from '@reduxjs/toolkit'

import { loadIngredients } from '@/services/ingredients/actions'
import { Ingredient } from '@/utils/interfaces'

export interface IngredientsState {
  data: Ingredient[] | null
  loading: boolean
  error: unknown
}

const initialState: IngredientsState = {
  data: null,
  loading: false,
  error: null,
}

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadIngredients.fulfilled, (state, { payload }) => {
        state.data = payload
        state.loading = false
      })
      .addCase(loadIngredients.pending, state => {
        state.loading = true
      })
      .addCase(loadIngredients.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
  },
})
