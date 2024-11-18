import { FC } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { ROUTES } from '@/utils/constants'
import { useAppSelector } from '@/services/store'
import { getIsAuthChecked, getUser } from '@/services/user/reducer'
import { Loader } from '@/components/base-components/loader'
import { ProtectedRouteProps } from './types/protected-route-props'

const ProtectedRoute: FC<ProtectedRouteProps> = ({ component, onlyUnAuth = false }) => {
  const isAuthChecked = useAppSelector(getIsAuthChecked)
  const user = useAppSelector(getUser)
  const location = useLocation()

  if (!isAuthChecked) {
    return <Loader />
  }

  if (!onlyUnAuth && !user) {
    console.log('only for auth')
    return <Navigate to={ROUTES.login} state={{ from: location }} replace />
  }

  if (onlyUnAuth && user) {
    console.log('only for unauth', location)
    const { from } = (location.state as { from: Location }) || { from: { pathname: ROUTES.home } }
    return <Navigate to={from} />
  }

  return component
}

export const ProtectedRouteOnlyAuth = ProtectedRoute
export const ProtectedRouteOnlyUnAuth = (props: ProtectedRouteProps) => (
  <ProtectedRoute {...props} onlyUnAuth />
)
