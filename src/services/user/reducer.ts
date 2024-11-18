import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from '@/utils/interfaces'
import { login, logout } from './actions'

interface UserState {
  user: User | null
  isAuthChecked: boolean
}

const initialState: UserState = {
  user: null,
  isAuthChecked: false,
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
  },
  selectors: {
    getUser: state => state.user,
    getIsAuthChecked: state => state.isAuthChecked,
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.user = payload.user
      state.isAuthChecked = true
    })
    builder.addCase(logout.fulfilled, state => {
      state.user = null
    })
  },
})

export const { setUser, setIsAuthChecked } = userSlice.actions
export const { getUser, getIsAuthChecked } = userSlice.selectors
