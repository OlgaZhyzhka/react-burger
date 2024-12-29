import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { OrderResponse } from '@/utils/interfaces'
import { createBurgerOrder } from '@/services/burger-order/actions'

export interface BurgerOrderState {
  data: OrderResponse | null
  loading: boolean
  error: unknown
}

const initialState: BurgerOrderState = {
  data: null,
  loading: false,
  error: null,
}

export const burgerOrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    deleteBurgerOrder: state => {
      state.data = null
    },
  },
  selectors: {
    getBurgerOrderState: state => state,
    getBurgerOrder: state => state.data,
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
  },
})

export const { getBurgerOrderState, getBurgerOrder } = burgerOrderSlice.selectors
export const { deleteBurgerOrder } = burgerOrderSlice.actions
