import type {} from 'cypress'
import type {} from '../support/cypress'

describe('Burger Constructor', () => {
  beforeEach(() => {
    cy.visitHomePage()
  })

  it('should drag and drop multiple ingredients into the constructor', () => {
    const testCases = [
      { id: '643d69a5c3f7b9001cfa093c', name: 'bun', description: 'булка' },
      { id: '643d69a5c3f7b9001cfa0941', name: 'ingredient', description: 'ингредиент' },
      {
        id: '643d69a5c3f7b9001cfa0942',
        name: 'another ingredient',
        description: 'another ingredient',
      },
      {
        id: '643d69a5c3f7b9001cfa0942',
        name: 'same ingredient',
        description: 'same ingredient',
      },
    ]

    cy.get('[data-testid="constructor"]').as('constructor')

    testCases.forEach(({ id, name, description }) => {
      cy.get(`[data-testid="${id}"]`).as(name)
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(500)
      cy.get(`@${name}`).trigger('dragstart')
      cy.get('@constructor').trigger('drop')
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(500)
      cy.get('@constructor').trigger('dragend')

      if (name === 'bun') {
        cy.get('@constructor').contains('Выберите булку').should('not.exist')
      } else {
        cy.get('@constructor').contains('Выберите начинку').should('not.exist')
      }
    })
  })

  it('should open and close ingredient details modal', () => {
    cy.get('[data-testid="643d69a5c3f7b9001cfa0941"]').as('ingredient')
    cy.get('@ingredient').click()
    cy.get('[data-testid="modal"]').should('be.visible')
    cy.get('[data-testid="close"]').click()
    cy.get('[data-testid="modal"]').should('not.exist')
  })

  it('should close the ingredient details modal by clicking the overlay', () => {
    cy.get('[data-testid="643d69a5c3f7b9001cfa0942"]').as('ingredient')
    cy.get('@ingredient').click()
    cy.get('[data-testid="modal"]').should('be.visible')
    cy.get('[data-testid="overlay"]').click()
    cy.get('[data-testid="modal"]').should('not.exist')
  })
})
