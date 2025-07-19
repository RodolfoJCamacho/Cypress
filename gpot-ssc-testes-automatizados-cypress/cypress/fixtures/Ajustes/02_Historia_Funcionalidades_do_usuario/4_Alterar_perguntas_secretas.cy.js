import { faker, fakerPT_BR } from '@faker-js/faker'
import { br } from 'faker-br/lib/locales/pt_BR';
import { elementos } from '../../../support/selectors';


describe('Acesso ao Sistema SEG-ID',() => {
    beforeEach(() => {
       cy.clearLocalStorage();
       cy.clearCookies();
       cy.visit('/');
             cy.get('[class="col-md-9 footerVersion z-div"]').invoke('text').then(($value) => {
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
             cy.wait(2000)
             cy.get(elementos.botaosuperiord).click()
             cy.wait(1000)
             
             cy.contains('ALTERAR PERGUNTAS SECRETAS').click()
              cy.wait(1000)
             cy.get(elementos.edicao).click()
              cy.wait(1000)
             cy.get(elementos.botaosecret).first().click()
              cy.wait(1000)
             cy.contains('Qual o nome da sua primeira escola?').first().click()
             cy.contains('Primeira resposta:')
             const nome = fakerPT_BR.name.fullName()
             cy.get(elementos.repostasecreta).first().type(nome)
                         
             cy.contains('Pergunta secundária:')
             cy.get(elementos.botaosecret).last().click()
             cy.get(elementos.itemFavorito).last().click()
             cy.get(elementos.botaosecret).last().click()
             
             
             cy.contains('Segunda resposta:')
             const cor = fakerPT_BR.color.human()
             cy.get(elementos.repostasecreta).last().type(cor)
             
             cy.contains('Salvar').click()
             
    
        });


        
            
            
            

            
    });   
   