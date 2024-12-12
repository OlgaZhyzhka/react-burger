import { useParams } from 'react-router-dom'
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames'

import type { Order } from '@/utils/interfaces'
import { orders, OrderStatus } from '@/utils/constants'
import BurgerTotal from '@/components/burger-constructor/burger-total/burger-total'
import FeedOrderIngredients from '../feed-order-ingredients/feed-order-ingredients'
import styles from './feed-details.module.scss'

const FeedDetails = (): React.JSX.Element | null => {
  const { feedId } = useParams<{ feedId: string }>()
  const order = orders?.find((item: Order): boolean => item._id === feedId)
  console.log(feedId)
  if (!order) return null

  const { name, number, status, createdAt, ingredients } = order
  const date = new Date(createdAt)
  const orderStatus =
    status === 'done'
      ? OrderStatus.DONE
      : status === 'pending'
        ? OrderStatus.PENDING
        : OrderStatus.CANCELLED

  return (
    <article className={styles.root}>
      <span className={classNames(styles.number, 'text text_type_digits-medium')}>#{number}</span>
      <h2 className={classNames(styles.title, 'text text_type_main-medium mb-2')}>{name}</h2>
      <span className={classNames(styles.status, 'text text_type_main-default')}>
        {orderStatus}
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
        <BurgerTotal className={styles.price} currentPrice={480} />
      </div>
    </article>
  )
}

export default FeedDetails
