import { combineSlices, configureStore as createStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

import { burgerConstructorSlice } from '@/services/burger-constructor/reducer'
import { ingredientsSlice } from '@/services/ingredients/reducer'
import { burgerOrderSlice } from '@/services/burger-order/reducer'
import { userSlice } from '@/services/user/reducer'
import {
  feedSlice,
  wsClose,
  wsConnecting,
  wsError,
  wsMessage,
  wsOpen,
} from '@/services/feed/reducer'
import { wsConnect, wsDisconnect } from '@/services/feed/actions'
import { socketMiddleware } from '@/services/middlware/socketMiddleware'
import { wsProfileFeedConnect, wsProfileFeedDisconnect } from '@/services/profile-feed/actions'
import {
  profileFeedSlice,
  wsProfileFeedClose,
  wsProfileFeedConnecting,
  wsProfileFeedError,
  wsProfileFeedMessage,
  wsProfileFeedOpen,
} from '@/services/profile-feed/reducer'

const rootReducer = combineSlices(
  burgerConstructorSlice,
  ingredientsSlice,
  burgerOrderSlice,
  userSlice,
  feedSlice,
  profileFeedSlice,
)

const feedMiddleware = socketMiddleware({
  connect: wsConnect,
  disconnect: wsDisconnect,
  onError: wsError,
  onMessage: wsMessage,
  onOpen: wsOpen,
  onClose: wsClose,
  onConnecting: wsConnecting,
})

const profileFeedMiddleware = socketMiddleware(
  {
    connect: wsProfileFeedConnect,
    disconnect: wsProfileFeedDisconnect,
    onError: wsProfileFeedError,
    onOpen: wsProfileFeedOpen,
    onClose: wsProfileFeedClose,
    onMessage: wsProfileFeedMessage,
    onConnecting: wsProfileFeedConnecting,
  },
  true,
)

export const store = createStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(feedMiddleware, profileFeedMiddleware),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
