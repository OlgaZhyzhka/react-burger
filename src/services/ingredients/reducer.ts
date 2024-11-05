import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

import { loadIngredients } from '@/services/ingredients/actions'
import { Ingredient, SortIngredients } from '@/utils/interfaces'

export interface IngredientsState {
  ingredients: Ingredient[] | null
  loading: boolean
  error: unknown
}

const initialState: IngredientsState = {
  ingredients: null,
  loading: false,
  error: null,
}

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsState: state => state,
    getIngredients: state => state.ingredients,
    getSortedIngredients: createSelector(
      [
        (state: IngredientsState): Ingredient[] | null =>
          ingredientsSlice.getSelectors().getIngredients(state),
      ],
      ingredients => {
        const sortedIngredients: SortIngredients = {
          bun: [],
          sauce: [],
          main: [],
        }

        ingredients?.forEach((ingredient: Ingredient) => {
          sortedIngredients[ingredient.type].push(ingredient)
        })

        return sortedIngredients
      },
    ),
  },
  extraReducers: builder => {
    builder
      .addCase(loadIngredients.fulfilled, (state, { payload }) => {
        state.ingredients = payload
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
