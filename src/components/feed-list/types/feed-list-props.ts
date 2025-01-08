import type { Order } from '@/utils/interfaces'

export type FeedListProps = {
  orders: Order[]
  linkTo: string
  isStatus?: boolean
  className?: string
}
