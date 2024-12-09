import type { MouseEventHandler } from 'react'

import type { PropsWithOptionalChildren } from '@/utils/types'

export type LinkProps = PropsWithOptionalChildren & {
  href: string
  className?: string
  target?: string
  rel?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}
