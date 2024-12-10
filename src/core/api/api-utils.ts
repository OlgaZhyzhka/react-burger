import { API_URL, URLS } from '@/utils/constants'
import type { ApiResponse, ErrorResponse } from '@/utils/interfaces'

export const apiConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
}

const checkResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData: ErrorResponse = (await response.json()) as ErrorResponse
    throw new Error(errorData.message || 'An error occurred')
  }
  return (await response.json()) as T
}

export const refreshToken = async (): Promise<ApiResponse> => {
  const response = await fetch(`${API_URL}${URLS.token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  })

  const refreshData = await checkResponse<ApiResponse>(response)

  if (!refreshData.success) {
    throw new Error(refreshData.message || 'Failed to refresh token')
  }

  localStorage.setItem('refreshToken', refreshData.refreshToken)
  localStorage.setItem('accessToken', refreshData.accessToken)
  return refreshData
}

export const fetchWithRefresh = async <T>(url: string, options: RequestInit): Promise<T> => {
  try {
    const res = await fetch(url, options)
    return await checkResponse<T>(res)
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'jwt expired') {
      const refreshData = await refreshToken()
      options.headers = {
        ...options.headers,
        authorization: refreshData.accessToken,
      }
      const res = await fetch(url, options)
      return await checkResponse<T>(res)
    } else {
      return Promise.reject(error)
    }
  }
}
