import { createAsyncThunk } from '@reduxjs/toolkit'

import { fetchOrder } from '@/core/api'
import type { Order, OrderDTO, OrderResponse } from '@/utils/interfaces'
import { fetchOrderByNumber } from '@/core/api/api-service'

export const createBurgerOrder = createAsyncThunk(
  'order/createOrder',
  async (orderDTO: OrderDTO): Promise<OrderResponse> => {
    return await fetchOrder(orderDTO)
  },
)

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (orderNumber: string): Promise<Order> => {
    return await fetchOrderByNumber(orderNumber)
  },
)
