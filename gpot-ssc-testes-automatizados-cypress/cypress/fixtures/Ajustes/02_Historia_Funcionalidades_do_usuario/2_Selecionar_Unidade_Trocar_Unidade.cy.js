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
         
            cy.log ('2.Selecionar Unidade Trocar Unidade')
    
             cy.get(elementos.loginButtoname).type(Cypress.env('usuarioSegId'))
             cy.get(elementos.passwordInput).type(Cypress.env('senhaSegId'))
             cy.get(elementos.loginButton).click();
             cy.contains(Cypress.env('unidade')).click()
             cy.get(elementos.closePopup).click();
             cy.wait(2000)
             cy.get(elementos.versaosistem).invoke('text').then(($value) => {
             cy.log($value)
             }),

             cy.get(elementos.botaosuperiord).click()
             cy.wait(2000)
             cy.contains('TROCAR UNIDADE').click()
            
            cy.contains('Selecionar Unidade')
            cy.get(elementos.campoInput).click()
            cy.contains(Cypress.env('unidade')).click()                     
            cy.get(elementos.closePopup).click();
             
             
          
    
        });


        
            
            
            

            
    });   
      