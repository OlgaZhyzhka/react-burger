import { API_URL, URLS } from '@/utils/constants'
import {
  AuthDTO,
  AuthResponse,
  Ingredient,
  OrderBurger,
  OrderDTO,
  UserResponse,
} from '@/utils/interfaces'
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

export const fetchLogin = async (authDTO: AuthDTO): Promise<AuthResponse> => {
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
    const response = await fetchWithRefresh(`${API_URL}${URLS.logout}`, {
      method: 'POST',
      headers: apiConfig.headers,
    })
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    return response
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

export const fetchUpdateUser = async (userDTO: AuthDTO): Promise<UserResponse> => {
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
