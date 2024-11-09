import classNames from 'classnames'

import { useAppSelector } from '@/hooks/store-hooks'
import { getOrder } from '@/services/order/reducer'
import { CheckIcon } from '@/components/base-components/check-icon'
import styles from './order-details.module.scss'

const OrderDetails = () => {
  const data = useAppSelector(getOrder)

  if (!data) return null

  const {
    order: { number },
  } = data

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
