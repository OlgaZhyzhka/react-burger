export const API_URL = 'https://norma.nomoreparties.space/api'

export const modalRoot = 'modal-root'
export const DragType = 'ingredient'
export const DragConstructorItemType = 'burger-ingredient'
export const IngredientTypes = {
  bun: 'bun',
  sauce: 'sauce',
  main: 'main',
} as const
export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  profile: '/profile',
  ingredient: '/ingredients/:ingredientId',
  orderFeed: '/order-feed',
  notFound: '*',
} as const

export const URLS = {
  login: '/auth/login',
  register: '/auth/register',
  token: '/auth/token',
  logout: '/auth/logout',
  user: '/auth/user',
  ingredients: '/ingredients',
  order: '/orders',
  passwordReset: '/password-reset',
  passwordResetSubmit: 'password-reset/reset',
} as const

export const MODE = {
  login: 'login',
  register: 'register',
  forgotPassword: 'forgotPassword',
  resetPassword: 'resetPassword',
} as const

export const resetPasswordValidationSchema = {
  code: (value: string) => (!value ? 'Code is required' : null),
  password: (value: string) =>
    value.length < 6 ? 'Password must be at least 6 characters long' : null,
}

export const loginValidationSchema = {
  email: (value: string) => (!value ? 'Email is required' : null),
  password: (value: string) => (!value ? 'Password is required' : null),
}

export const registerValidationSchema = {
  email: (value: string) => (!value ? 'Email is required' : null),
  password: (value: string) =>
    value.length < 6 ? 'Password must be at least 6 characters long' : null,
  name: (value: string) => (!value ? 'Name is required' : null),
}

export const forgotPasswordValidationSchema = {
  email: (value: string) => (!value ? 'Email is required' : null),
}
