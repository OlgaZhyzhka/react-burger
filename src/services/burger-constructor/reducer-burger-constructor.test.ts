import { describe, expect } from '@jest/globals'

import { burgerConstructorSlice, initialState } from '@/services/burger-constructor/reducer'

describe('burgerConstructorReducer', () => {
  it('should return the initial state', () => {
    expect(burgerConstructorSlice.reducer(undefined, { type: '' })).toEqual(initialState)
  })
})
