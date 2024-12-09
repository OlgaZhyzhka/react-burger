import type { PropsWithChildren } from '@/utils/types'

export type ProtectedRouteProps = PropsWithChildren & {
  onlyUnAuth?: boolean
  children: React.JSX.Element
}
