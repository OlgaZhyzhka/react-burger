import './commands'

declare global {
  namespace Cypress {
    interface Chainable {
      visitHomePage(): Chainable<Element>
    }
  }
}
