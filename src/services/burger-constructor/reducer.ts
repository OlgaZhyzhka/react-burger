import { createSlice } from '@reduxjs/toolkit'

import { Burger } from '@/utils/interfaces'

export interface burgerConstructorState {
  burger: Burger | null
}

const initialState: burgerConstructorState = {
  burger: null,
}

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {},
})
