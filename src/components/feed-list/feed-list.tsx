import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'

import { ROUTES } from '@/utils/constants'
import { FeedCard } from './feed-card'
import type { FeedListProps } from './types/feed-list-props'
import styles from './feed-list.module.scss'

const FeedList = ({ orders, className = '' }: FeedListProps): React.JSX.Element => {
  const location = useLocation()

  return (
    <ul className={classNames(styles.root, className)}>
      {orders.map((order, index) => (
        <li key={index} className={styles.item}>
          <Link
            to={`${ROUTES.feed}/${order._id}`}
            state={{ background: location }}
            className={styles.link}>
            <FeedCard order={order} />
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default FeedList
