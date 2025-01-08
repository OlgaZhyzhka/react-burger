import { Navigate, useLocation } from 'react-router-dom'
import type { Location as RouterLocation } from 'react-router'

import { ROUTES } from '@/utils/constants'
import { useAppSelector } from '@/services/store'
import { getIsAuthChecked, getUser } from '@/services/user/reducer'
import { Loader } from '@/components/base-components/loader'
import type { ProtectedRouteProps } from './types/protected-route-props'

const ProtectedRoute = ({
  children,
  onlyUnAuth = false,
}: ProtectedRouteProps): React.JSX.Element => {
  const isAuthChecked = useAppSelector(getIsAuthChecked)
  const user = useAppSelector(getUser)
  const location: RouterLocation = useLocation()

  if (!isAuthChecked) {
    return <Loader />
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to={ROUTES.login} state={{ from: location }} replace />
  }

  if (onlyUnAuth && user) {
    const { from } = (location.state as { from: Location }) || { from: { pathname: ROUTES.home } }
    return <Navigate to={from} />
  }

  return children
}

export const ProtectedRouteOnlyAuth = ProtectedRoute
export const ProtectedRouteOnlyUnAuth = (props: ProtectedRouteProps): React.JSX.Element => (
  <ProtectedRoute {...props} onlyUnAuth />
)
