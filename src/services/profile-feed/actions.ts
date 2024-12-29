import { createAction } from '@reduxjs/toolkit'
import type { WsConnectPayload } from '@/utils/types'

export const wsProfileFeedConnect = createAction<WsConnectPayload, 'profile-feed/connect'>(
  'profile-feed/connect',
)

export const wsProfileFeedDisconnect = createAction('profile-feed/disconnect')
