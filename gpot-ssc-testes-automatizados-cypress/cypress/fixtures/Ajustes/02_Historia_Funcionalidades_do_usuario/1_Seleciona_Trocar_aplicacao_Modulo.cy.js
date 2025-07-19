const { elementos } = require("../../../support/selectors");

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
                         
        it('Fluxos e operações Funcionalidades do Usuario', () =>{                 
         
            cy.log ('1.Seleciona Trocar aplicacao Modulo')
    
             cy.get(elementos.loginButtoname).type(Cypress.env('usuarioSegId'))
             cy.get(elementos.passwordInput).type(Cypress.env('senhaSegId'))
             cy.get(elementos.loginButton).click();

                       
            cy.get(elementos.campoInput).clear()
            cy.get(elementos.campoInput).eq(0).type(Cypress.env('aplicacao')); 
            cy.get(elementos.listaTabelaP).click()
                     
             cy.get(elementos.closePopup).click();
             cy.wait(2000)
             cy.get(elementos.versaosistem).invoke('text').then(($value) => {
             cy.log($value)
             }),

             cy.get(elementos.botaosuperiord).click()
             cy.wait(2000)
             cy.contains('TROCAR MÓDULO').click()

             
            cy.contains('Selecionar/Trocar Aplicação/Módulo')
            cy.get(elementos.campoInput).eq(0).type(Cypress.env('aplicacao')); 
            cy.contains(Cypress.env('aplicacao')).click()
            .should('be.visible') 
            .first()
                      
             cy.wait(1000)
                          
             cy.get(elementos.menuIcon).click()
             cy.wait(1000)
             cy.get(elementos.processotexto).eq(1).click()
             cy.wait(1000)
             cy.contains('ANÁLISE DE SOLICITAÇÕES').click()
             cy.wait(1000)
             
             cy.get(elementos.lupa).click();
             
        });


        
            
            
            

            
    });   
      