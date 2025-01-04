import { useEffect } from 'react'
import classNames from 'classnames'

import { useAppDispatch, useAppSelector } from '@/services/store'
import { wsConnect, wsDisconnect } from '@/services/feed/actions'
import {
  getFeedOrdersDone,
  getFeedOrdersPending,
  getFeedOrdersWithTotalPrice,
  getFeedStatus,
  getFeedTotal,
  getFeedTotalToday,
} from '@/services/feed/selectors'
import { ROUTES, WebSocketStatus, WS_ALL_ORDERS, WS_URL } from '@/utils/constants'
import { OrderList } from '@/components/order-list'
import { Loader } from '@/components/base-components/loader'
import { FeedList } from '@/components/feed-list'
import styles from './feed.module.scss'

const Feed = (): React.JSX.Element | null => {
  const status = useAppSelector(getFeedStatus)
  const orders = useAppSelector(getFeedOrdersWithTotalPrice)
  const total = useAppSelector(getFeedTotal)
  const totalToday = useAppSelector(getFeedTotalToday)
  const ordersDone = useAppSelector(getFeedOrdersDone)
  const ordersPending = useAppSelector(getFeedOrdersPending)
  const dispatch = useAppDispatch()

  const isDisconnected = status !== WebSocketStatus.OPEN

  useEffect(() => {
    dispatch(wsConnect({ url: `${WS_URL}${WS_ALL_ORDERS}` }))

    return () => {
      dispatch(wsDisconnect())
    }
  }, [dispatch])

  if (status === WebSocketStatus.CONNECTING) {
    return <Loader />
  }

  if (orders === null) {
    return null
  }

  if (isDisconnected) {
    return (
      <section className="page page_order container">
        <h1 className="text text_type_main-large mb-5">Ошибка подключения</h1>
      </section>
    )
  }

  return (
    <section className="page page_order container">
      <div className="row">
        <div className="col">
          <div className={classNames(styles.feed, styles.feedOrder)}>
            <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
            <div className={classNames(styles.feedList, 'custom-scroll')}>
              <FeedList linkTo={ROUTES.feed} orders={orders} />
            </div>
          </div>
        </div>
        <div className="col">
          <div className={classNames(styles.feed, styles.statistics)}>
            <h2 className={classNames(styles.readyTitle, 'text text_type_main-medium')}>Готовы:</h2>
            <OrderList
              orders={ordersDone}
              className={classNames(
                styles.readyList,
                'text text_type_digits-default list-no-style',
              )}
            />
            <h2 className={classNames(styles.inWorkTitle, 'text text_type_main-medium')}>
              В работе:
            </h2>
            <OrderList
              orders={ordersPending}
              className={classNames(
                styles.inWorkList,
                'text text_type_digits-default list-no-style',
              )}
            />
            <h2 className={classNames(styles.totalTitle, 'text text_type_main-medium')}>
              Выполнено за все время:
            </h2>
            {total && (
              <span className={classNames(styles.totalValue, 'text text_type_digits-large')}>
                {total}
              </span>
            )}
            <h2 className={classNames(styles.totalCurrentTitle, 'text text_type_main-medium')}>
              Выполнено за сегодня:
            </h2>
            {totalToday && (
              <span className={classNames(styles.totalCurrentValue, 'text text_type_digits-large')}>
                {totalToday}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Feed
