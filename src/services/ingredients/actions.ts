import { createAsyncThunk } from '@reduxjs/toolkit'

import { fetchIngredients } from '@/core/api/api-service'
import type { Ingredient } from '@/utils/interfaces'

export const loadIngredients = createAsyncThunk(
  'ingredients/loadIngredients',
  async (): Promise<Ingredient[]> => {
    return await fetchIngredients()
  },
)
