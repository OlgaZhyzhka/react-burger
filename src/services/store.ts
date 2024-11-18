import { combineSlices, configureStore as createStore } from '@reduxjs/toolkit'

import { burgerConstructorSlice } from '@/services/burger-constructor/reducer'
import { ingredientsSlice } from '@/services/ingredients/reducer'
import { orderSlice } from '@/services/order/reducer'
import { userSlice } from '@/services/user/reducer'

const rootReducer = combineSlices(burgerConstructorSlice, ingredientsSlice, orderSlice, userSlice)

export const configureStore = () => {
  return createStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
  })
}

export const store = configureStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
