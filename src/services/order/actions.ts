import { createAsyncThunk } from '@reduxjs/toolkit'

import { fetchOrder } from '@/core/api/api-service'
import { OrderDTO } from '@/utils/interfaces'

const CREATE_ORDER = 'order/createOrder'

export const createOrder = createAsyncThunk(CREATE_ORDER, async (orderDTO: OrderDTO) => {
  return await fetchOrder(orderDTO)
})
