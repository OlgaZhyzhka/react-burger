import { ReactNode } from 'react'
import { IngredientTypes, ROUTES, URLS, MODE } from './constants'

export type IngredientType = (typeof IngredientTypes)[keyof typeof IngredientTypes]

export type PropsWithChildren<P = unknown> = P & { children: ReactNode }

export type PropsWithOptionalChildren<P = unknown> = P & { children?: ReactNode }

export type ROUTES_TYPE = keyof typeof ROUTES

export type URLS_TYPE = keyof typeof URLS

export type MODE_TYPE = keyof typeof MODE
