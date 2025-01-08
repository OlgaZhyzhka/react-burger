import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  fetchGetUser,
  fetchLogin,
  fetchLogout,
  fetchRegister,
  fetchUpdateUserData,
} from '@/core/api'
import type { AuthDTO, ApiResponse } from '@/utils/interfaces'
import type { LoginDTO, UpdateUserDTO, UserResponse } from '@/utils/types'
import { setIsAuthChecked, setUser } from './reducer'

export const login = createAsyncThunk(
  'user/login',
  async (authDTO: LoginDTO): Promise<ApiResponse> => {
    return await fetchLogin(authDTO)
  },
)

export const register = createAsyncThunk(
  'user/register',
  async (authDTO: AuthDTO): Promise<ApiResponse> => {
    return await fetchRegister(authDTO)
  },
)

export const logout = createAsyncThunk('user/logout', async (): Promise<void> => {
  return await fetchLogout()
})

export const update = createAsyncThunk(
  'user/update',
  async (userData: UpdateUserDTO): Promise<UserResponse> => {
    return await fetchUpdateUserData(userData)
  },
)

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }): Promise<void> => {
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
  },
)
