import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'

import { FeedCard } from './feed-card'
import type { FeedListProps } from './types/feed-list-props'
import styles from './feed-list.module.scss'

const FeedList = ({
  orders,
  linkTo,
  isStatus = false,
  className = '',
}: FeedListProps): React.JSX.Element => {
  const location = useLocation()

  return (
    <ul className={classNames(styles.root, className)}>
      {orders.map((order, index) => (
        <li key={index} className={styles.item}>
          <Link
            to={`${linkTo}/${order._id}`}
            state={{ background: location }}
            className={styles.link}>
            <FeedCard order={order} isStatus={isStatus} />
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default FeedList
