import { render, screen } from '@testing-library/react'
import { expect, it } from '@jest/globals'
import AppHeader from './app-header'
import { useMediaQuery } from '@/hooks'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import '@testing-library/jest-dom'
import '@testing-library/jest-dom/jest-globals'

import { store } from '@/services/store'

jest.mock('@/hooks')

describe('AppHeader', () => {
  it('renders HeaderDesktop when viewport width is >= 1200px', () => {
    ;(useMediaQuery as jest.Mock).mockReturnValue(true)
    render(
      <Provider store={store}>
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AppHeader />
        </MemoryRouter>
      </Provider>,
    )
    expect(screen.getByText('Конструктор')).toBeInTheDocument()
  })

  it('renders HeaderMobile when viewport width is < 1200px', () => {
    ;(useMediaQuery as jest.Mock).mockReturnValue(false)
    render(
      <Provider store={store}>
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AppHeader />
        </MemoryRouter>
      </Provider>,
    )
    expect(screen.getByTestId('logo')).toBeInTheDocument()
  })

  it('should match the snapshot for desktop view', () => {
    ;(useMediaQuery as jest.Mock).mockReturnValue(true)
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AppHeader />
        </MemoryRouter>
      </Provider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should match the snapshot for mobile view', () => {
    ;(useMediaQuery as jest.Mock).mockReturnValue(false)
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AppHeader />
        </MemoryRouter>
      </Provider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
