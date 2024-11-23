import { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import { ErrorBoundary } from '@/core/error-boundary'
import { useAppDispatch, useAppSelector } from '@/services/store'
import { loadIngredients } from '@/services/ingredients/actions'
import { getIngredientsState } from '@/services/ingredients/selectors'
import { checkUserAuth } from '@/services/user/actions'
import { ROUTES } from '@/utils/constants'
import { AppHeader } from '@/components/app-header'
import { Loader } from '@/components/base-components/loader'
import { Modal } from '@/components/modal'
import { IngredientDetails } from '@/components/burger-ingredients/ingredient-details'
import { AppRoutes } from '@/components/app-routes'

const App = () => {
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector(getIngredientsState)
  const location = useLocation()
  const navigate = useNavigate()
  const background = (location.state as { background?: Location }) && location.state.background

  const handleModalClose = () => {
    navigate(-1)
  }

  useEffect(() => {
    dispatch(checkUserAuth())
    dispatch(loadIngredients())
  }, [dispatch])

  if (loading) {
    return <Loader />
  }

  return (
    <ErrorBoundary>
      <AppHeader />
      <AppRoutes location={location} background={background} />

      {background && (
        <Routes>
          <Route
            path={ROUTES.ingredient}
            element={
              <Modal onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </ErrorBoundary>
  )
}

export default App
