export const API_URL = 'https://norma.nomoreparties.space/api'
export const WS_URL = 'wss://norma.nomoreparties.space'
export const WS_ALL_ORDERS = '/orders/all'
export const WS_USER_ORDERS = '/orders'
export const RECONNECT_PERIOD = 3000
export const ERROR_TOKEN = 'Invalid or missing token'
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
  profileInfo: '/profile/info',
  profileOrders: '/profile/orders',
  profileOrder: '/profile/orders/:orderId',
  feed: '/feed',
  feedOrder: '/feed/:feedId',
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
  passwordReset: '/password-reset',
  passwordResetSubmit: '/password-reset/reset',
} as const

export const MODE = {
  login: 'login',
  register: 'register',
  forgotPassword: 'forgotPassword',
  resetPassword: 'resetPassword',
} as const

export const OrderStatus = {
  pending: 'Готовится',
  created: 'Создан',
  done: 'Выполнен',
} as const

export const WebSocketStatus = {
  CONNECTING: 'CONNECTING',
  OPEN: 'OPEN',
  CLOSING: 'CLOSING',
  CLOSED: 'CLOSED',
} as const

export const resetPasswordValidationSchema = {
  code: (value: string): string | null => (!value ? 'Code is required' : null),
  password: (value: string): string | null =>
    value.length < 6 ? 'Password must be at least 6 characters long' : null,
}

export const loginValidationSchema = {
  email: (value: string): string | null => (!value ? 'Email is required' : null),
  password: (value: string): string | null => (!value ? 'Password is required' : null),
}

export const registerValidationSchema = {
  email: (value: string): string | null => (!value ? 'Email is required' : null),
  password: (value: string): string | null =>
    value.length < 6 ? 'Password must be at least 6 characters long' : null,
  name: (value: string): string | null => (!value ? 'Name is required' : null),
}

export const forgotPasswordValidationSchema = {
  email: (value: string): string | null => (!value ? 'Email is required' : null),
}

export const orders = [
  {
    _id: '60d3b41abdacab0026a733c7',
    number: '034536',
    createdAt: '2024-12-11T12:59:00.000Z',
    name: 'Бессмертный оракул',
    status: 'done',
    ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941'],
  },
]
