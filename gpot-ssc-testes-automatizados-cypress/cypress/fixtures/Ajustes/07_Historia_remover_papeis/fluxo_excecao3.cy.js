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
        
 

it('Fluxo de exceção dos casos 11 ao 13', () => {
    
    //Solicitação remoção Papel Usuario Selecionando somente por Papel
    
    cy.log('11.Solicitação remoção Papel Usuario Selecionando somente por Papel')
    cy.wait(2000)

     cy.get(elementos.loginButtoname).type(Cypress.env('usuarioSegId'))
        cy.get(elementos.passwordInput).type(Cypress.env('senhaSegId'))
        cy.get(elementos.loginButton).click();
        cy.contains(Cypress.env('unidade')).click()
        cy.get(elementos.closePopup).click();
        cy.contains('Remoção de Papel').click()

    cy.contains('Papel:')
    .siblings()
    .children()
    .filter(elementos.campoInput).type(Cypress.env('papel'))
    cy.get(elementos.listaTabelas).last().click()
    cy.wait(1000)
   
    cy.get(elementos.msgBoxConfirm).click()

    //Solicitação remoção Papel Usuario Buscando Usuario somente Por Unidade


    cy.log('12.Solicitação remoção Papel Usuario Buscando Usuario somente Por Unidade')
    cy.wait(2000)

    cy.get(elementos.menuIcon).click()
        cy.get(elementos.processotexto).eq(1).click()
        cy.contains(Cypress.env('criacaosolicitacao')).click()
        cy.wait(1000)
        cy.contains(Cypress.env('remocaodepapel')).click()
        cy.wait(1000)
    cy.wait(2000)

    cy.contains('Unidade:')
        .siblings()
        .children()
        .filter(elementos.unidadeButton).click()

    cy.get(elementos.msgBoxConfirm).click()
    cy.wait(2000)
    //cy.get('[class="z-textbox"]').click()
   
    cy.contains('Buscar usuários por unidade').click()
    cy.wait(2000)
     cy.get(elementos.msgBoxConfirm).click()
     cy.wait(1000)

   // Solicitação remoção Papel Usuario Sem informação no campo Motivo

    
    cy.log('13.Solicitação remoção Papel Usuario Sem informação no campo Motivo')
    cy.wait(2000)

    
        cy.get(elementos.menuIcon).click()
        cy.get(elementos.processotexto).eq(1).click()
        cy.contains(Cypress.env('criacaosolicitacao')).click()
        cy.contains(Cypress.env('remocaodepapel')).click()
        
   

        cy.get(elementos.divisao01)
        cy.wait(1000);

        cy.contains('Aplicação/Módulo:')
            .siblings()
            .children()
            .filter(elementos.aplicacaoButton)
            .should('be.visible')
            .click();

        cy.wait(1000);

        cy.get(elementos.campoInput)
            .should('be.visible').first()
            .type(Cypress.env('aplicacao'));

        cy.wait(1000);

      cy.contains('Unidade:')
           cy.get(elementos.campoInput).eq(1)
          .type(Cypress.env('unidade01'))

       // cy.contains('Buscar usuários por unidade').click()
       // cy.wait(2000)
      //  cy.get(elementos.lupa).click()
       //   cy.wait(1000)

       
        cy.contains('Papel:')
            .siblings()
            .children()
            .filter(elementos.campoInput).type(Cypress.env('papel1'))
        cy.get(elementos.listaTabelas).last().click()
        cy.wait(1000)

       
      cy.contains('Pesquisa de Usuários')
            .siblings()
            .children()
            .filter(elementos.listaTabelas).first()
        cy.get(elementos.ckeckbox).eq(1).click()

                    
        cy.contains('Arquivo em anexo:')
        cy.get(elementos.fileInput1)
            .attachFile('Codigotest.txt')

        
        cy.wait(2000)

        cy.get(elementos.salvarButton).click()
        cy.get(elementos.msgBoxConfirm).click() 
    
});

})













