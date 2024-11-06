import { createSlice } from '@reduxjs/toolkit'

import { OrderBurger } from '@/utils/interfaces'
import { createOrder } from '@/services/order/actions'

export interface OrderState {
  data: OrderBurger | null
  loading: boolean
  error: unknown
}

const initialState: OrderState = {
  data: null,
  loading: false,
  error: null,
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    deleteOrder: state => {
      state.data = null
    },
  },
  selectors: {
    getOrderState: state => state,
    getOrder: state => state.data,
  },
  extraReducers: builder => {
    builder
      .addCase(createOrder.fulfilled, (state, { payload }) => {
        state.data = payload
        state.loading = false
      })
      .addCase(createOrder.pending, state => {
        state.loading = true
      })
      .addCase(createOrder.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
  },
})

export const { getOrderState, getOrder } = orderSlice.selectors
export const { deleteOrder } = orderSlice.actions
