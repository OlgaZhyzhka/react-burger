import { ReactNode } from 'react'
import { IngredientTypes } from './constants'

export type IngredientType = (typeof IngredientTypes)[keyof typeof IngredientTypes]

export type PropsWithChildren<P = unknown> = P & { children: ReactNode }

export type PropsWithOptionalChildren<P = unknown> = P & { children?: ReactNode }
