import { API_URL, URLS } from '@/utils/constants'

export const apiConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
}

const checkResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'An error occurred')
  }
  return response.json()
}

export const refreshToken = async () => {
  const response = await fetch(`${API_URL}${URLS.token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  })

  const refreshData = await checkResponse(response)

  if (!refreshData.success) {
    throw new Error(refreshData.message || 'Failed to refresh token')
  }

  localStorage.setItem('refreshToken', refreshData.refreshToken)
  localStorage.setItem('accessToken', refreshData.accessToken)
  return refreshData
}

export const fetchWithRefresh = async (url: string, options: RequestInit) => {
  try {
    const res = await fetch(url, options)
    return await checkResponse(res)
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'jwt expired') {
      const refreshData = await refreshToken()
      options.headers = {
        ...options.headers,
        authorization: refreshData.accessToken,
      }
      const res = await fetch(url, options)
      return await checkResponse(res)
    } else {
      return Promise.reject(error)
    }
  }
}
