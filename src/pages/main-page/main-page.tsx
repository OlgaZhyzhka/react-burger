import { useEffect, useState } from 'react'

import { ApiState } from '@/utils/interfaces'
import { BurgerConstructor } from '@/components/burger-constructor'
import { BurgerIngredients } from '@/components/burger-ingredients'
import { Loader } from '@/components/base-components/loader'
import { fetchIngredients } from '@/utils/api/api-service'

const MainPage = () => {
  const [state, setState] = useState<ApiState>({
    data: [],
    loading: false,
    error: null,
  })

  const { loading, error, data } = state

  useEffect(() => {
    const getIngredients = async () => {
      setState({ ...state, loading: true, error: null })
      try {
        const data = await fetchIngredients()
        setState({ ...state, data, loading: false })
      } catch (err: unknown) {
        if (err instanceof Error) {
          setState({ ...state, error: err.message, loading: false })
        }
      }
    }

    getIngredients()
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <section className="page container">
      <div className="row">
        <div className="col">
          {error ? <p>{error}</p> : <BurgerIngredients ingredients={data} />}
        </div>
        <div className="col">
          <BurgerConstructor />
        </div>
      </div>
    </section>
  )
}

export default MainPage
