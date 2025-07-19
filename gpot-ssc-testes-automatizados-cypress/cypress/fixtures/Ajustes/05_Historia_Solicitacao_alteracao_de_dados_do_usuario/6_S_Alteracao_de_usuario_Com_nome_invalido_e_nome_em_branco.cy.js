
const { elementos } = require("../../../support/selectors");

describe('', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.clearCookies();
        cy.visit('/');
        cy.get(elementos.versaosistemidp).invoke('text').then(($value) => {
            cy.log($value)
        }),
            cy.wait(2000)

    })

    it('Fluxos e operações Alteração dos dados do usuário', () => {

        cy.log('6 Solicitação de alteração de usuário Com nome inválido e nome em branco')

        cy.get(elementos.loginButtoname).type(Cypress.env('usuarioSegId'))
        cy.get(elementos.passwordInput).type(Cypress.env('senhaSegId'))
        cy.get(elementos.loginButton).click();
        cy.contains(Cypress.env('unidade')).click()
        cy.get(elementos.closePopup).click();

        cy.wait(2000)
        cy.get(elementos.versaosistem).invoke('text').then(($value) => {
            cy.log($value)
        }),
            cy.wait(2000)
        cy.get(elementos.menuIcon).click()
        cy.get(elementos.processotexto).eq(1).click()
        cy.contains(Cypress.env('criacaosolicitacao')).click()
        cy.wait(1000)
        cy.contains(Cypress.env('alteracaodosusuario')).click()
        cy.wait(1000)
        cy.get(elementos.divisao01)
            .contains('Aplicação/Módulo:')
            .siblings()
            .children()
            .filter(elementos.aplicacaoButton)
            .should('be.visible')
            .click();
        cy.wait(2000);
        cy.contains('Aplicação/Módulo:')
            .siblings()
            .children()
            .filter(elementos.campoInput).eq(0).type(Cypress.env('aplicacao'))
        cy.get(elementos.listaTabelas).click()
        cy.contains('Unidade:')
            .siblings()
            .children()
            .filter(elementos.unidadeButton).click()
        cy.wait(1000)
        cy.contains(Cypress.env('unidade01')).click()

        cy.contains('Nome:')
            .siblings()
            .children()
            .filter(elementos.campoInput).last().type(Cypress.env('nomeinvalido'))
        cy.get(elementos.nomeButton).last().click()

        cy.get(elementos.menuIcon).click()
        cy.get(elementos.processotexto).eq(1)
        cy.contains(Cypress.env('criacaosolicitacao'))
        cy.wait(1000)
        cy.contains(Cypress.env('alteracaodosusuario')).click()
        cy.wait(1000)
        cy.get(elementos.divisao01)
            .contains('Aplicação/Módulo:')
            .siblings()
            .children()
            .filter(elementos.aplicacaoButton)
            .should('be.visible')
            .click();
        cy.wait(1000);
        cy.contains('Aplicação/Módulo:')
            .siblings()
            .children()
            .filter(elementos.campoInput).eq(0).type(Cypress.env('aplicacao'))
        cy.get(elementos.listaTabelas).click()
        cy.contains('Unidade:')
            .siblings()
            .children()
            .filter(elementos.unidadeButton).click()
        cy.wait(1000)
        cy.contains(Cypress.env('unidade01')).click()
         cy.wait(1000)

        cy.contains('Nome:')
            .siblings()
            .children()
        cy.get(elementos.nomeButton).last().click()


    });








});
