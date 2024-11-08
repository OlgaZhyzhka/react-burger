import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

import { Burger, Ingredient } from '@/utils/interfaces'

export interface burgerConstructorState {
  burger: Burger
}

const initialState: burgerConstructorState = {
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
      reducer: (state, action: PayloadAction<Ingredient>) => {
        const { payload } = action
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
    deleteBurgerIngredient: (state, action: PayloadAction<string>) => {
      const { payload } = action
      state.burger.ingredients = state.burger.ingredients.filter(
        ingredient => ingredient.key !== payload,
      )
    },
    sortBurgerIngredients: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>,
    ) => {
      const { fromIndex, toIndex } = action.payload
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
