import { elementos } from '../../../support/selectors';

describe('Acesso ao Sistema PRODOC | Fluxos e operações Gerenciamento', () => {

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit('/');
  });

  it('1 - História Pastas', () => {

    cy.log('1. História Pastas');

    cy.get(elementos.loginButtoname).type(Cypress.env('usuarioSegId'));
    cy.get(elementos.passwordInput).type(Cypress.env('senhaSegId'));
    cy.get(elementos.loginButton).click();

    cy.wait(1000);

  });

  

});