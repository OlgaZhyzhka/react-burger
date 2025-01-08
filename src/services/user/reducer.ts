import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { User } from '@/utils/interfaces'
import type { UserResponse } from '@/utils/types'
import { login, register, logout, update } from './actions'

interface UserState {
  user: User | null
  isAuthChecked: boolean
  error: string | null
}

const initialState: UserState = {
  user: null,
  isAuthChecked: false,
  error: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<User | null>) => {
      state.user = payload
    },
    setIsAuthChecked: (state, { payload }: PayloadAction<boolean>) => {
      state.isAuthChecked = payload
    },
    setError: (state, { payload }: PayloadAction<string | null>) => {
      state.error = payload
    },
  },
  selectors: {
    getUser: state => state.user,
    getIsAuthChecked: state => state.isAuthChecked,
    getError: state => state.error,
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, { payload }: PayloadAction<UserResponse>) => {
      state.user = payload.user
      state.isAuthChecked = true
      state.error = null
    })
    builder.addCase(login.rejected, (state, { payload }: PayloadAction<unknown>) => {
      state.error =
        (payload as Error).message || 'Login failed. Please check your credentials and try again.'
    })
    builder.addCase(register.fulfilled, (state, { payload }: PayloadAction<UserResponse>) => {
      state.user = payload.user
      state.isAuthChecked = true
      state.error = null
    })
    builder.addCase(register.rejected, (state, { payload }: PayloadAction<unknown>) => {
      state.error = (payload as Error).message || 'Registration failed. Please try again.'
    })
    builder.addCase(logout.fulfilled, state => {
      state.user = null
      state.error = null
    })
    builder.addCase(update.fulfilled, (state, { payload }: PayloadAction<UserResponse>) => {
      state.user = payload.user
      state.error = null
    })
  },
})

export const { setUser, setIsAuthChecked, setError } = userSlice.actions
export const { getUser, getIsAuthChecked, getError } = userSlice.selectors
