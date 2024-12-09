import classNames from 'classnames'

import type { LinkProps } from './types/link-props.ts'
import styles from './link.module.scss'

const Link = ({
  href,
  className,
  target,
  rel,
  children,
  onClick,
}: LinkProps): React.JSX.Element => (
  <a
    href={href}
    className={classNames(styles.link, className || '')}
    target={target}
    rel={rel}
    onClick={onClick}>
    {children}
  </a>
)

export default Link
