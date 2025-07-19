import { faker, fakerPT_BR } from '@faker-js/faker'
import { br } from 'faker-br/lib/locales/pt_BR';
const { elementos } = require("../../../support/selectors");

describe('',() => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.clearCookies();
        cy.visit('/');
        cy.get('[class="col-md-9 footerVersion z-div"]').invoke('text').then(($value) => {
        cy.log($value)
        }),
        cy.wait(2000)
       
        })
                         
        it('Fluxos e operações Alteração dos dados do usuário', () =>{                 
         
            cy.log('Solicitação de alteração de usuário E-mail secundário em branco')
                
             cy.get(elementos.loginButtoname).type(Cypress.env('usuarioSegId'))
                cy.get(elementos.passwordInput).type(Cypress.env('senhaSegId'))
                cy.get(elementos.loginButton).click();
                cy.contains(Cypress.env('unidade')).click()
                cy.get(elementos.closePopup).click();  
             
             cy.wait(2000)
             cy.get('[class="col-md-9 footerVersion"]').invoke('text').then(($value) => {
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
        cy.contains('CPF:')
            .siblings()
            .children()
            .filter(elementos.cpfInput).type(Cypress.env('cpf'))
        cy.contains('Buscar CPF').click()
             
        cy.contains('E-mail secundário:')
            .siblings()
            .filter(elementos.emailSecundarioInput).clear()
       
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
        cy.get(elementos.btnPesquisar).click()
        cy.wait(2000)
        cy.get(elementos.linhadasituacao).eq(0).click()
        cy.wait(1000)
        cy.get(elementos.btnNovo).click()
        cy.wait(1000)
        cy.get(elementos.msgBoxConfirm).click()

        
        });


        
            
            
            

            
    });                                
              