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

/* eslint-disable @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type */
export const configureStore = () => {
  return createStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
  })
}
/* eslint-enable @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type */

export const store = configureStore()
