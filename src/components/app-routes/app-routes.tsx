import { FC } from 'react'
import { Routes, Route } from 'react-router-dom'

import { ROUTES } from '@/utils/constants'
import { Home } from '@/pages/home'
import { NotFound404 } from '@/pages/not-found-404'
import { Login } from '@/pages/login'
import { Register } from '@/pages/register'
import { ForgotPassword } from '@/pages/forgot-password'
import { ResetPassword } from '@/pages/reset-password'
import { Profile } from '@/pages/profile'
import { OrderFeed } from '@/pages/order-feed'
import { IngredientDetails } from '@/components/burger-ingredients/ingredient-details'
import { ProtectedRouteOnlyAuth, ProtectedRouteOnlyUnAuth } from '@/components/protected-route'
import { AppRoutesProps } from './types/app-routes-props'

const AppRoutes: FC<AppRoutesProps> = ({ location, background }) => (
  <Routes location={background || location}>
    <Route path={ROUTES.home} element={<Home />} />
    <Route path={ROUTES.login} element={<ProtectedRouteOnlyUnAuth component={<Login />} />} />
    <Route path={ROUTES.profile} element={<ProtectedRouteOnlyAuth component={<Profile />} />} />
    <Route path={ROUTES.orderFeed} element={<ProtectedRouteOnlyAuth component={<OrderFeed />} />} />
    <Route path={ROUTES.register} element={<ProtectedRouteOnlyUnAuth component={<Register />} />} />
    <Route
      path={ROUTES.forgotPassword}
      element={<ProtectedRouteOnlyUnAuth component={<ForgotPassword />} />}
    />
    <Route
      path={ROUTES.resetPassword}
      element={<ProtectedRouteOnlyUnAuth component={<ResetPassword />} />}
    />
    <Route path={ROUTES.ingredient} element={<IngredientDetails />} />
    <Route path={ROUTES.notFound} element={<NotFound404 />} />
  </Routes>
)

export default AppRoutes
