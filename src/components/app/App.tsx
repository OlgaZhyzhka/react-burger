import { useMemo } from 'react'

import { ErrorBoundary } from '@/core/error-boundary'
import { useIngredients } from '@/hooks'
import { sortIngredients } from '@/utils/helpers'
import { MainPage } from '@/pages/main-page'
import { AppHeader } from '@/components/app-header'
import { Loader } from '@/components/base-components/loader'

const App = () => {
  const { data, loading } = useIngredients()
  const memoSortedIngredients = useMemo(() => sortIngredients(data), [data])
  // const a = useRef(1)

  // useEffect(() => {
  //   a.current +=1
  //   console.log(a)
  // }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <ErrorBoundary>
      <AppHeader />
      <MainPage data={memoSortedIngredients} />
    </ErrorBoundary>
  )
}

export default App
