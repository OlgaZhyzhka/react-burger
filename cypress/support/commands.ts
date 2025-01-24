/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
Cypress.Commands.add('visitHomePage', () => {
  cy.visit('/')
  cy.intercept('GET', 'ingredients', { fixture: 'ingredients.json' }).as('getIngredients')
})

Cypress.Commands.add('openIngredientModal', (ingredientId: string) => {
  cy.get(`[data-cy="${ingredientId}"]`).click()
  cy.get('[data-cy="modal"]').should('be.visible')
})

Cypress.Commands.add('closeModal', (closeSelector: string) => {
  cy.get(closeSelector).click()
  cy.get('[data-cy="modal"]').should('not.exist')
})
