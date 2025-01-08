import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { Orders } from '@/utils/interfaces'
import type { WebSocketStatusType } from '@/utils/types'
import { WebSocketStatus } from '@/utils/constants'

export interface ProfileFeedState {
  status: WebSocketStatusType
  data: Orders | null
  loading: boolean
  error: unknown
}

const initialState: ProfileFeedState = {
  status: WebSocketStatus.CLOSED,
  data: null,
  loading: false,
  error: null,
}

export const profileFeedSlice = createSlice({
  name: 'profileFeed',
  initialState,
  reducers: {
    wsProfileFeedConnecting: state => {
      state.status = WebSocketStatus.CONNECTING
      state.loading = true
    },
    wsProfileFeedOpen: state => {
      state.status = WebSocketStatus.OPEN
      state.loading = false
    },
    wsProfileFeedClose: state => {
      state.status = WebSocketStatus.CLOSED
      state.loading = false
    },
    wsProfileFeedError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.loading = false
    },
    wsProfileFeedMessage: (state, { payload }: PayloadAction<Orders>) => {
      state.data = payload
      state.loading = false
    },
  },
})

export const {
  wsProfileFeedConnecting,
  wsProfileFeedOpen,
  wsProfileFeedClose,
  wsProfileFeedError,
  wsProfileFeedMessage,
} = profileFeedSlice.actions
