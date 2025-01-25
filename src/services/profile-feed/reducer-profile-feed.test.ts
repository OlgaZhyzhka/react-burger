import { describe, expect } from '@jest/globals'

import {
  profileFeedSlice,
  initialState,
  wsProfileFeedConnecting,
  wsProfileFeedOpen,
  wsProfileFeedClose,
  wsProfileFeedError,
  wsProfileFeedMessage,
} from '@/services/profile-feed/reducer'
import { WebSocketStatus } from '@/utils/constants'
import type { Orders } from '@/utils/interfaces'

describe("'Profile Feed Reducer", () => {
  it('should init state correctly', () => {
    expect(profileFeedSlice.reducer(undefined, { type: '' })).toEqual(initialState)
  })

  it('should handle wsProfileFeedConnecting', () => {
    const nextState = profileFeedSlice.reducer(initialState, wsProfileFeedConnecting())
    expect(nextState).toEqual({
      ...initialState,
      status: WebSocketStatus.CONNECTING,
      loading: true,
    })
  })

  it('should handle wsProfileFeedOpen', () => {
    const nextState = profileFeedSlice.reducer(initialState, wsProfileFeedOpen())
    expect(nextState).toEqual({
      ...initialState,
      status: WebSocketStatus.OPEN,
      loading: false,
    })
  })

  it('should handle wsProfileFeedClose', () => {
    const nextState = profileFeedSlice.reducer(initialState, wsProfileFeedClose())
    expect(nextState).toEqual({
      ...initialState,
      status: WebSocketStatus.CLOSED,
      loading: false,
    })
  })

  it('should handle wsProfileFeedError', () => {
    const error = 'WebSocket error'
    const nextState = profileFeedSlice.reducer(initialState, wsProfileFeedError(error))
    expect(nextState).toEqual({
      ...initialState,
      error,
      loading: false,
    })
  })

  it('should handle wsProfileFeedMessage', () => {
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
    const nextState = profileFeedSlice.reducer(initialState, wsProfileFeedMessage(orders))
    expect(nextState).toEqual({
      ...initialState,
      data: orders,
      loading: false,
    })
  })
})
