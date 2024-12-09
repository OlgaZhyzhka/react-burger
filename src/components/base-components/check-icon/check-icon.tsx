import checkIcon from './check.svg'
import type { CheckIconProps } from './types/check-icon-props'

const CheckIcon = ({ className = '' }: CheckIconProps): React.JSX.Element => (
  <img className={className} src={checkIcon} alt="check" />
)

export default CheckIcon
