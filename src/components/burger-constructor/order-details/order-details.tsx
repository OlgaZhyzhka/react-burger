import { ThreeDots } from 'react-loader-spinner'
import classNames from 'classnames'

import type { OrderResponse } from '@/utils/interfaces'
import { useAppSelector } from '@/services/store'
import { getBurgerOrder } from '@/services/burger-order/selectors'
import { CheckIcon } from '@/components/base-components/check-icon'
import type { OrderDetailsProps } from './types/order-details-props'
import styles from './order-details.module.scss'

const OrderDetails = ({ loading }: OrderDetailsProps): React.JSX.Element => {
  const order: OrderResponse | null = useAppSelector(getBurgerOrder)

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
