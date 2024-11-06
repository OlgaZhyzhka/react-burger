import { API_URL, ORDER_URL } from '@/utils/constants'
import { Ingredient, OrderBurger, OrderDTO } from '@/utils/interfaces'

export const apiConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
}

export const fetchIngredients = async (): Promise<Ingredient[]> => {
  const response = await fetch(API_URL, {
    headers: apiConfig.headers,
  })
  if (!response.ok) {
    throw new Error('Failed to fetch ingredients')
  }
  const data = await response.json()
  return data.data
}

export const fetchOrder = async (orderDTO: OrderDTO): Promise<OrderBurger> => {
  const response = await fetch(ORDER_URL, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify(orderDTO),
  })
  if (!response.ok) {
    throw new Error('Failed to fetch ingredient')
  }

  return await response.json()
}
