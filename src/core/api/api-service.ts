import { API_URL, URLS } from '@/utils/constants'
import type {
  AuthDTO,
  ApiResponse,
  Ingredient,
  OrderResponse,
  OrderDTO,
  Order,
  FetchOrderByNumberResponse,
} from '@/utils/interfaces'
import type {
  ForgotPasswordDTO,
  LoginDTO,
  ResetPasswordDTO,
  UpdateUserDTO,
  UserResponse,
} from '@/utils/types'
import { fetchWithRefresh, apiConfig } from './api-utils'

export const fetchIngredients = async (): Promise<Ingredient[]> => {
  try {
    const response = await fetchWithRefresh<{ data: Ingredient[] }>(
      `${API_URL}${URLS.ingredients}`,
      {
        headers: {
          ...apiConfig.headers,
          authorization: localStorage.getItem('accessToken') || '',
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Failed to fetch ingredients:', error)
    throw error
  }
}

export const fetchOrder = async (orderDTO: OrderDTO): Promise<OrderResponse> => {
  try {
    return await fetchWithRefresh<OrderResponse>(`${API_URL}${URLS.order}`, {
      method: 'POST',
      headers: {
        ...apiConfig.headers,
        authorization: localStorage.getItem('accessToken') || '',
      },
      body: JSON.stringify(orderDTO),
    })
  } catch (error) {
    console.error('Failed to fetch order:', error)
    throw error
  }
}

export const fetchLogin = async (authDTO: LoginDTO): Promise<ApiResponse> => {
  try {
    const response = await fetchWithRefresh<ApiResponse>(`${API_URL}${URLS.login}`, {
      method: 'POST',
      headers: {
        ...apiConfig.headers,
        authorization: localStorage.getItem('accessToken') || '',
      },
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

export const fetchRegister = async (authDTO: AuthDTO): Promise<ApiResponse> => {
  try {
    const response = await fetchWithRefresh<ApiResponse>(`${API_URL}${URLS.register}`, {
      method: 'POST',
      headers: {
        ...apiConfig.headers,
        authorization: localStorage.getItem('accessToken') || '',
      },
      body: JSON.stringify(authDTO),
    })

    if (response.accessToken && response.refreshToken) {
      localStorage.setItem('accessToken', response.accessToken)
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

    await fetchWithRefresh<void>(`${API_URL}${URLS.logout}`, {
      method: 'POST',
      headers: {
        ...apiConfig.headers,
        authorization: localStorage.getItem('accessToken') || '',
      },
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
    return await fetchWithRefresh<UserResponse>(`${API_URL}${URLS.user}`, {
      headers: {
        ...apiConfig.headers,
        authorization: localStorage.getItem('accessToken') || '',
      },
    })
  } catch (error) {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    throw error
  }
}

export const fetchUpdateUserData = async (userDTO: UpdateUserDTO): Promise<UserResponse> => {
  try {
    return await fetchWithRefresh<UserResponse>(`${API_URL}${URLS.user}`, {
      method: 'PATCH',
      headers: {
        ...apiConfig.headers,
        authorization: localStorage.getItem('accessToken') || '',
      },
      body: JSON.stringify(userDTO),
    })
  } catch (error) {
    console.error('Failed to update user:', error)
    throw error
  }
}

export const fetchForgotPassword = async ({ email }: ForgotPasswordDTO): Promise<ApiResponse> => {
  try {
    return await fetchWithRefresh<ApiResponse>(`${API_URL}${URLS.passwordReset}`, {
      method: 'POST',
      headers: {
        ...apiConfig.headers,
        authorization: localStorage.getItem('accessToken') || '',
      },
      body: JSON.stringify({ email }),
    })
  } catch (error) {
    console.error('Failed to send password reset email:', error)
    throw error
  }
}

export const fetchResetPassword = async ({ password, code }: ResetPasswordDTO): Promise<void> => {
  try {
    await fetchWithRefresh<void>(`${API_URL}${URLS.passwordResetSubmit}`, {
      method: 'POST',
      headers: {
        ...apiConfig.headers,
        authorization: localStorage.getItem('accessToken') || '',
      },
      body: JSON.stringify({ password, token: code }),
    })
  } catch (error) {
    console.error('Failed to reset password:', error)
    throw error
  }
}

export const fetchOrderByNumber = async (number: number): Promise<Order> => {
  try {
    const response = await fetchWithRefresh<FetchOrderByNumberResponse>(
      `${API_URL}/orders/${number}`,
      {
        headers: {
          ...apiConfig.headers,
          authorization: localStorage.getItem('accessToken') || '',
        },
      },
    )

    return response.orders[0]
  } catch (error) {
    console.error('Failed to get order by number:', error)
    throw error
  }
}
