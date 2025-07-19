import { elementos } from '../../../support/selectors';
describe('Acesso ao Sistema SSC Homologação',() => {
    beforeEach(() => {
         cy.clearLocalStorage();
         cy.clearCookies();
         cy.visit('/');
      
    
        cy.wait(2000)
             cy.get('[class="col-md-9 footerVersion z-div"]').invoke('text').then(($value) => {
             cy.log($value)
             }),
             cy.wait(2000)
       
        })
                         
        it('Fluxos e operações desligamento de Usuario', () =>{                 
         
            cy.log ('8.Incluir desligamento do usuário Aprovar o desligamento')
    
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


        cy.contains('Nome:')
            .siblings()
            .children()
            .filter(elementos.campoInput).type(Cypress.env('nome03'))
        cy.get(elementos.nomeButton).click()
        cy.get(elementos.listaTabela).first().click()
        cy.contains('Incluir').click()



        cy.contains('Arquivo em anexo:')
        cy.get(elementos.fileInput1)
            .attachFile('Codigotest.txt')

        cy.contains('Módulos do usuário')
        cy.get(elementos.botaomais).first().click()

        cy.contains('Motivo do desligamento:')
        cy.get(elementos.motivodescricao)
            .type(Cypress.env('motivo'))
        cy.wait(2000)


        cy.get(elementos.salvarButton).click()
        cy.wait(2000)
        cy.get(elementos.msgBoxConfirm).last().click()
        cy.wait(2000)
        cy.get(elementos.msgBoxConfirm).click()
 
        });


        
            
            
            

            
    });                                
              