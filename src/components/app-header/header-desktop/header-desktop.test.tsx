import { render, screen } from '@testing-library/react'
import { expect, it } from '@jest/globals'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import '@testing-library/jest-dom'
import '@testing-library/jest-dom/jest-globals'

import { store } from '@/services/store'
import HeaderDesktop from './header-desktop'

describe('HeaderDesktop', () => {
  it('renders navigation links correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <HeaderDesktop />
        </MemoryRouter>
      </Provider>,
    )
    expect(screen.getByText('Конструктор')).toBeInTheDocument()
    expect(screen.getByText('Лента заказов')).toBeInTheDocument()
  })

  it('renders "Личный кабинет" when user is not logged in', () => {
    render(
      <Provider store={store}>
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <HeaderDesktop />
        </MemoryRouter>
      </Provider>,
    )
    expect(screen.getByText('Личный кабинет')).toBeInTheDocument()
  })
})
