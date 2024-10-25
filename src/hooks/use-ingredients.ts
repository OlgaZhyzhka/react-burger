import { useEffect, useState } from 'react'

import { fetchIngredients } from '@/core/api/api-service'
import { ApiState } from '@/utils/interfaces'

const useIngredients = () => {
  const [state, setState] = useState<ApiState>({
    data: [],
    loading: false,
    error: null,
  })

  useEffect(() => {
    const getIngredients = async () => {
      setState(prevState => ({ ...prevState, loading: true, error: null }))
      try {
        const data = await fetchIngredients()
        setState({ data, loading: false, error: null })
      } catch (err: unknown) {
        if (err instanceof Error) {
          setState({ data: [], error: err.message, loading: false })
        }
      }
    }

    getIngredients()
  }, [])

  return state
}

export default useIngredients
