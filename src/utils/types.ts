import type { Identifier } from 'dnd-core'

import type { IngredientTypes, MODE } from './constants'
import type { AuthDTO, ApiResponse, Ingredient } from './interfaces'

export type IngredientType = (typeof IngredientTypes)[keyof typeof IngredientTypes]

export type PropsWithChildren<P = unknown> = P & { children: React.JSX.Element }

export type PropsWithOptionalChildren<P = unknown> = P & { children?: React.JSX.Element }

export type MODE_TYPE = keyof typeof MODE

export type UserResponse = Omit<ApiResponse, 'accessToken' | 'refreshToken'>

export type ResetPasswordDTO = Pick<AuthDTO, 'password'> & { code: string }

export type ForgotPasswordDTO = Pick<AuthDTO, 'email'>

export type LoginDTO = Omit<AuthDTO, 'name'>

export type UpdateUserDTO = Partial<AuthDTO>

export type TDragObject = {
  index?: number
} & Ingredient

export type TDragCollectedProps = {
  isDragging: boolean
}

export type TDropCollectedProps = {
  handlerId?: Identifier | null
  isOver?: boolean
}
