import classNames from 'classnames'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import type { BurgerTotalProps } from './types/burger-total-props'
import styles from './burger-total.module.scss'

const BurgerTotal = ({ currentPrice, className = '' }: BurgerTotalProps): React.JSX.Element => {
  return (
    <span className={classNames(styles.root, className, 'mt-1 mb-1')}>
      <span className="text text_type_digits-default mr-2">{currentPrice}</span>
      <CurrencyIcon type="primary" />
    </span>
  )
}

export default BurgerTotal
