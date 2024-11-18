import { createSlice } from '@reduxjs/toolkit'

import { User } from '@/utils/interfaces'
import { login } from './actions'

interface UserState {
  user: User | null
  isAuthChecked: false
}

const initialState: UserState = {
  user: null,
  isAuthChecked: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload
    },
    setIsAuthChecked: (state, { payload }) => {
      state.isAuthChecked = payload
    },
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.user = payload.user
    })
  },
})

export const { setUser, setIsAuthChecked } = userSlice.actions
