import { describe, expect } from '@jest/globals'

import { burgerConstructorSlice, initialState } from '@/services/burger-constructor/reducer'
import { IngredientTypes } from '@/utils/constants'

jest.mock('@reduxjs/toolkit', () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const originalModule = jest.requireActual('@reduxjs/toolkit')
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return {
    ...originalModule,
    nanoid: (): string => 'PzhehRNcpZvfo-F2DDQlx',
  }
})

describe('burgerConstructor Reducer', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const ingredientBun = {
    _id: '6790e3c8133acd001be4c175',
    name: 'Краторная булка',
    type: IngredientTypes.bun,
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'image-url',
    image_mobile: 'image-mobile-url',
    image_large: 'image-large-url',
    __v: 0,
    key: 'PzhehRNcpZvfo-F2DDQlx',
  }

  const ingredient = {
    _id: '6790e3c8133acd001be4c175d',
    name: 'Соус фирменный Space Sauce',
    type: IngredientTypes.sauce,
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 80,
    image: 'image-url',
    image_mobile: 'image-mobile-url',
    image_large: 'image-large-url',
    __v: 0,
    key: 'PzhehRNcpZvfo-F2DDQlx',
  }

  it('should init state correctly', () => {
    expect(burgerConstructorSlice.reducer(undefined, { type: '' })).toEqual(initialState)
  })

  it('should handle addBurgerIngredient for bun', () => {
    const action = burgerConstructorSlice.actions.addBurgerIngredient(ingredientBun)
    const state = burgerConstructorSlice.reducer(initialState, action)
    const expectedState = {
      ...initialState,
      burger: {
        ...initialState.burger,
        bun: ingredientBun,
      },
    }

    expect(state).toEqual(expectedState)
  })

  it('should handle addBurgerIngredient for ingredient', () => {
    const action = burgerConstructorSlice.actions.addBurgerIngredient(ingredient)
    const state = burgerConstructorSlice.reducer(initialState, action)
    const expectedState = {
      ...initialState,
      burger: {
        ...initialState.burger,
        ingredients: [ingredient],
      },
    }
    expect(state).toEqual(expectedState)
  })

  it('should handle sortBurgerIngredients', () => {
    const initialStateWithIngredients = {
      ...initialState,
      burger: {
        ...initialState.burger,
        ingredients: [ingredient, ingredientBun],
      },
    }

    const action = {
      type: burgerConstructorSlice.actions.sortBurgerIngredients.type,
      payload: { fromIndex: 0, toIndex: 1 },
    }
    const state = burgerConstructorSlice.reducer(initialStateWithIngredients, action)
    const expectedState = {
      ...initialStateWithIngredients,
      burger: {
        ...initialStateWithIngredients.burger,
        ingredients: [ingredientBun, ingredient],
      },
    }

    expect(state).toEqual(expectedState)
  })

  it('should handle deleteBurgerIngredient', () => {
    const initialStateWithIngredients = {
      ...initialState,
      burger: {
        ...initialState.burger,
        ingredients: [ingredient],
      },
    }
    const action = {
      type: burgerConstructorSlice.actions.deleteBurgerIngredient.type,
      payload: ingredient.key,
    }
    const state = burgerConstructorSlice.reducer(initialStateWithIngredients, action)
    const expectedState = { ...initialState }

    expect(state).toEqual(expectedState)
  })

  it('should handle clearBurger', () => {
    const initialStateWithIngredients = {
      ...initialState,
      burger: {
        bun: ingredientBun,
        ingredients: [ingredient],
      },
    }
    const action = { type: burgerConstructorSlice.actions.clearBurger.type }
    const state = burgerConstructorSlice.reducer(initialStateWithIngredients, action)
    const expectedState = { ...initialState }

    expect(state).toEqual(expectedState)
  })
})
