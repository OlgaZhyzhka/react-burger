import { createAsyncThunk } from '@reduxjs/toolkit'

import { fetchIngredients } from '@/core/api/api-service'
import { Ingredient } from '@/utils/interfaces'

const LOAD_INGREDIENTS = 'ingredients/loadIngredients'

export const loadIngredients = createAsyncThunk(
  LOAD_INGREDIENTS,
  async (): Promise<Ingredient[]> => {
    return await fetchIngredients()
  },
)
