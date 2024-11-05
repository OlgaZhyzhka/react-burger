import { MouseEventHandler } from 'react'

export type LinkProps = {
  href: string
  className?: string
  target?: string
  rel?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}
