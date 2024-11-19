import { FC } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import classNames from 'classnames'

import { OrderBurger } from '@/utils/interfaces'
import { useAppSelector } from '@/services/store'
import { getOrder } from '@/services/order/reducer'
import { CheckIcon } from '@/components/base-components/check-icon'
import styles from './order-details.module.scss'

type OrderDetailsProps = {
  loading: boolean
}

const OrderDetails: FC<OrderDetailsProps> = ({ loading }) => {
  const order: OrderBurger | null = useAppSelector(getOrder)

  if (loading && !order) {
    return (
      <div className={styles.loader}>
        <h2>Оформляем ваш заказ...</h2>
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#4c4cff"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    )
  }

  const number = order?.order.number

  return (
    <div className={styles.root}>
      <span className={classNames(styles.title, 'text text_type_digits-large')}>{number}</span>
      <span className={classNames(styles.subtitle, 'text text_type_main-medium')}>
        идентификатор заказа
      </span>
      <CheckIcon className={styles.icon} />
      <p>Ваш заказ начали готовить</p>
      <p className={styles.description}>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

export default OrderDetails
