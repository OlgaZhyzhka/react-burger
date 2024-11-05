import { useEffect } from 'react'

import { ErrorBoundary } from '@/core/error-boundary'
import { getIngredientsState } from '@/services/ingredients/reducer'
// import { Loader } from '@/components/base-components/loader'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks'
import { MainPage } from '@/pages/main-page'
import { loadIngredients } from '@/services/ingredients/actions'
import { AppHeader } from '@/components/app-header'
import { Loader } from '@/components/base-components/loader'

const App = () => {
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector(getIngredientsState)
  // const sortedIngredients = useAppSelector(getSortedIngredients)

  useEffect(() => {
    dispatch(loadIngredients())
  }, [])

  if (!loading) {
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
