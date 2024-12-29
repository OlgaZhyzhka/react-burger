import { useParams } from 'react-router-dom'
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames'

import type { Order } from '@/utils/interfaces'
import { OrderStatus } from '@/utils/constants'
import { useAppSelector } from '@/services/store'
import { getFeedOrders } from '@/services/feed/selectors'
import BurgerTotal from '@/components/burger-constructor/burger-total/burger-total'
import FeedOrderIngredients from '../feed-order-ingredients/feed-order-ingredients'
import styles from './feed-details.module.scss'

const FeedDetails = (): React.JSX.Element | null => {
  const { feedId, orderId } = useParams<{ feedId?: string; orderId?: string }>()
  const id = feedId || orderId
  const orders = useAppSelector(getFeedOrders)
  const order = orders?.find((item: Order): boolean => item._id === id)

  if (!order) return null

  const { name, number, status, createdAt, ingredients } = order
  const date = new Date(createdAt)

  return (
    <article className={styles.root}>
      <span className={classNames(styles.number, 'text text_type_digits-default')}>#{number}</span>
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
        <BurgerTotal currentPrice={480} />
      </div>
    </article>
  )
}

export default FeedDetails
