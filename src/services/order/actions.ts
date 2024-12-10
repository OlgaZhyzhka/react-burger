import { createAsyncThunk } from '@reduxjs/toolkit'

import { fetchOrder } from '@/core/api'
import type { OrderDTO, OrderResponse } from '@/utils/interfaces'

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderDTO: OrderDTO): Promise<OrderResponse> => {
    return await fetchOrder(orderDTO)
  },
)
