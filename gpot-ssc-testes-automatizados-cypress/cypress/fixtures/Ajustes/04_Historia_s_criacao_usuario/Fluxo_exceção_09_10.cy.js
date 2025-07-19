import { faker, fakerPT_BR } from '@faker-js/faker'
import { br } from 'faker-br/lib/locales/pt_BR';
import { elementos } from '../../../support/selectors';


describe('Fluxo de exceção | Solicitação criação de Usuário', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
       cy.clearCookies();
       cy.visit('/');

    
  })

  it('', () => {

    cy.log('9.Solicitação de criação de usuário Com CPF invalido e CPF em branco')
    cy.wait(1000)

    cy.get(elementos.loginButtoname).type(Cypress.env('usuarioSegId'))
    cy.get(elementos.passwordInput).type(Cypress.env('senhaSegId'))
    cy.get(elementos.loginButton).click();
    cy.contains(Cypress.env('unidade')).click()
                cy.get(elementos.closePopup).click();
                cy.get(elementos.criarusuario).eq(3).click();
                cy.get(elementos.botaocarregarfoto).eq(0).click();
                cy.get(elementos.browser).eq(0).click()
                cy.wait(1000)
                cy.get(elementos.fileInput1).last()
                    .attachFile('prodemge_logo.jpg')
                cy.wait(1000)
               cy.get(elementos.enviarimagem).eq(1).click()
        
        
              cy.get(elementos.divisao01)
  .contains('Aplicação/Módulo:')
  .siblings()
  .children()
  .filter(elementos.aplicacaoButton)
  .should('be.visible')
  .click();

cy.wait(1000);

cy.get(elementos.campoInput)
  .should('be.visible')
  .type(Cypress.env('aplicacao'));
                
                const matricula = faker.finance.accountNumber(3)
                cy.contains('Matrícula:')
                    .siblings()
                    .filter(elementos.matriculaInput).type(matricula)
        
        
                cy.contains('Nome:')
                    .siblings()
                    .filter(elementos.nomeInput).type(Cypress.env('nome'))
        
        
                const rg = fakerPT_BR.finance.accountNumber(8)
                cy.contains('Identidade (RG):')
                    .siblings()
                    .filter(elementos.rgInput).type(rg)
        
      cy.contains('CPF:')
      .siblings()
      .filter(elementos.cpfInput).type("4755867878")
    cy.wait(2000)

    cy.contains('CPF:')
      .siblings()
      .filter(elementos.cpfInput).click()


   const email = fakerPT_BR.internet.email()
                cy.contains('E-mail:')
                    .siblings()
                    .filter(elementos.emailInput).type(email)
        
                const email1 = fakerPT_BR.internet.email()
                cy.contains('E-mail secundário:')
                    .siblings()
                    .filter(elementos.emailSecundarioInput).type(email1)
        
                const email2 = fakerPT_BR.internet.email()
                cy.contains('E-mail do gestor:')
                    .siblings()
                    .filter(elementos.emailGestorInput).type(email2)
        
                cy.contains('Telefone:')
                    .siblings()
                    .filter(elementos.telefoneInput).type(Cypress.env('telefone'))  
        
        
                cy.contains('Celular:')
                    .siblings()
                    .filter(elementos.celularInput).type(Cypress.env('celular'))
        
        
                cy.contains('Arquivo em anexo:')
                cy.get(elementos.fileInput2)
                    .attachFile('anexar_arquivo.zip')
        
                 cy.get(elementos.ultimoBotaoTema).click()   
                 cy.contains('Unidade:')
                    .siblings()
                    .children()
                    .filter(elementos.unidadeButton).click()
                cy.wait(1000)
                cy.contains(Cypress.env('unidade01')).click()
             
                cy.wait(1000)
        
                cy.contains('Papel:')
                    .siblings()
                    .children()
                    .filter(elementos.papelButton).click()
                    cy.contains(Cypress.env('papel')).click()
                cy.get(elementos.ultimoBotaoTema).last().click()
                cy.wait(2000)
                cy.get(elementos.salvarButton).click()
                cy.wait(1000)
                cy.get(elementos.msgBoxConfirm).click()



    // Iniciando o caso -> 10.Solicitação criação usuário Com nome inválido e nome em branco

    cy.log('10.Solicitação criação usuário Com nome inválido e nome em branco')
    cy.wait(3000)

    cy.get(elementos.menuIcon).click()
    cy.wait(1000)
    cy.get(elementos.processotexto).eq(1).click()
    cy.wait(1000)
    cy.get(elementos.criacaodesoslitacoes).eq(2).click();
    cy.wait(1000)
    
          cy.contains(Cypress.env('criacaodeusuario')).click();
            cy.wait(1000)
                cy.get(elementos.botaocarregarfoto).eq(0).click();
                cy.get(elementos.browser).eq(0).click()
                cy.wait(1000)
                cy.get(elementos.fileInput1).last()
                    .attachFile('prodemge_logo.jpg')
                cy.wait(1000)
               cy.get(elementos.enviarimagem).eq(1).click()
        
        
                cy.get(elementos.divisao01)
                    .contains('Aplicação/Módulo:')
                    .siblings()
                    .children()
                    .filter(elementos.aplicacaoButton).click();
                     cy.contains(Cypress.env('aplicacao')).click()
                cy.wait(1000)
                
                const matricula1 = faker.finance.accountNumber(3)
                cy.contains('Matrícula:')
                    .siblings()
                    .filter(elementos.matriculaInput).type(matricula1)
        

    cy.contains('Nome:')
      .siblings()
      .filter(elementos.nomeInput).type("MRA.Deise Pimentel Ito")
    cy.wait(2000)

       
    
    const cpf = br.cpf()
    cy.contains('CPF:')
      .siblings()
      .filter(elementos.cpfInput).type(cpf)


    const email01 = fakerPT_BR.internet.email()
    cy.contains('E-mail:')
      .siblings()
      .filter(elementos.emailInput).type(email01)

    const email02 = fakerPT_BR.internet.email()
    cy.contains('E-mail secundário:')
      .siblings()
      .filter(elementos.emailSecundarioInput).type(email1)

    const email03 = fakerPT_BR.internet.email()
    cy.contains('E-mail do gestor:')
      .siblings()
      .filter(elementos.emailGestorInput).type(email2)

    cy.contains('Telefone:')
      .siblings()
      .filter(elementos.telefoneInput).type(Cypress.env('telefone')) 


    cy.contains('Celular:')
      .siblings()
      .filter(elementos.celularInput).type(Cypress.env('celular'))

   cy.contains('Arquivo em anexo:')
                cy.get(elementos.fileInput2)
                    .attachFile('anexar_arquivo.zip')
        
                 cy.get(elementos.ultimoBotaoTema).click()   
                 cy.contains('Unidade:')
                    .siblings()
                    .children()
                    .filter(elementos.unidadeButton).click()
                cy.wait(1000)
                cy.contains(Cypress.env('unidade01')).click()
             
                cy.wait(1000)
        
                cy.contains('Papel:')
                    .siblings()
                    .children()
                    .filter(elementos.papelButton).click()
                    cy.contains(Cypress.env('papel')).click()
                cy.get(elementos.ultimoBotaoTema).last().click()
                cy.wait(2000)
                cy.get(elementos.salvarButton).click()
                cy.wait(2000)
               // cy.get(elementos.msgBoxConfirm).click()

   

  });


});

















