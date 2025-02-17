import { useMemo, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames'

import type { Order } from '@/utils/interfaces'
import { OrderStatus } from '@/utils/constants'
import { useAppDispatch, useAppSelector } from '@/services/store'
import { getProfileFeedOrdersWithTotalPrice } from '@/services/profile-feed/selectors'
import { getFeedOrdersWithTotalPrice } from '@/services/feed/selectors'
import { getOrderByNumber } from '@/services/burger-order/actions'
import { getBurgerOrderCurrentOrderWithTotalPrice } from '@/services/burger-order/selectors'
import BurgerTotal from '@/components/burger-constructor/burger-total/burger-total'
import FeedOrderIngredients from '../feed-order-ingredients/feed-order-ingredients'
import styles from './feed-details.module.scss'

const FeedDetails = (): React.JSX.Element | null => {
  const dispatch = useAppDispatch()
  const { number } = useParams<{ number: string }>()
  const orderNumber = number ? parseInt(number, 10) : null
  const feedOrders = useAppSelector(getFeedOrdersWithTotalPrice)
  const profileOrders = useAppSelector(getProfileFeedOrdersWithTotalPrice)
  const currentOrder = useAppSelector(getBurgerOrderCurrentOrderWithTotalPrice)
  const order = useMemo(() => {
    return (
      currentOrder ||
      feedOrders?.find((item: Order): boolean => item.number === orderNumber) ||
      profileOrders?.find((item: Order): boolean => item.number === orderNumber)
    )
  }, [feedOrders, profileOrders, orderNumber, currentOrder])

  useEffect(() => {
    if (!order && orderNumber) {
      dispatch(getOrderByNumber(orderNumber))
    }
  }, [order, orderNumber, dispatch])

  if (!order) return null

  const { name, number: orderNum, status, createdAt, ingredients, totalPrice } = order
  const date = new Date(createdAt)

  return (
    <article className={styles.root}>
      <span className={classNames(styles.number, 'text text_type_digits-default')}>
        #{orderNum}
      </span>
      <h2 className={classNames(styles.title, 'text text_type_main-medium mb-2')}>{name}</h2>
      <span className={classNames(styles.status, 'text text_type_main-default')}>
        {OrderStatus[status]}
      </span>
      <h2 className={classNames(styles.title, 'text text_type_main-medium mt-10 mb-4')}>Состав:</h2>
      <div className={classNames(styles.body, 'custom-scroll')}>
        <FeedOrderIngredients ingredients={ingredients} />
      </div>
      <div className={classNames(styles.footer, 'mt-8')}>
        <FormattedDate
          date={
            new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate(),
              date.getHours(),
              date.getMinutes(),
              0,
            )
          }
          className={classNames(styles.date, 'text text_type_main-default text_color_inactive')}
        />
        {totalPrice && <BurgerTotal currentPrice={totalPrice} />}
      </div>
    </article>
  )
}

export default FeedDetails
