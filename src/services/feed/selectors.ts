import { createSelector } from 'reselect'

import type { FeedState } from '@/services/feed/reducer'
import type { Order, Orders } from '@/utils/interfaces'
import { getOrderTotalPrice } from '@/utils/helpers'
import type { RootState } from '@/services/store'
import { getMappedIngredients } from '@/services/ingredients/selectors'

export const getFeedState = (state: RootState): FeedState => state.feed
export const getFeedData = (state: RootState): Orders | null => state.feed.data
export const getFeedStatus = (state: RootState): string => state.feed.status
export const getFeedOrders = createSelector(
  (state: RootState): Order[] | undefined => state.feed.data?.orders,
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

export const getFeedOrdersWithTotalPrice = createSelector(
  [getFeedOrders, getMappedIngredients],
  (orders, ingredientMap) => {
    return orders
      .map(order => ({
        ...order,
        totalPrice: getOrderTotalPrice(ingredientMap, order),
      }))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  },
)
