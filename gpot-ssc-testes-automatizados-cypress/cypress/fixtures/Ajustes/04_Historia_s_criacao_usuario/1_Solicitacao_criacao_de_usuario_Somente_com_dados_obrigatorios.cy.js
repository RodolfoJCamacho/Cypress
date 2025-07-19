import { faker, fakerPT_BR } from '@faker-js/faker'
import { br } from 'faker-br/lib/locales/pt_BR';
import { elementos } from '../../../support/selectors';



describe('Acesso ao Sistema SEG-ID | Fluxos e operações Solicitação Criação Usuario', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.clearCookies();
        cy.visit('/');
    })

    it('', () => {

       cy.log('1.Solicitação de Criação de usuário Somente com dados obrigatórios') 
       cy.get(elementos.loginButtoname).type(Cypress.env('usuarioSegId'))
       cy.get(elementos.passwordInput).type(Cypress.env('senhaSegId'))
       cy.get(elementos.loginButton).click();
       cy.contains(Cypress.env('unidade')).click()
       cy.get(elementos.closePopup).click();
       cy.contains('Criação de Usuário').click();

cy.get(elementos.divisao01)
  .contains('Aplicação/Módulo:')
  .siblings()
  .children()
  .filter(elementos.aplicacaoButton)
  .should('be.visible')
  .click();

cy.wait(1000);

cy.get(elementos.campoInput)
  .should('be.visible')
  .type(Cypress.env('aplicacao'));

             cy.contains('Nome:')
            .siblings()
            .filter(elementos.nomeInput).type(Cypress.env('nome'))
            
        const cpf = br.cpf()
        cy.contains('CPF:')
            .siblings()
            .filter(elementos.cpfInput).type(cpf)

        const email = fakerPT_BR.internet.email()
        cy.contains('E-mail:')
            .siblings()
            .filter(elementos.emailInput).type(email)

        cy.contains('Telefone:')
            .siblings()
            .filter(elementos.telefoneInput).type(Cypress.env('telefone'))
        cy.get(elementos.ultimoBotaoTema).click()
        cy.contains('Unidade:')
            .siblings()
            .children()
            .filter(elementos.unidadeButton).click()
        cy.wait(1000)
        cy.contains(Cypress.env('unidade01')).click()
     
        cy.wait(1000)

        cy.contains('Papel:')
            .siblings()
            .children()
            .filter(elementos.papelButton).click()
            cy.contains(Cypress.env('papel')).click()
        cy.get(elementos.ultimoBotaoTema).last().click()
        cy.wait(2000)
        cy.get(elementos.salvarButton).click()
        cy.wait(2000)
        cy.get(elementos.menuIcon).click()
        cy.get(elementos.processotexto).eq(1).click()
        cy.contains(Cypress.env('guianalise')).click()

        cy.get(elementos.divisao01)
                    .contains('Aplicação/Módulo:')
                    .siblings()
                    .children()
                    .filter(elementos.campoInput).eq(0).type(Cypress.env('aplicacao'))
                    cy.get(elementos.listaTabelas).click()
                    cy.wait(2000)
                    cy.get(elementos.itemFavorito).eq(0).click()
                    cy.get(elementos.itemsituacao).eq(1).click()
                    cy.wait(2000) 
                    
                 cy.wait(2000)
                cy.get(elementos.btnPesquisar).click()
                 cy.wait(2000)
                cy.get(elementos.linhadasituacao).eq(0).click()
                    
        cy.wait(1000)
        cy.get(elementos.ultimoBotaoTema).click()
        cy.wait(1000)
        cy.get(elementos.msgBoxConfirm).click()



    });







});

















