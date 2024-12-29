import { createSelector } from 'reselect'

import type { Order, Orders } from '@/utils/interfaces'
import type { RootState } from '@/services/store'

export const getFeedState = (state: RootState): Orders | null => state.feed.data
export const getFeedStatus = (state: RootState): string => state.feed.status
export const getFeedOrders = createSelector(
  (state: RootState) => state.feed.data?.orders,
  orders => orders ?? [],
)
export const getFeedTotal = (state: RootState): number | undefined => state.feed.data?.total
export const getFeedTotalToday = (state: RootState): number | undefined =>
  state.feed.data?.totalToday
export const getFeedOrdersDone = createSelector([getFeedOrders], (orders: Order[]): Order[] =>
  orders.filter(order => order.status === 'done').slice(0, 20),
)
export const getFeedOrdersPending = createSelector([getFeedOrders], (orders: Order[]): Order[] =>
  orders.filter(order => order.status === 'pending').slice(0, 20),
)
