import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { Orders } from '@/utils/interfaces'
import type { WebSocketStatusType } from '@/utils/types'
import { WebSocketStatus } from '@/utils/constants'

export interface FeedState {
  status: WebSocketStatusType
  data: Orders | null
  loading: boolean
  error: unknown
}

export const initialState: FeedState = {
  status: WebSocketStatus.CLOSED,
  data: null,
  loading: false,
  error: null,
}

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    wsConnecting: state => {
      state.status = WebSocketStatus.CONNECTING
      state.loading = true
    },
    wsOpen: state => {
      state.status = WebSocketStatus.OPEN
      state.loading = false
    },
    wsClose: state => {
      state.status = WebSocketStatus.CLOSED
      state.loading = false
    },
    wsError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.loading = false
    },
    wsMessage: (state, { payload }: PayloadAction<Orders>) => {
      state.data = payload
      state.loading = false
    },
  },
})

export const { wsConnecting, wsOpen, wsClose, wsError, wsMessage } = feedSlice.actions
