import { combineSlices, configureStore as createStore } from '@reduxjs/toolkit'

import { ingredientSlice } from '@/services/ingredient/reducer'
import { burgerConstructorSlice } from '@/services/burger-constructor/reducer'
import { ingredientsSlice } from '@/services/ingredients/reducer'
import { orderSlice } from '@/services/order/reducer'

const rootReducer = combineSlices(
  burgerConstructorSlice,
  ingredientsSlice,
  ingredientSlice,
  orderSlice,
)

export const configureStore = () => {
  return createStore({
    reducer: rootReducer,
    // preloadedState: null,
    devTools: process.env.NODE_ENV !== 'production',
  })
}

export const store = configureStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
