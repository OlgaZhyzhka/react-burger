import type {} from 'cypress'
import type {} from '../support/cypress'

const INGREDIENTS_ID = {
  bun: '643d69a5c3f7b9001cfa093c',
  main: '643d69a5c3f7b9001cfa0941',
  sauce: '643d69a5c3f7b9001cfa0942',
}

describe('Burger Constructor', () => {
  beforeEach(() => {
    cy.visitHomePage()
    cy.wait('@getIngredients')
  })

  it('should drag and drop multiple ingredients into the constructor', () => {
    const testCases = [
      { id: INGREDIENTS_ID.bun, name: 'bun', description: 'булка' },
      { id: INGREDIENTS_ID.main, name: 'ingredient', description: 'ингредиент' },
      {
        id: INGREDIENTS_ID.sauce,
        name: 'another ingredient',
        description: 'another ingredient',
      },
      {
        id: INGREDIENTS_ID.sauce,
        name: 'same ingredient',
        description: 'same ingredient',
      },
    ]

    cy.get('[data-cy="constructor"]').as('constructor')

    testCases.forEach(({ id, name, description }) => {
      cy.get(`[data-cy="${id}"]`).as(name)
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
    cy.openIngredientModal(INGREDIENTS_ID.main)
    cy.closeModal('[data-cy="close"]')
  })

  it('should close the ingredient details modal by clicking the overlay', () => {
    cy.openIngredientModal(INGREDIENTS_ID.main)
    cy.closeModal('[data-cy="overlay"]')
  })
})
