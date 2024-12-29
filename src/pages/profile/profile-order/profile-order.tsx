import { useEffect } from 'react'
import classNames from 'classnames'

import { useAppDispatch, useAppSelector } from '@/services/store'
import { wsProfileFeedConnect, wsProfileFeedDisconnect } from '@/services/profile-feed/actions'
import { getProfileFeedOrders, getProfileFeedStatus } from '@/services/profile-feed/selectors'
import { ROUTES, WebSocketStatus, WS_URL, WS_USER_ORDERS } from '@/utils/constants'
import { FeedList } from '@/components/feed-list'
import styles from './profile-order.module.scss'
import { Loader } from '@/components/base-components/loader'

const ProfileOrder = (): React.JSX.Element | null => {
  const status = useAppSelector(getProfileFeedStatus)
  const orders = useAppSelector(getProfileFeedOrders)
  const dispatch = useAppDispatch()
  const isDisconnected = status !== WebSocketStatus.OPEN

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')?.replace('Bearer ', '')

    if (accessToken) {
      dispatch(wsProfileFeedConnect({ url: `${WS_URL}${WS_USER_ORDERS}`, token: accessToken }))
    }

    return () => {
      dispatch(wsProfileFeedDisconnect())
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
    <div className={classNames(styles.feedList, 'custom-scroll')}>
      <FeedList linkTo={ROUTES.profileOrders} orders={orders} isStatus />
    </div>
  )
}

export default ProfileOrder
