import { describe, expect } from '@jest/globals'

import { ingredientsSlice, initialState } from '@/services/ingredients/reducer'
import { loadIngredients } from '@/services/ingredients/actions'
import { IngredientTypes } from '@/utils/constants'

describe('ingredients Reducer', () => {
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
    expect(ingredientsSlice.reducer(undefined, { type: '' })).toEqual(initialState)
  })

  it('loadIngredients fulfilled', () => {
    const action = { type: loadIngredients.fulfilled.type, payload: ingredient }
    const state = ingredientsSlice.reducer(initialState, action)

    expect(state).toEqual({ ...initialState, data: ingredient, loading: false })
  })

  it('loadIngredients pending', () => {
    const action = { type: loadIngredients.pending.type }
    const state = ingredientsSlice.reducer(initialState, action)

    expect(state).toEqual({ ...initialState, loading: true })
  })

  it('loadIngredients rejected', () => {
    const action = { type: loadIngredients.rejected.type, payload: 'Test error' }
    const state = ingredientsSlice.reducer(initialState, action)

    expect(state).toEqual({ ...initialState, error: 'Test error' })
  })
})
