import { FC, MouseEventHandler, PropsWithChildren } from 'react'
import classNames from 'classnames'

import styles from './link.module.scss'

type LinkProps = {
  href: string
  className?: string
  target?: string
  rel?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

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
