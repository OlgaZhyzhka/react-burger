import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

import { Burger, Ingredient, IngredientCount } from '@/utils/interfaces'
import { createSelector } from 'reselect'

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
  selectors: {
    getBurgerConstructorState: state => state,
    getBurgerConstructor: state => state.burger,
    getIngredientsCount: createSelector(
      [
        (state: burgerConstructorState): Burger | null =>
          burgerConstructorSlice.getSelectors().getBurgerConstructor(state),
      ],
      burger => {
        const ingredientCount: IngredientCount = {}

        if (burger?.bun) {
          ingredientCount[burger.bun._id] = 2
        }

        burger?.ingredients.forEach((ingredient: Ingredient) => {
          if (ingredientCount[ingredient._id]) {
            ingredientCount[ingredient._id] += 1
          } else {
            ingredientCount[ingredient._id] = 1
          }
        })

        return ingredientCount
      },
    ),
    totalPrice: createSelector([(state: burgerConstructorState) => state.burger], burger => {
      if (!burger) {
        return 0
      }

      const ingredientsPrice = burger.ingredients.reduce(
        (acc, ingredient) => acc + ingredient.price,
        0,
      )
      const bunPrice = burger.bun ? burger.bun.price * 2 : 0

      return ingredientsPrice + bunPrice
    }),
    getOrderIngredients: createSelector(
      [
        (state: burgerConstructorState): Burger | null =>
          burgerConstructorSlice.getSelectors().getBurgerConstructor(state),
      ],
      burger => {
        if (!burger || !burger.bun) {
          return { ingredients: [] }
        }

        const { bun, ingredients } = burger

        return {
          ingredients: [
            bun._id,
            ...ingredients.map((ingredient: Ingredient) => ingredient._id),
            bun._id,
          ],
        }
      },
    ),
  },
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
export const { getBurgerConstructor, getIngredientsCount, getOrderIngredients, totalPrice } =
  burgerConstructorSlice.selectors
