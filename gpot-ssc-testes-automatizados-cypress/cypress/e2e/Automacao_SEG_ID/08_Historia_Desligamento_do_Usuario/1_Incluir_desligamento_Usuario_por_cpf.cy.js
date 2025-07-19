import { elementos } from '../../../support/selectors';

describe('Acesso ao Sistema SSC Homologação',() => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.clearCookies();
        cy.visit('/');
      
             cy.get(elementos.versaosistemidp).invoke('text').then(($value) => {
             cy.log($value)
             }),
             cy.wait(2000)
        })
                         
        it('Fluxos e operações desligamento do Usuario', () =>{                 
         
            cy.log ('1.Incluir desligamento do Usuario por cpf')
    
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
              cy.contains(Cypress.env('desligamentodousuario')).click()
              cy.wait(1000)
            
 
 
             cy.contains('CPF:')
             .siblings()
             .children()
             .filter(elementos.cpfInput).type(Cypress.env('cpf'))
             cy.contains('Buscar').click()
             cy.contains('Incluir').click()
             cy.wait(2000)
 
             
             cy.contains('Módulos do usuário')
             cy.get(elementos.botaomais).first().click()
             
             
             cy.contains('Arquivo em anexo:')
             cy.get(elementos.fileInput1)
             .attachFile('Codigotest.txt')
 
 
          cy.contains('Motivo do desligamento:')
          cy.get(elementos.motivodescricao)
          .type(Cypress.env('motivo'))
          cy.wait(2000)
     
          
    
        });


        
            
            
            

            
    });                                
              