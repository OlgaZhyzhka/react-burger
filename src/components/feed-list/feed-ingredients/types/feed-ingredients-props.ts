import type { Ingredient } from '@/utils/interfaces'

export type FeedIngredientsProps = {
  ingredients: Ingredient[]
  maxVisibleItemCount?: number
  className?: string
}
