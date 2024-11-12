import { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import { ErrorBoundary } from '@/core/error-boundary'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks'
import { loadIngredients } from '@/services/ingredients/actions'
import { getIngredientsState } from '@/services/ingredients/selectors'
import { Home } from '@/pages/home'
import { NotFound404 } from '@/pages/not-found-404'
import { AppHeader } from '@/components/app-header'
import { Loader } from '@/components/base-components/loader'
import { Modal } from '@/components/modal'
import { IngredientDetails } from '@/components/burger-ingredients/ingredient-details'

const App = () => {
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector(getIngredientsState)
  const location = useLocation()
  const navigate = useNavigate()
  const background = location.state && location.state.background

  const handleModalClose = () => {
    navigate(-1)
  }

  useEffect(() => {
    dispatch(loadIngredients())
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <ErrorBoundary>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        <Route path="/ingredients/:ingredientId" element={<IngredientDetails />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
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
