export default function flow() {
  cy.clearLocalStorage()
  cy.clearCookies()
  cy.visit('/')
}