import { faker, fakerPT_BR } from '@faker-js/faker'
import { br } from 'faker-br/lib/locales/pt_BR';
const { elementos } = require("../../../support/selectors");

describe('',() => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.clearCookies();
        cy.visit('/');
       
        cy.wait(2000)
             cy.get('[class="col-md-9 footerVersion z-div"]').invoke('text').then(($value) => {
             cy.log($value)
             }),
             cy.wait(2000)
			
       
        })
                         
        it('Fluxos e operações Alteração dos dados do usuário', () =>{                 
         
            cy.log ('15 Solicitação de Alteração dos dados do usuário pesquisa por CPF')
    
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
           
        cy.contains('CPF:')
            .siblings()
            .children()
            .filter(elementos.cpfInput).type(Cypress.env('cpf'))
        cy.contains('Buscar CPF').click()

         cy.get(elementos.salvarButton).click()
      

     


        
        });


        
            
            
            

            
    });                                
              