import type {
  Middleware,
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
} from '@reduxjs/toolkit'
import type { RootState } from '@/services/store'
import { refreshToken } from '@/core/api/api-utils'
import { ERROR_TOKEN, RECONNECT_PERIOD } from '@/utils/constants'
import type { WsConnectPayload } from '@/utils/types'

export type WsActionTypes<S, R> = {
  onError: ActionCreatorWithPayload<string>
  connect: ActionCreatorWithPayload<WsConnectPayload>
  onMessage: ActionCreatorWithPayload<R>
  disconnect: ActionCreatorWithoutPayload
  sendMessage?: ActionCreatorWithPayload<S>
  onConnecting?: ActionCreatorWithoutPayload
  onOpen?: ActionCreatorWithoutPayload
  onClose?: ActionCreatorWithoutPayload
}

export const socketMiddleware = <S, R>(
  wsActions: WsActionTypes<S, R>,
  withTokenRefresh: boolean = false,
): Middleware<NonNullable<unknown>, RootState> => {
  return store => {
    let ws: WebSocket | null = null
    let isConnected = false
    let reconnectTimer = 0

    const { connect, disconnect, sendMessage, onConnecting, onOpen, onClose, onMessage, onError } =
      wsActions
    return next => action => {
      const { dispatch } = store

      if (connect.match(action)) {
        const { url, token }: WsConnectPayload = action.payload

        ws = token ? new WebSocket(`${url}?token=${token}`) : new WebSocket(`${url}`)
        isConnected = true
        onConnecting && dispatch(onConnecting())

        ws.onopen = (): void => {
          onOpen && store.dispatch(onOpen())
        }

        ws.onerror = (): void => {
          dispatch(onError('WebSocket error'))
        }

        ws.onclose = (): void => {
          onClose && dispatch(onClose())

          if (isConnected) {
            reconnectTimer = window.setTimeout(() => {
              dispatch(connect({ url, token }))
            }, RECONNECT_PERIOD)
          }
        }

        ws.onmessage = (event: MessageEvent<string>): void => {
          const { data } = event

          try {
            const parsedData = JSON.parse(data) as R & { message?: string }

            if (withTokenRefresh && parsedData.message === ERROR_TOKEN) {
              refreshToken()
                .then(refreshData => {
                  const wssUrl = new URL(url)
                  const token = refreshData.accessToken.replace('Bearer ', '')
                  wssUrl.searchParams.set('token', token)
                  dispatch(connect({ url: wssUrl.toString(), token }))
                })
                .catch((error: unknown) => {
                  dispatch(onError((error as { message: string }).message))
                })

              dispatch(disconnect())

              return
            }

            dispatch(onMessage(parsedData))
          } catch (error) {
            dispatch(onError((error as Error).message))
          }
        }
      }

      if (ws && sendMessage && sendMessage.match(action)) {
        try {
          ws.send(JSON.stringify(action.payload))
        } catch (error) {
          dispatch(onError((error as Error).message))
        }
      }

      if (ws && disconnect && disconnect.match(action)) {
        clearTimeout(reconnectTimer)
        isConnected = false
        reconnectTimer = 0

        if (ws.readyState === WebSocket.OPEN) {
          ws.close()
        }

        ws = null
      }

      next(action)
    }
  }
}
