import classNames from 'classnames'

import styles from './order-list.module.scss'
import type { OrderListProps } from './types/order-list-props'

const OrderList = ({ orders, className = '' }: OrderListProps): React.JSX.Element => {
  return (
    <ul className={classNames(styles.root, className)}>
      {orders.map((order, index) => (
        <li key={index} className={styles.item}>
          {order.number}
        </li>
      ))}
    </ul>
  )
}

export default OrderList
