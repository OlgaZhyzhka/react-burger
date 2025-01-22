import { expect, it } from '@jest/globals'

import { initialState, userSlice } from '@/services/user/reducer'
import { login, logout, register, update } from '@/services/user/actions'
import type { UserResponse } from '@/utils/types'

describe('User Reducer', () => {
  const userResponse: UserResponse = {
    success: true,
    user: {
      email: 'test@gmail.com',
      name: 'Olga',
    },
  }

  it('should handle login.fulfilled', async () => {
    const action = { type: login.fulfilled.type, payload: userResponse }
    const state = userSlice.reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      user: userResponse.user,
      isAuthChecked: true,
      error: null,
    })
  })

  it('should handle login.rejected', async () => {
    const action = { type: login.rejected.type, payload: 'error' }
    const state = userSlice.reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      error: 'Login failed. Please check your credentials and try again.',
    })
  })

  it('should handle register.fulfilled', () => {
    const action = { type: register.fulfilled.type, payload: userResponse }
    const state = userSlice.reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      user: userResponse.user,
      isAuthChecked: true,
      error: null,
    })
  })

  it('should handle register.rejected', () => {
    const action = { type: register.rejected.type, payload: 'error' }
    const state = userSlice.reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      error: 'Registration failed. Please try again.',
    })
  })

  it('should handle logout.fulfilled', () => {
    const action = { type: logout.fulfilled.type }
    const state = userSlice.reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      user: null,
      error: null,
    })
  })

  it('should handle update.fulfilled', () => {
    const action = { type: update.fulfilled.type, payload: userResponse }
    const state = userSlice.reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      user: userResponse.user,
      error: null,
    })
  })
})
