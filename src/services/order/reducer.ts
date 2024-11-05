import { createSlice } from '@reduxjs/toolkit'

import { OrderBurger } from '@/utils/interfaces'
import { createOrder } from '@/services/order/actions'

export interface OrderState {
  order: OrderBurger | null
}

const initialState: OrderState = {
  order: null,
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.order = action.payload
    })
  },
})
