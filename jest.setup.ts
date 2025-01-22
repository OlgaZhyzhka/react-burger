import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

Object.assign(global, { TextDecoder, TextEncoder })

jest.mock('@reduxjs/toolkit', () => {
  const originalModule = jest.requireActual('@reduxjs/toolkit')
  return {
    ...originalModule,
    nanoid: () => 'PzhehRNcpZvfo-F2DDQlx',
  }
})

afterEach(() => {
  jest.clearAllMocks()
})
