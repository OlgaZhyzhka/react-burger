import { describe, expect } from '@jest/globals'

import {
  feedSlice,
  initialState,
  wsClose,
  wsConnecting,
  wsError,
  wsMessage,
  wsOpen,
} from '@/services/feed/reducer'
import { WebSocketStatus } from '@/utils/constants'
import type { Orders } from '@/utils/interfaces'

describe('Feed Reducer', () => {
  it('should init state correctly', () => {
    expect(feedSlice.reducer(undefined, { type: '' })).toEqual(initialState)
  })

  it('should handle wsConnecting', () => {
    const nextState = feedSlice.reducer(initialState, wsConnecting())
    expect(nextState).toEqual({
      ...initialState,
      status: WebSocketStatus.CONNECTING,
      loading: true,
    })
  })

  it('should handle wsOpen', () => {
    const nextState = feedSlice.reducer(initialState, wsOpen())
    expect(nextState).toEqual({
      ...initialState,
      status: WebSocketStatus.OPEN,
      loading: false,
    })
  })

  it('should handle wsClose', () => {
    const nextState = feedSlice.reducer(initialState, wsClose())
    expect(nextState).toEqual({
      ...initialState,
      status: WebSocketStatus.CLOSED,
      loading: false,
    })
  })

  it('should handle wsError', () => {
    const error = 'WebSocket error'
    const nextState = feedSlice.reducer(initialState, wsError(error))
    expect(nextState).toEqual({
      ...initialState,
      error,
      loading: false,
    })
  })

  it('should handle wsMessage', () => {
    const orders: Orders = {
      success: true,
      orders: [
        {
          _id: '67916170133acd001be4c2d4',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa0943',
          ],
          status: 'done',
          name: 'Краторный space бургер',
          createdAt: '2025-01-22T21:21:52.989Z',
          updatedAt: '2025-01-22T21:21:55.444Z',
          number: 66549,
        },
      ],
      total: 100,
      totalToday: 10,
    }
    const nextState = feedSlice.reducer(initialState, wsMessage(orders))
    expect(nextState).toEqual({
      ...initialState,
      data: orders,
      loading: false,
    })
  })
})
