import { createAction } from '@reduxjs/toolkit'
import type { WsConnectPayload } from '@/utils/types'

export const wsConnect = createAction<WsConnectPayload, 'feed/connect'>('feed/connect')
export const wsDisconnect = createAction('feed/disconnect')
