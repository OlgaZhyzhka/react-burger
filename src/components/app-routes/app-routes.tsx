import { FC } from 'react'
import { Routes, Route } from 'react-router-dom'

import { ROUTES } from '@/utils/constants'
// import { Home } from '@/pages/home'
import { NotFound404 } from '@/pages/not-found-404'
import { Login } from '@/pages/login'
import { Register } from '@/pages/register'
import { ForgotPassword } from '@/pages/forgot-password'
import { ResetPassword } from '@/pages/reset-password'
import { Profile } from '@/pages/profile'
import { IngredientDetails } from '@/components/burger-ingredients/ingredient-details'
import { AppRoutesProps } from './types/app-routes-props'

const AppRoutes: FC<AppRoutesProps> = ({ location, background }) => (
  <Routes location={background || location}>
    <Route path={ROUTES.home} element={<Login />} />
    <Route path={ROUTES.login} element={<Login />} />
    <Route path={ROUTES.register} element={<Profile />} />
    <Route path={ROUTES.profile} element={<Register />} />
    <Route path={ROUTES.forgotPassword} element={<ForgotPassword />} />
    <Route path={ROUTES.resetPassword} element={<ResetPassword />} />
    <Route path={ROUTES.ingredient} element={<IngredientDetails />} />
    <Route path={ROUTES.notFound} element={<NotFound404 />} />
  </Routes>
)

export default AppRoutes