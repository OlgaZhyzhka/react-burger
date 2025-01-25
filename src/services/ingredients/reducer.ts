import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { loadIngredients } from '@/services/ingredients/actions'
import type { Ingredient } from '@/utils/interfaces'

export interface IngredientsState {
  data: Ingredient[] | null
  loading: boolean
  error: unknown
}

export const initialState: IngredientsState = {
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
      .addCase(loadIngredients.fulfilled, (state, { payload }: PayloadAction<Ingredient[]>) => {
        state.data = payload
        state.loading = false
      })
      .addCase(loadIngredients.pending, state => {
        state.loading = true
      })
      .addCase(loadIngredients.rejected, (state, { payload }: PayloadAction<unknown>) => {
        state.loading = false
        state.error = payload
      })
  },
})
