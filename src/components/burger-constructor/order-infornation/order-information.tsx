import classNames from 'classnames'

import checkIcon from './check.svg'
import styles from './order-information.module.scss'

const OrderInformation = () => {
  return (
    <div className={styles.root}>
      <span className={classNames(styles.title, 'text text_type_digits-large')}>034536</span>
      <span className={classNames(styles.subtitle, 'text text_type_main-medium')}>
        идентификатор заказа
      </span>
      <img className={styles.icon} src={checkIcon} alt="check" />
      <p>Ваш заказ начали готовить</p>
      <p className={styles.description}>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

export default OrderInformation
