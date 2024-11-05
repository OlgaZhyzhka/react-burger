import { FC } from 'react'

import checkIcon from './check.svg'
import { CheckIconProps } from './types/check-icon-props'

const CheckIcon: FC<CheckIconProps> = ({ className = '' }) => (
  <img className={className} src={checkIcon} alt="check" />
)

export default CheckIcon
