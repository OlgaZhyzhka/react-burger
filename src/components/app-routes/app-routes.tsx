import { Routes, Route } from 'react-router-dom'

import { ROUTES } from '@/utils/constants'
import { Home } from '@/pages/home'
import { NotFound404 } from '@/pages/not-found-404'
import { Login } from '@/pages/login'
import { Register } from '@/pages/register'
import { ForgotPassword } from '@/pages/forgot-password'
import { ResetPassword } from '@/pages/reset-password'
import { Profile } from '@/pages/profile'
import { Feed } from '@/pages/feed'
import { ProfileInfo } from '@/pages/profile/profile-info'
import { ProfileOrder } from '@/pages/profile/profile-order'
import { IngredientDetails } from '@/components/burger-ingredients/ingredient-details'
import { FeedDetails } from '@/components/feed-list/feed-details'
import { ProtectedRouteOnlyAuth, ProtectedRouteOnlyUnAuth } from '@/components/protected-route'
import type { AppRoutesProps } from './types/app-routes-props'

const AppRoutes = ({ location, background }: AppRoutesProps): React.JSX.Element => (
  <Routes location={background || location}>
    <Route path={ROUTES.home} element={<Home />} />
    <Route path={ROUTES.login} element={<ProtectedRouteOnlyUnAuth children={<Login />} />} />
    <Route path={ROUTES.profile} element={<ProtectedRouteOnlyAuth children={<Profile />} />}>
      <Route index element={<ProfileInfo />} />
      <Route path={ROUTES.profileOrders} element={<ProfileOrder />} />
    </Route>
    <Route path={ROUTES.feed} element={<Feed />} />
    <Route path={ROUTES.register} element={<ProtectedRouteOnlyUnAuth children={<Register />} />} />
    <Route
      path={ROUTES.forgotPassword}
      element={<ProtectedRouteOnlyUnAuth children={<ForgotPassword />} />}
    />
    <Route
      path={ROUTES.resetPassword}
      element={<ProtectedRouteOnlyUnAuth children={<ResetPassword />} />}
    />
    <Route
      path={ROUTES.ingredient}
      element={
        <div className="page page_center page_modal">
          <IngredientDetails />
        </div>
      }
    />
    <Route
      path={ROUTES.feedOrder}
      element={
        <div className="page page_center page_modal">
          <FeedDetails />
        </div>
      }
    />
    <Route
      path={ROUTES.profileOrder}
      element={
        <div className="page page_center page_modal">
          <FeedDetails />
        </div>
      }
    />
    <Route path={ROUTES.notFound} element={<NotFound404 />} />
  </Routes>
)

export default AppRoutes
