import { combineSlices, configureStore as createStore } from '@reduxjs/toolkit'
import type { Store } from '@reduxjs/toolkit'
import { useDispatch, useSelector, useStore } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

import { burgerConstructorSlice } from '@/services/burger-constructor/reducer'
import { ingredientsSlice } from '@/services/ingredients/reducer'
import { orderSlice } from '@/services/order/reducer'
import { userSlice } from '@/services/user/reducer'

const rootReducer = combineSlices(burgerConstructorSlice, ingredientsSlice, orderSlice, userSlice)

export const configureStore = (): Store<ReturnType<typeof rootReducer>> => {
  return createStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
  })
}

export const store = configureStore()
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch: () => AppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => AppStore = useStore
