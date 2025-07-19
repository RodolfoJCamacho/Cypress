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
        


    it('3. Aprovar Solicitacao Removendo Papel Usuario', () => {
        cy.get(elementos.loginButtoname).type(Cypress.env('usuarioSegId'))
        cy.get(elementos.passwordInput).type(Cypress.env('senhaSegId'))
        cy.get(elementos.loginButton).click();
        cy.contains(Cypress.env('unidade')).click()
        cy.get(elementos.closePopup).click();
        cy.contains('Remoção de Papel').click()

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

             cy.wait(1000)
             cy.contains('Papel:')
            .siblings()
            .children()
            .filter(elementos.campoInput).type(Cypress.env('papel'))
             cy.get(elementos.listaTabelas).last().click()
             cy.wait(1000)

        //cy.contains('Buscar usuários por unidade').click()
       //// cy.wait(2000)
       // cy.get(elementos.lupa).click()
       // cy.wait(1000)

       cy.contains('Filtrar por nome:')
        cy.get( elementos.campoconfirmanovasenha).type(Cypress.env('nome01'))               
        cy.get(elementos.filtrar).eq(1).click()

         cy.wait(1000)
      cy.contains('Pesquisa de Usuários')
            .siblings()
            .children()
            .filter(elementos.listaTabelas).first()
            cy.get(elementos.ckeckbox).eq(1).click()
           
             cy.wait(1000)
                    
        cy.contains('Arquivo em anexo:')
        cy.get(elementos.fileInput1)
            .attachFile('Codigotest.txt')

        cy.contains('Motivo da remoção:')
        cy.get(elementos.motivodescricao)
            .type(Cypress.env('motivo'))

        cy.wait(2000)

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





})                               
