import { FC } from 'react'
import classNames from 'classnames'

import checkIcon from './check.svg'
import { OrderDetailsProps } from './types/order-details'
import styles from './order-details.module.scss'

const OrderDetails: FC<OrderDetailsProps> = ({ id }) => {
  return (
    <div className={styles.root}>
      <span className={classNames(styles.title, 'text text_type_digits-large')}>{id}</span>
      <span className={classNames(styles.subtitle, 'text text_type_main-medium')}>
        идентификатор заказа
      </span>
      <img className={styles.icon} src={checkIcon} alt="check" />
      <p>Ваш заказ начали готовить</p>
      <p className={styles.description}>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

export default OrderDetails
