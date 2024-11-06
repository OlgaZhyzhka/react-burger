import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

import { loadIngredients } from '@/services/ingredients/actions'
import { Ingredient, SortIngredients } from '@/utils/interfaces'

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
  selectors: {
    getIngredientsState: state => state,
    getIngredients: state => state.data,
    getSortedIngredients: createSelector(
      [
        (state: IngredientsState): Ingredient[] | null =>
          ingredientsSlice.getSelectors().getIngredients(state),
      ],
      data => {
        const sortedIngredients: SortIngredients = {
          bun: [],
          sauce: [],
          main: [],
        }

        data?.forEach((ingredient: Ingredient) => {
          sortedIngredients[ingredient.type].push(ingredient)
        })

        return sortedIngredients
      },
    ),
  },
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

export const { getIngredientsState, getIngredients, getSortedIngredients } =
  ingredientsSlice.selectors
