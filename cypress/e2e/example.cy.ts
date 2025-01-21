import type {} from 'cypress'

describe('Example Test', () => {
  it('should visit the home page', () => {
    cy.visit('/')
    cy.contains('Соберите бургер')
  })
})
