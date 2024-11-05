import { FC } from 'react'
import classNames from 'classnames'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import { BurgerTotalProps } from './types/burger-total-props'

const BurgerTotal: FC<BurgerTotalProps> = ({ currentPrice, className = '' }) => {
  return (
    <span className={classNames(className, 'mt-1 mb-1')}>
      <span className="text text_type_digits-default mr-2">{currentPrice}</span>
      <CurrencyIcon type="primary" />
    </span>
  )
}

export default BurgerTotal
