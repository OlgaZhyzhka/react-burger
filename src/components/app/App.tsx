import { useEffect } from 'react'

import { ErrorBoundary } from '@/core/error-boundary'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks'
import { loadIngredients } from '@/services/ingredients/actions'
import { getIngredientsState } from '@/services/ingredients/selectors'
import { MainPage } from '@/pages/main-page'
import { AppHeader } from '@/components/app-header'
import { Loader } from '@/components/base-components/loader'

const App = () => {
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector(getIngredientsState)

  useEffect(() => {
    dispatch(loadIngredients())
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <ErrorBoundary>
      <AppHeader />
      <MainPage />
    </ErrorBoundary>
  )
}

export default App
