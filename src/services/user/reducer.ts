import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from '@/utils/interfaces'
import { login, logout } from './actions'

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
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    },
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
  selectors: {
    getUser: state => state.user,
    getIsAuthChecked: state => state.isAuthChecked,
    getError: state => state.error,
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.user = payload.user
      state.isAuthChecked = true
      state.error = null
    })
    builder.addCase(login.rejected, (state, { error }) => {
      state.error = error.message || 'Login failed. Please check your credentials and try again.'
    })
    builder.addCase(logout.fulfilled, state => {
      state.user = null
      state.error = null
    })
  },
})

export const { setUser, setIsAuthChecked, setError } = userSlice.actions
export const { getUser, getIsAuthChecked, getError } = userSlice.selectors
