import { createAsyncThunk } from '@reduxjs/toolkit'

import { fetchGetUser, fetchLogin, fetchLogout, fetchRegister } from '@/core/api'
import { AuthDTO, AuthResponse } from '@/utils/interfaces'
import { setIsAuthChecked, setUser } from './reducer'

export const login = createAsyncThunk(
  'user/login',
  async (authDTO: AuthDTO): Promise<AuthResponse> => {
    return await fetchLogin(authDTO)
  },
)

export const register = createAsyncThunk(
  'user/login',
  async (authDTO: AuthDTO): Promise<AuthResponse> => {
    return await fetchRegister(authDTO)
  },
)

export const logout = createAsyncThunk('user/logout', async () => {
  return await fetchLogout()
})

export const checkUserAuth = createAsyncThunk('user/checkUserAuth', async (_, { dispatch }) => {
  if (localStorage.getItem('accessToken')) {
    try {
      const data = await fetchGetUser()
      dispatch(setUser(data.user))
    } catch (error) {
      console.error('Check user auth failed:', error)
    } finally {
      dispatch(setIsAuthChecked(true))
    }
  } else {
    dispatch(setIsAuthChecked(true))
  }
})
