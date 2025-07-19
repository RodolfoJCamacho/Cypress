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
        
 


it('Fluxo de exceção dos casos 8 ao 10', () => {

    cy.log('8.Solicitação remoção Papel Usuario Papel Em Branco e dados Invalidos')
    cy.wait(2000)
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

          //Este trecho comentado precisamos avaliar pois na versão de homologação, pesquiso dados invalidos normalmente 
          //no ambiente dev não aceitar este fluxo de exceção
    
  //  cy.contains('Papel:')
  //  .siblings()
  //  .children()
  //  .filter(elementos.campoInput).type(Cypress.env('dadosinvalidos'))
 //   cy.wait(2000)
 //   cy.get(elementos.msgBoxConfirm).click()
  //  cy.wait(1000)
 //   cy.get(elementos.papelButton).last().click()
  //  cy.wait(1000)
  //  cy.get(elementos.msgBoxConfirm).click()
 //   cy.wait(1000)

      
    
//    cy.contains('Papel:')
 //   cy.get(elementos.campoInput).last().type('{selectall}{backspace}')
 //   cy.wait(1000)
  //  cy.get(elementos.msgBoxConfirm).click()
//    cy.wait(1000)
 //   cy.get(elementos.papelButton).last().click()
 //   cy.wait(1000)
 //   cy.get(elementos.msgBoxConfirm).click()

    //Solicitação remoção Papel Usuario Sem Aprovar


    cy.log('9.Solicitação remoção Papel Usuario Sem Aprovar')
    cy.wait(2000)

     cy.get(elementos.menuIcon).click()
       cy.get(elementos.processotexto).eq(1).click()
       cy.contains(Cypress.env('criacaosolicitacao')).click()
        cy.contains(Cypress.env('remocaodepapel')).click()
        cy.wait(1000)
        cy.get(elementos.divisao01)
            .contains('Aplicação/Módulo:')
            .siblings()
            .children()
            .filter(elementos.aplicacaoButton)
            .should('be.visible')
            .click();
        cy.wait(1000);
        cy.contains('Aplicação/Módulo:')
            .siblings()
            .children()
            .filter(elementos.campoInput).first().type(Cypress.env('aplicacao'))
        cy.get(elementos.listaTabelas).first().click()

    cy.contains('Unidade:')
           cy.get(elementos.campoInput).eq(1)
          .type(Cypress.env('unidade01'))

// cy.contains('Buscar usuários por unidade').click()
 //       cy.wait(2000)
   //     cy.get(elementos.lupa).click()
    //      cy.wait(1000)


        cy.contains('Papel:')
            .siblings()
            .children()
            .filter(elementos.campoInput).type(Cypress.env('papel'))
            cy.wait(1000)
        cy.get(elementos.listaTabelas).last().click()
        cy.wait(1000)


        cy.contains('Filtrar por nome:')
        cy.get( elementos.campoconfirmanovasenha).type(Cypress.env('nome01'))
        cy.wait(1000)               
        cy.get(elementos.filtrar).eq(1).click()

      cy.contains('Pesquisa de Usuários')
            .siblings()
            .children()
            .filter(elementos.listaTabelas).first()
            cy.wait(1000)
        cy.get(elementos.ckeckbox).eq(1).click()

                    
        cy.contains('Arquivo em anexo:')
        cy.get(elementos.fileInput1)
            .attachFile('Codigotest.txt')

        cy.contains('Motivo da remoção:')
        cy.get(elementos.motivodescricao)
            .type(Cypress.env('motivo'))

        cy.wait(2000)

        cy.get(elementos.salvarButton).click()
    
   

    //.Solicitação remoção Papel Usuario Solicitacao Repetida
    
    cy.log('10.Solicitação remoção Papel Usuario Solicitacao Repetida')
    cy.wait(2000)

     cy.get(elementos.menuIcon).click()
      
       cy.get(elementos.processotexto).eq(1).click()
       
       cy.contains(Cypress.env('criacaosolicitacao')).click()
      
        cy.contains(Cypress.env('remocaodepapel')).click()
        cy.wait(1000)
        cy.get(elementos.divisao01)
            .contains('Aplicação/Módulo:')
            .siblings()
            .children()
            .filter(elementos.aplicacaoButton)
            .should('be.visible')
            .click();
        cy.wait(1000);
        cy.contains('Aplicação/Módulo:')
            .siblings()
            .children()
            .filter(elementos.campoInput).first().type(Cypress.env('aplicacao'))
        cy.get(elementos.listaTabelas).first().click()

           cy.contains('Unidade:')
           cy.get(elementos.campoInput).eq(1)
          .type(Cypress.env('unidade01'))

 //cy.contains('Buscar usuários por unidade').click()
 //       cy.wait(2000)
   //     cy.get(elementos.lupa).click()
     //     cy.wait(1000)

          cy.contains('Papel:')
            .siblings()
            .children()
            .filter(elementos.campoInput).type(Cypress.env('papel'))
            cy.wait(1000)
        cy.get(elementos.listaTabelas).last().click()
        cy.wait(1000)

        cy.contains('Filtrar por nome:')
        cy.get( elementos.campoconfirmanovasenha).type(Cypress.env('nome01'))
        cy.wait(1000)               
        cy.get(elementos.filtrar).eq(1).click()

      cy.contains('Pesquisa de Usuários')
            .siblings()
            .children()
            .filter(elementos.listaTabelas).first()
            cy.wait(1000)
        cy.get(elementos.ckeckbox).eq(1).click()

                    
        cy.contains('Arquivo em anexo:')
        cy.get(elementos.fileInput1)
            .attachFile('Codigotest.txt')

        cy.contains('Motivo da remoção:')
        cy.get(elementos.motivodescricao)
            .type(Cypress.env('motivo'))

        cy.wait(2000)

        cy.get(elementos.salvarButton).click()
        cy.wait(1000)
        
        cy.get(elementos.msgBoxConfirm).click()


});



})











