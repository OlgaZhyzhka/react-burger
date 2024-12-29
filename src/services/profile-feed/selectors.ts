import { createSelector } from 'reselect'

import type { RootState } from '@/services/store'
import type { Orders } from '@/utils/interfaces'

export const getProfileFeed = (state: RootState): Orders | null => state.profileFeed.data
export const getProfileFeedStatus = (state: RootState): string => state.profileFeed.status
export const getProfileFeedOrders = createSelector(
  (state: RootState) => state.profileFeed.data?.orders,
  orders => orders ?? [],
)
