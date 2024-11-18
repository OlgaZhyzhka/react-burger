import { createAsyncThunk } from '@reduxjs/toolkit'

import { fetchLogin } from '@/core/api'
import { AuthDTO, AuthResponse } from '@/utils/interfaces'

export const login = createAsyncThunk(
  'user/login',
  async (authDTO: AuthDTO): Promise<AuthResponse> => {
    return await fetchLogin(authDTO)
  },
)
