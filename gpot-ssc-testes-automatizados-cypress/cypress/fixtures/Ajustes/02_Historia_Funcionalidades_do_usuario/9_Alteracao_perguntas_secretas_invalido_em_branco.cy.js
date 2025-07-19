import { elementos } from '../../../support/selectors';
describe('Acesso ao Sistema SEG-ID',() => {
    beforeEach(() => {
       cy.clearLocalStorage();
       cy.clearCookies();
       cy.visit('/');
             
      cy.wait(2000)
                  cy.get(elementos.versaosistemidp).invoke('text').then(($value) => {
                  cy.log($value)
                   }),
                   cy.wait(2000)
        })
                         
        it('Fluxos e operações Funcionalidades do Usuario', () =>{                 
         
            cy.log ('4.Alterar perguntas secretas')
    
            cy.get(elementos.loginButtoname).type(Cypress.env('usuarioSegId'))
            cy.get(elementos.passwordInput).type(Cypress.env('senhaSegId'))
            cy.get(elementos.loginButton).click();
            cy.contains(Cypress.env('unidade')).click()
            cy.get(elementos.closePopup).click();
            cy.wait(2000)
            cy.get(elementos.versaosistem).invoke('text').then(($value) => {
            cy.log($value)
             }),
            cy.wait(2000);
            cy.get(elementos.botaosuperiord).click();
            cy.wait(1000);

            cy.contains('ALTERAR PERGUNTAS SECRETAS').click();
            cy.wait(1000);
            cy.get(elementos.edicao).click();
            cy.wait(1000);
            cy.get(elementos.botaosecret).first().click();
            cy.wait(1000);
            cy.contains('Qual o nome do seu primeiro animal de estimação?').first().click();
            cy.contains('Primeira resposta:');
            cy.get(elementos.repostasecreta).first().type(Cypress.env('perguntainvalida'))
            cy.wait(1000);
                  
            cy.contains('Pergunta secundária:')
            cy.get(elementos.botaosecret).last().click()
            cy.get(elementos.itemFavorito).last().click()
            cy.get(elementos.botaosecret).last().click()            
            cy.contains('Segunda resposta:')                         
            cy.get(elementos.repostasecreta).last().type(Cypress.env('perguntainvalida'))
                       
            cy.get(elementos.salvarButton).click();
            cy.wait(2000);

            cy.get(elementos.edicao).click();
             cy.wait(1000);
            cy.contains('Primeira resposta:');
            cy.get(elementos.repostasecreta).first().clear();
            cy.contains('Pergunta secundária:');
            cy.contains('Segunda resposta:');
            cy.get(elementos.repostasecreta).last().clear();
            cy.get(elementos.salvarButton).click();  
            cy.wait(1000);
            cy.get(elementos.msgBoxConfirm).click();
            cy.wait(1000)
            cy.get(elementos.edicao).click();
            cy.wait(1000);
            cy.contains('Primeira resposta:');
            cy.get(elementos.repostasecreta).first().type(Cypress.env('perguntainvalida'))
            cy.get(elementos.salvarButton).click();
            cy.wait(1000);
            cy.get(elementos.msgBoxConfirm).click();
            cy.wait(1000);
            cy.get(elementos.edicao).click();
            cy.wait(1000);
            cy.contains('Pergunta secundária:');
            cy.contains('Segunda resposta:');
            cy.get(elementos.repostasecreta).last().type(Cypress.env('perguntainvalida'))
            cy.get(elementos.salvarButton).click();
            cy.wait(1000);
            cy.get(elementos.msgBoxConfirm).click();
            cy.wait(2000);
    
        });


        
            
            
            

            
    });   
   