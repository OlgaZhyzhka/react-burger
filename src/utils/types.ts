import { ReactNode } from 'react'
import { IngredientTypes, MODE } from './constants'
import { AuthDTO, AuthResponse } from './interfaces'

export type IngredientType = (typeof IngredientTypes)[keyof typeof IngredientTypes]

export type PropsWithChildren<P = unknown> = P & { children: ReactNode }

export type PropsWithOptionalChildren<P = unknown> = P & { children?: ReactNode }

export type MODE_TYPE = keyof typeof MODE

export type UserResponse = Omit<AuthResponse, 'accessToken' | 'refreshToken'>

export type ResetPasswordDTO = Pick<AuthDTO, 'password'> & { code: string }

export type ForgotPasswordDTO = Pick<AuthDTO, 'email'>

export type LoginDTO = Omit<AuthDTO, 'name'>

export type UpdateUserDTO = Partial<AuthDTO>
