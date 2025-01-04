import { createSelector } from 'reselect'

import type { RootState } from '@/services/store'
import type { Orders } from '@/utils/interfaces'
import { getOrderTotalPrice } from '@/utils/helpers'
import { getMappedIngredients } from '@/services/ingredients/selectors'

export const getProfileFeed = (state: RootState): Orders | null => state.profileFeed.data
export const getProfileFeedStatus = (state: RootState): string => state.profileFeed.status
export const getProfileFeedOrders = createSelector(
  (state: RootState) => state.profileFeed.data?.orders,
  orders => orders ?? [],
)

export const getProfileFeedOrdersWithTotalPrice = createSelector(
  [getProfileFeedOrders, getMappedIngredients],
  (orders, ingredientMap) => {
    return orders
      .map(order => ({
        ...order,
        totalPrice: getOrderTotalPrice(ingredientMap, order),
      }))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  },
)
