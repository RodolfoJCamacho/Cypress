import { elementos } from '../../../support/selectors';

describe('',() => {
   
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.clearCookies();
        cy.visit('/');
      cy.get(elementos.versaosistemidp).invoke('text').then(($value) => {
            cy.log($value)
        }),
            cy.wait(2000)

       
        })
                        
        it('4. Vincular Um Papel Usuario Pelo Nome ', () =>{

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
         .filter(elementos.campoInput).type(Cypress.env('nome'))
        

         cy.contains('Nome:')
         .siblings()
         .children()
         .filter('[class="z-bandbox-button"]').click()
         cy.focused('Incluir').click()
               

         cy.contains('Unidade:')
                    .siblings()
                    .children()
                    .filter(elementos.unidadeButton).click()
                cy.wait(1000)
                cy.contains(Cypress.env('unidade01')).click()
                cy.wait(1000)
        
                cy.contains('Arquivo em anexo:')
                cy.get(elementos.fileInput2)
                    .attachFile('anexar_arquivo.zip')
        
        
                cy.contains('Papel:')
                    .siblings()
                    .children()
                    .filter(elementos.papelButton).click()
                cy.contains(Cypress.env('papel')).click()
                cy.contains('Incluir').click()
                cy.get(elementos.divisaoId)
                cy.wait(1000)
        
                cy.get(elementos.salvarButton).click()

           cy.get(elementos.menuIcon).click()
                 cy.get(elementos.processotexto).eq(1).click()
                 cy.contains(Cypress.env('guianalise')).click()
         
                 cy.get(elementos.divisao01)
                     .contains('Aplicação/Módulo:')
                     .siblings()
                     .children()
                     .filter(elementos.campoInput).eq(0).type(Cypress.env('aplicacao'))
                 cy.get(elementos.listaTabelas).click()
                 cy.wait(2000)
                 cy.get(elementos.itemFavorito).eq(0).click()
                 cy.get(elementos.itemsituacao).eq(1).click()
                 cy.wait(2000)
         
                 cy.wait(2000)
                 cy.get(elementos.btnPesquisar).click()
                 cy.wait(2000)
                 cy.get(elementos.linhadasituacao).eq(0).click()
                 cy.wait(1000)
                 cy.get(elementos.ultimoBotaoTema).click()
                 cy.wait(1000)
                 cy.get(elementos.msgBoxConfirm).click()
         
                
         
           });                                
                         
            
                               
        }); 

           
                      
                             
            
                   
        
        
           
           

   
   
