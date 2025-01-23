import type {} from 'cypress'

describe('Example Test', () => {
  beforeEach(() => {
    cy.visitHomePage()
  })

  it('should visit the home page', () => {
    cy.contains('Соберите бургер')
  })

  it('should drag and drop ingredients into the constructor', () => {
    // cy.get('[data-test-ingredient]').first().as('ingredient')
    // cy.viewport(1280, 720)
    cy.get('[data-test-constructor="ingredient"]').as('constructor')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    // cy.wait(500)
    // cy.get('@ingredient').trigger('dragstart')
    // cy.get('@constructor').trigger('drop')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    // cy.wait(500)
    // cy.get('@constructor').trigger('dragend')

    cy.get('@constructor').contains('Выберите начинку').should('not.exist')
  })

  // it('should open and close ingredient details modal', () => {
  // cy.visit('/')
  // cy.get('[data-test-ingredient]').first().click()
  // cy.get('[data-test-modal]').should('be.visible')
  // cy.get('[data-test-modal-close]').click()
  // cy.get('[data-test-modal]').should('not.exist')
  // })
})
