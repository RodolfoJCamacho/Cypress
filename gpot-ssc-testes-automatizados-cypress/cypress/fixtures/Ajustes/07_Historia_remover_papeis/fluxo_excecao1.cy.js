import { elementos } from '../../../support/selectors';

describe('Acesso ao Sistema SEG-ID',() => {
    beforeEach(() => {
         cy.clearLocalStorage();
         cy.clearCookies();
         cy.visit('/');
             cy.get(elementos.versaosistemidp).invoke('text').then(($value) => {
             cy.log($value)
             }),
             cy.wait(2000)
        })
        
 

it('Fluxo de exceção dos casos 6 ao 7', () => {

    cy.log('6.Solicitação remoção Papel Usuario Modulo Em Branco e dados Invalido')
    cy.wait(2000)

     cy.get(elementos.loginButtoname).type(Cypress.env('usuarioSegId'))
        cy.get(elementos.passwordInput).type(Cypress.env('senhaSegId'))
        cy.get(elementos.loginButton).click();
        cy.contains(Cypress.env('unidade')).click()
        cy.get(elementos.closePopup).click();
        cy.contains('Remoção de Papel').click()

        cy.get(elementos.divisao01)
        cy.wait(1000);
     
     cy.contains('Unidade:')
     .siblings()
     .children()
     .filter(elementos.unidadeButton).click()
     cy.wait(2000)
     cy.get(elementos.msgBoxConfirm).click()

    
    
     cy.get(elementos.divisao01)
        cy.wait(1000);

        cy.contains('Aplicação/Módulo:')
            .siblings()
            .children()
            .filter(elementos.aplicacaoButton)
            .should('be.visible')
            .click();

        cy.wait(1000);

        cy.get(elementos.campoInput)
            .should('be.visible').first()
            .type(Cypress.env('nomeinvalido'));


             cy.wait(1000);

    
    
    cy.log('7.Solicitação remoção Papel Usuario Unidade Em Branco e dados Invalidos')
    cy.wait(1000)


        cy.get(elementos.menuIcon).click()
        cy.get(elementos.processotexto).eq(1).click()
        cy.contains(Cypress.env('criacaosolicitacao')).click()
        cy.wait(1000)
        cy.contains(Cypress.env('remocaodepapel')).click()
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
            .filter(elementos.campoInput).first().type(Cypress.env('aplicacao'))
        cy.get(elementos.listaTabelas).first().click()

   cy.wait(1000);
   
    cy.contains('Papel:')
        .siblings()
        .children()
        .filter(elementos.papelButton).click()
        cy.wait(1000)
    cy.get(elementos.msgBoxConfirm).click()
    cy.wait(1000)

   
      })


   
});















