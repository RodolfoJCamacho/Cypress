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
       
        it('7. Vincular Papel Repetido Usuario Pelo CPF', () =>{

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
            
         cy.contains('CPF:')
         cy.get(elementos.cpfInput).type(Cypress.env('cpfvinc'))                        
         cy.contains('Buscar').click()
         cy.wait(1000)
         cy.focused('Incluir').click()
        

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
        cy.contains('Incluir').click()
                 
         cy.contains('Incluir').click()
        
        
        cy.get(elementos.msgBoxConfirm).click()
                
                    
           });                                
                         
            
                               
        }); 

           
                      
                             
            
                   
        
        
           
           

   
   
