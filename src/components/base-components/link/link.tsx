import { FC, PropsWithChildren } from 'react'
import classNames from 'classnames'

import { LinkProps } from './types/link'
import styles from './link.module.scss'

const Link: FC<PropsWithChildren<LinkProps>> = ({
  href,
  className,
  target,
  rel,
  children,
  onClick,
}) => (
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
