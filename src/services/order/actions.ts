import { createAsyncThunk } from '@reduxjs/toolkit'

import { fetchOrder } from '@/core/api/api-service'
import { OrderData } from '@/utils/interfaces'

const CREATE_ORDER = 'order/createOrder'

export const createOrder = createAsyncThunk(CREATE_ORDER, async (orderData: OrderData) => {
  return await fetchOrder(orderData)
})
