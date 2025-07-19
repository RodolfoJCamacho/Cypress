import { faker, fakerPT_BR } from '@faker-js/faker'
import { br } from 'faker-br/lib/locales/pt_BR';
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
         
            cy.log ('Alteracao de e-mails_secundario_invalido_em_branco')
    
            cy.get(elementos.loginButtoname).type(Cypress.env('usuarioSegId'));
            cy.get(elementos.passwordInput).type(Cypress.env('senhaSegId'));
            cy.get(elementos.loginButton).click();
            cy.contains(Cypress.env('unidade')).click();
            cy.get(elementos.closePopup).click();
            cy.wait(2000);

             cy.get(elementos.versaosistem).invoke('text').then(($value) => {
            cy.log($value);
    });

    cy.get(elementos.botaosuperiord).click(); 

    cy.contains('ALTERAR E-MAIL SECUNDÁRIO').click();
    cy.wait(1000);

    const email = fakerPT_BR.name.firstName();

    cy.get(elementos.emailSecundarioInput).clear().type(email); 
    cy.wait(1000);
    cy.get(elementos.salvarButton).click(); 
    cy.wait(1000);
    cy.contains('OK').click();
    cy.wait(1000);
    cy.get(elementos.emailSecundarioInput).clear(); 
    cy.wait(1000);
    cy.get(elementos.salvarButton).click();
    cy.wait(2000);
          
    
        });


        
            
            
            

            
    });   
    