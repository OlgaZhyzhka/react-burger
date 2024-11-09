export const checkResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'An error occurred')
  }
  return response
}
