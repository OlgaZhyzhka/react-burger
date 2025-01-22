import { describe, expect } from '@jest/globals'

import { burgerOrderSlice, initialState } from '@/services/burger-order/reducer'
import { createBurgerOrder, getOrderByNumber } from '@/services/burger-order/actions'
import type { Order, OrderResponse } from '@/utils/interfaces'

describe('burgerOrderReducer', () => {
  const order: OrderResponse = {
    name: 'Краторный био-марсианский люминесцентный бургер',
    order: {
      number: 66425,
    },
  }

  const currentOrder: Order = {
    _id: '6790e3c8133acd001be4c175',
    ingredients: ['643d69a5c3f7b9001cfa0943', '643d69a5c3f7b9001cfa093d'],
    status: 'pending',
    name: 'Space флюоресцентный бургер',
    createdAt: '2025-01-22T12:25:44.163Z',
    updatedAt: '2025-01-22T12:25:44.546Z',
    number: 66463,
  }

  it('should init state correctly', () => {
    expect(burgerOrderSlice.reducer(undefined, { type: '' })).toEqual(initialState)
  })

  it('createBurgerOrder fulfilled', () => {
    const action = { type: createBurgerOrder.fulfilled.type, payload: order }
    const state = burgerOrderSlice.reducer(initialState, action)

    expect(state).toEqual({ ...initialState, data: order, loading: false })
  })

  it('createBurgerOrder pending', () => {
    const action = { type: createBurgerOrder.pending.type }
    const state = burgerOrderSlice.reducer(initialState, action)

    expect(state).toEqual({ ...initialState, loading: true })
  })

  it('createBurgerOrder rejected', () => {
    const action = { type: createBurgerOrder.rejected.type, payload: 'Test error' }
    const state = burgerOrderSlice.reducer(initialState, action)

    expect(state).toEqual({ ...initialState, error: 'Test error' })
  })

  it('getOrderByNumber fulfilled', () => {
    const action = { type: getOrderByNumber.fulfilled.type, payload: currentOrder }

    const state = burgerOrderSlice.reducer(initialState, action)

    expect(state).toEqual({ ...initialState, currentOrder })
  })

  it('should handle deleteBurgerOrder', () => {
    const initialStateWithData = {
      ...initialState,
      data: order,
    }
    const action = { type: burgerOrderSlice.actions.deleteBurgerOrder.type }
    const state = burgerOrderSlice.reducer(initialStateWithData, action)
    const expectedState = { ...initialState, data: null }

    expect(state).toEqual(expectedState)
  })
})
