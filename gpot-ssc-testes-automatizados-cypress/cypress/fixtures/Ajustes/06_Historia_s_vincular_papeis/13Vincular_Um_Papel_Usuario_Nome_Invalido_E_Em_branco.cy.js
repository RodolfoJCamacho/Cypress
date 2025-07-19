import { elementos } from '../../../support/selectors';


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
       
        it('13. Vincular Um Papel Usuario Nome Invalido E Em branco ', () =>{
         cy.get(elementos.loginButtoname).type(Cypress.env('usuarioSegId'))
        cy.get(elementos.passwordInput).type(Cypress.env('senhaSegId'))
        cy.get(elementos.loginButton).click();
        cy.contains(Cypress.env('unidade')).click()
        cy.get(elementos.closePopup).click();

        cy.wait(2000)
        cy.get(elementos.versaosistem).invoke('text').then(($value) => {
            cy.log($value)
        }),

          
        cy.contains('Vinculação de Papel').click();

        cy.contains('Aplicação/Módulo:')
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
            
               
         
          cy.contains('Nome:')
         .siblings()
         .children()
         .filter(elementos.campoInput).type(Cypress.env('nomeinvalido'))
         cy.wait(1000)
       

         // na pesquisa
         cy.contains('Nome:')
         .siblings()
         .children()
         .filter(elementos.nomeButton).click()

         cy.get(elementos.msgBoxConfirm).click()
         cy.wait(1000)
        
         
         // limpar nome 
         cy.contains('Nome:')
         cy.focused("z-bandbox-button").clear()
         cy.wait(1000)
         

         cy.log('Nome em Branco')
         // sem informação no campo 
         cy.contains('Nome:')
         .siblings()
         .children()
         .filter(elementos.nomeButton).click()
         cy.wait(1000)
                        
                               
            
           });                                
                         
            
                               
        }); 

           
                      
                             
            
                   
        
        
           
           

   
   
