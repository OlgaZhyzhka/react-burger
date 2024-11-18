import { createAsyncThunk } from '@reduxjs/toolkit'

import { fetchOrder } from '@/core/api'
import { OrderDTO } from '@/utils/interfaces'

export const createOrder = createAsyncThunk('order/createOrder', async (orderDTO: OrderDTO) => {
  return await fetchOrder(orderDTO)
})
