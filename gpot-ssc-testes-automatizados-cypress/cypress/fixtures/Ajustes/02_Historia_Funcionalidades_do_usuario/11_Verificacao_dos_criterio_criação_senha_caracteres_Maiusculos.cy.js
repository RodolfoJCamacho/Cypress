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
                         
        it('Fluxos e operações Funcionalidades do Usuario', () =>{                 
         
            cy.log ('11.Verificação dos critério de criação de senha caracteres Maiusculos')
            
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
            cy.wait(1000)            
            cy.get(elementos.alterarsenha).click()           
            cy.contains('Senha atual:')
            cy.get(elementos.camposenhatual).first().type(Cypress.env('senhaSegId'))                       
            cy.contains('Nova senha:')
            cy.get(elementos.camponovasenha).eq(1).type(Cypress.env('senhacriterioMa'))
            cy.contains('Confirmação da nova senha:')
            cy.get(elementos.campoconfirmanovasenha).eq(2).type(Cypress.env('senhacriterioMa'))            
            cy.get(elementos.salvarButton).click()
            cy.wait(1000)
            cy.contains('Senha atual:')
            cy.get(elementos.camposenhatual).first().type(Cypress.env('senhacriterioMa'))                        
            cy.contains('Nova senha:')
            cy.get(elementos.camponovasenha).eq(1).type(Cypress.env('senhaSegId'))
            cy.contains('Confirmação da nova senha:')
            cy.get(elementos.campoconfirmanovasenha).eq(2).type(Cypress.env('senhaSegId'))            
            cy.get(elementos.salvarButton).click()

            });


        
            
            
            

            
    });   
       