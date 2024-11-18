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
  passwordForgot: '/password-reset',
  passwordReset: 'password-reset/reset',
} as const

export const MODE = {
  login: 'login',
  register: 'register',
  forgotPassword: 'forgot-password',
  resetPassword: 'reset-password',
  profile: 'profile',
} as const
