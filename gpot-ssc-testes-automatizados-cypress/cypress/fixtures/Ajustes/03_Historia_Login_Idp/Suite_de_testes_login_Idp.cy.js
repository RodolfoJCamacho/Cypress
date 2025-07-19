const { elementos } = require("../../../support/selectors");

describe('Acesso ao Sistema SEG-ID | Suite de Testes Login Idp',() => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.clearCookies();
        cy.visit('/');
        
        })

it(' 1. Acesso ao sistema com Senha Invalida', () =>{

        cy.get(elementos.loginButtoname).type(Cypress.env('logininvalido'))
        cy.get(elementos.passwordInput).type(Cypress.env('senhainvalida'))
        cy.get(elementos.loginButton).click();

        cy.wait(1000)

        });

it(' 2. Acesso ao sistema com Senha Valida ', () =>{

        cy.get(elementos.loginButtoname).type(Cypress.env('usuarioSegId'))
        cy.get(elementos.passwordInput).type(Cypress.env('senhaSegId'))
        cy.get(elementos.loginButton).click();
         
    
        });

it(' 3. Recuperação de senha no idp não confirma a solicitação (voltar) para tela principal', () =>{
        
        cy.get(elementos.esqueceusenha).click();
        cy.get(elementos.definesenha).type(Cypress.env('usuarioSegId'))
        cy.get(elementos.voltaredefinirsenha).eq(0).click();
       
       
        });                        
                     
        it(' 4. Recuperação de senha no idp confirma a solicitação', () =>{

                cy.get(elementos.esqueceusenha).click();
                cy.get(elementos.definesenha).type(Cypress.env('loginteste'))
                cy.get(elementos.voltaredefinirsenha).eq(0).click();
                cy.wait(3000)
                cy.get(elementos.emailprincipal).eq(0).click();
                cy.get(elementos.definesenha).type(Cypress.env('confirmaemail'))
                cy.get(elementos.voltaredefinirsenha).eq(1).click();                        
                     
         });     

          it(' 5. Recuperação de senha no idp cpf não cadastrado confirma a solicitação', () =>{

                cy.get(elementos.esqueceusenha).click();
                cy.get(elementos.definesenha).type(Cypress.env('logininvalido'))
                cy.get(elementos.voltaredefinirsenha).eq(0).click();
                cy.get(elementos.msgBoxConfirm).click();
                                      
         });     


it(' 6. Fluxo do usuario bloqueado utilizando a opção Voltar', () =>{
     

        cy.get(elementos.usuariobloqueado).eq(1).click()
        cy.get(elementos.definesenha).type(Cypress.env('usuarioSegId'))              
        cy.get(elementos.voltaredefinirsenha).eq(1).click()
          
            
        });

        
it(' 7. Fluxo do usuario bloqueado utilizando a opção Buscar sem usuario bloqueado ', () =>{
     
        cy.get(elementos.usuariobloqueado).eq(1).click()        
        cy.get(elementos.definesenha).type(Cypress.env('usuarioSegId'))        
        cy.get(elementos.voltaredefinirsenha).eq(0).click()      
        cy.get(elementos.msgBoxConfirm).eq(0).click()
        

        });

it(' 8. Fluxo do usuario bloqueado utilizando a opção Buscar com usuario bloqueado ', () =>{
     
        cy.get(elementos.usuariobloqueado).eq(1).click()        
        cy.get(elementos.definesenha).type(Cypress.env('loginteste'))        
        cy.get(elementos.voltaredefinirsenha).eq(0).click()      
        cy.get(elementos.msgBoxConfirm).eq(0).click()
        

        });


        });
       
    
