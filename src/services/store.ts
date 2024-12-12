import { combineSlices, configureStore as createStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

import { burgerConstructorSlice } from '@/services/burger-constructor/reducer'
import { ingredientsSlice } from '@/services/ingredients/reducer'
import { orderSlice } from '@/services/order/reducer'
import { userSlice } from '@/services/user/reducer'

const rootReducer = combineSlices(burgerConstructorSlice, ingredientsSlice, orderSlice, userSlice)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export const store = createStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
})
