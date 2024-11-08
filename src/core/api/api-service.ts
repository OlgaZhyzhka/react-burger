import { API_URL, ORDER_URL } from '@/utils/constants'
import { Ingredient, OrderBurger, OrderDTO } from '@/utils/interfaces'
import { checkResponse } from './api-utils'

export const apiConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
}

export const fetchIngredients = async (): Promise<Ingredient[]> => {
  const response = await fetch(API_URL, {
    headers: apiConfig.headers,
  })
  await checkResponse(response)
  const data = await response.json()
  return data.data
}

export const fetchOrder = async (orderDTO: OrderDTO): Promise<OrderBurger> => {
  const response = await fetch(ORDER_URL, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify(orderDTO),
  })
  await checkResponse(response)
  return await response.json()
}
