import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { Order, OrderResponse } from '@/utils/interfaces'
import { createBurgerOrder, getOrderByNumber } from '@/services/burger-order/actions'

export interface BurgerOrderState {
  data: OrderResponse | null
  currentOrder: Order | null
  loading: boolean
  error: unknown
}

export const initialState: BurgerOrderState = {
  data: null,
  currentOrder: null,
  loading: false,
  error: null,
}

export const burgerOrderSlice = createSlice({
  name: 'burgerOrder',
  initialState,
  reducers: {
    deleteBurgerOrder: state => {
      state.data = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createBurgerOrder.fulfilled, (state, { payload }: PayloadAction<OrderResponse>) => {
        state.data = payload
        state.loading = false
      })
      .addCase(createBurgerOrder.pending, state => {
        state.loading = true
      })
      .addCase(createBurgerOrder.rejected, (state, { payload }: PayloadAction<unknown>) => {
        state.loading = false
        state.error = payload
      })
      .addCase(getOrderByNumber.fulfilled, (state, { payload }: PayloadAction<Order>) => {
        state.currentOrder = payload
        state.loading = false
      })
  },
})

export const { deleteBurgerOrder } = burgerOrderSlice.actions
