import { API_URL, URLS } from '@/utils/constants'
import { AuthDTO, AuthResponse, Ingredient, OrderBurger, OrderDTO } from '@/utils/interfaces'
import {
  ForgotPasswordDTO,
  LoginDTO,
  ResetPasswordDTO,
  UpdateUserDTO,
  UserResponse,
} from '@/utils/types'
import { fetchWithRefresh, apiConfig } from './api-utils'

export const fetchIngredients = async (): Promise<Ingredient[]> => {
  try {
    const response = await fetchWithRefresh(`${API_URL}${URLS.ingredients}`, {
      headers: apiConfig.headers,
    })
    return response.data
  } catch (error) {
    console.error('Failed to fetch ingredients:', error)
    throw error
  }
}

export const fetchOrder = async (orderDTO: OrderDTO): Promise<OrderBurger> => {
  try {
    return await fetchWithRefresh(`${API_URL}${URLS.order}`, {
      method: 'POST',
      headers: apiConfig.headers,
      body: JSON.stringify(orderDTO),
    })
  } catch (error) {
    console.error('Failed to fetch order:', error)
    throw error
  }
}

export const fetchLogin = async (authDTO: LoginDTO): Promise<AuthResponse> => {
  try {
    const response = await fetchWithRefresh(`${API_URL}${URLS.login}`, {
      method: 'POST',
      headers: apiConfig.headers,
      body: JSON.stringify(authDTO),
    })

    if (response.accessToken && response.refreshToken) {
      localStorage.setItem('accessToken', response.accessToken)
      localStorage.setItem('refreshToken', response.refreshToken)
    }

    return response
  } catch (error) {
    console.error('Login failed:', error)
    throw error
  }
}

export const fetchRegister = async (authDTO: AuthDTO): Promise<AuthResponse> => {
  try {
    const response = await fetchWithRefresh(`${API_URL}${URLS.register}`, {
      method: 'POST',
      headers: apiConfig.headers,
      body: JSON.stringify(authDTO),
    })

    if (response.accessToken && response.refreshToken) {
      localStorage.setItem('accessToken', response.accessToken)
      localStorage.setItem('refreshToken', response.refreshToken)
    }

    return response
  } catch (error) {
    console.error('Registration failed:', error)
    throw error
  }
}

export const fetchLogout = async (): Promise<void> => {
  try {
    const token = localStorage.getItem('refreshToken')

    if (!token) {
      throw new Error('No refresh token found')
    }

    await fetchWithRefresh(`${API_URL}${URLS.logout}`, {
      method: 'POST',
      headers: apiConfig.headers,
      body: JSON.stringify({ token }),
    })
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  } catch (error) {
    console.error('Logout failed:', error)
    throw error
  }
}

export const fetchGetUser = async (): Promise<UserResponse> => {
  try {
    return await fetchWithRefresh(`${API_URL}${URLS.user}`, {
      headers: apiConfig.headers,
    })
  } catch (error) {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    throw error
  }
}

export const fetchUpdateUserData = async (userDTO: UpdateUserDTO): Promise<UserResponse> => {
  try {
    return await fetchWithRefresh(`${API_URL}${URLS.user}`, {
      method: 'PATCH',
      headers: apiConfig.headers,
      body: JSON.stringify(userDTO),
    })
  } catch (error) {
    console.error('Failed to update user:', error)
    throw error
  }
}

export const fetchForgotPassword = async ({ email }: ForgotPasswordDTO): Promise<void> => {
  try {
    return await fetchWithRefresh(`${API_URL}${URLS.passwordReset}`, {
      method: 'POST',
      headers: apiConfig.headers,
      body: JSON.stringify({ email }),
    })
  } catch (error) {
    console.error('Failed to send password reset email:', error)
    throw error
  }
}

export const fetchResetPassword = async ({ password, code }: ResetPasswordDTO): Promise<void> => {
  try {
    await fetchWithRefresh(`${API_URL}${URLS.passwordResetSubmit}`, {
      method: 'POST',
      headers: apiConfig.headers,
      body: JSON.stringify({ password, token: code }),
    })
  } catch (error) {
    console.error('Failed to reset password:', error)
    throw error
  }
}
