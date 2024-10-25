import { API_URL } from '@/utils/constants'
import { Ingredient } from '@/utils/interfaces'

export const fetchIngredients = async (): Promise<Ingredient[]> => {
  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error('Failed to fetch ingredients')
  }
  const data = await response.json()
  return data.data
}
