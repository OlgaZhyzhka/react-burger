import { FC } from 'react'
import classNames from 'classnames'

import { CheckIcon } from '@/components/base-components/check-icon'
import { OrderDetailsProps } from './types/order-details-props'
import styles from './order-details.module.scss'

const OrderDetails: FC<OrderDetailsProps> = ({ id }) => {
  return (
    <div className={styles.root}>
      <span className={classNames(styles.title, 'text text_type_digits-large')}>{id}</span>
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
