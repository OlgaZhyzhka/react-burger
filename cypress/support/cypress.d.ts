import './commands'

declare global {
  namespace Cypress {
    interface Chainable {
      visitHomePage(): Chainable<Element>

      openIngredientModal(ingredientId: string): Chainable<Element>

      closeModal(closeSelector: string): Chainable<Element>
    }
  }
}
