import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice, nanoid } from '@reduxjs/toolkit'

import type { Burger, Ingredient } from '@/utils/interfaces'

export interface BurgerConstructorState {
  burger: Burger
}

const initialState: BurgerConstructorState = {
  burger: {
    bun: null,
    ingredients: [],
  },
}

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBurgerIngredient: {
      reducer: (state, { payload }: PayloadAction<Ingredient>) => {
        if (payload.type === 'bun') {
          state.burger.bun = payload
        } else {
          state.burger.ingredients.push(payload)
        }
      },
      prepare: (ingredient: Ingredient) => {
        return { payload: { ...ingredient, key: nanoid() } }
      },
    },
    deleteBurgerIngredient: (state, { payload }: PayloadAction<string>) => {
      state.burger.ingredients = state.burger.ingredients.filter(
        ingredient => ingredient.key !== payload,
      )
    },
    sortBurgerIngredients: (
      state,
      { payload: { fromIndex, toIndex } }: PayloadAction<{ fromIndex: number; toIndex: number }>,
    ) => {
      const ingredients = [...state.burger.ingredients]
      ingredients.splice(toIndex, 0, ingredients.splice(fromIndex, 1)[0])
      state.burger.ingredients = ingredients
    },
    clearBurger: state => {
      state.burger = {
        bun: null,
        ingredients: [],
      }
    },
  },
})

export const { addBurgerIngredient, deleteBurgerIngredient, clearBurger, sortBurgerIngredients } =
  burgerConstructorSlice.actions
