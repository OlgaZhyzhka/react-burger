import { useEffect, useState } from 'react'

import { Ingredient } from '@/utils/interfaces'
import { API_URL } from '@/utils/constants'
import { BurgerConstructor } from '@/components/burger-constructor'
import { BurgerIngredients } from '@/components/burger-ingredients'
import { Loader } from '@/components/base-components/loader'

const MainPage = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setError(null)
    setLoading(true)
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setIngredients(data.data)
        setLoading(false)
      })
      .catch(err => {
        setError(err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <section className="page container">
      <div className="row">
        <div className="col">
          {error ? <p>{error}</p> : <BurgerIngredients ingredients={ingredients} />}
        </div>
        <div className="col">
          <BurgerConstructor />
        </div>
      </div>
    </section>
  )
}

export default MainPage
