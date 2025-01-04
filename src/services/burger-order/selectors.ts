import { createSelector } from 'reselect'

import type { RootState } from '@/services/store'
import type { Order, OrderResponse } from '@/utils/interfaces'
import type { BurgerOrderState } from '@/services/burger-order/reducer'
import { getOrderTotalPrice } from '@/utils/helpers'
import { getMappedIngredients } from '@/services/ingredients/selectors'

export const getBurgerOrderState = (state: RootState): BurgerOrderState => state.burgerOrder
export const getBurgerOrder = (state: RootState): OrderResponse | null => state.burgerOrder.data
export const getBurgerOrderCurrentOrder = (state: RootState): Order | null =>
  state.burgerOrder.currentOrder

export const getBurgerOrderCurrentOrderWithTotalPrice = createSelector(
  [getBurgerOrderCurrentOrder, getMappedIngredients],
  (order, ingredientMap) => {
    return order
      ? {
          ...order,
          totalPrice: getOrderTotalPrice(ingredientMap, order),
        }
      : null
  },
)
