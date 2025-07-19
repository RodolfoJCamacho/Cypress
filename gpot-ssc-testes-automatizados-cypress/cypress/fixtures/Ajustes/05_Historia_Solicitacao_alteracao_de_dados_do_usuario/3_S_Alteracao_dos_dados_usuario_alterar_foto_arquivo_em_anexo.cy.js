import { faker, fakerPT_BR } from '@faker-js/faker'
import { br } from 'faker-br/lib/locales/pt_BR';
import { elementos } from '../../../support/selectors';

describe('', () => {
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

    it('Fluxos e operações Alteração dos dados do usuário', () => {

        cy.log('3 Solicitação de Alteração dos dados do usuário alterar foto e arquivo em anexo')

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
        cy.wait(2000)
        cy.get(elementos.menuIcon).click()
        cy.get(elementos.processotexto).eq(1).click()
        cy.contains(Cypress.env('criacaosolicitacao')).click()
        cy.wait(1000)
        cy.contains(Cypress.env('alteracaodosusuario')).click()
        cy.wait(1000)
        cy.get(elementos.divisao01)
            .contains('Aplicação/Módulo:')
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
        cy.get(elementos.listaTabelas).click()
        cy.contains('Unidade:')
            .siblings()
            .children()
            .filter(elementos.unidadeButton).click()
        cy.wait(1000)
        cy.contains(Cypress.env('unidade01')).click()
        cy.wait(1000)
        cy.contains('CPF:')
            .siblings()
            .children()
            .filter(elementos.cpfInput).type(Cypress.env('cpf'))
         cy.contains('Buscar CPF').click()
 cy.wait(1000)
        cy.get(elementos.botaocarregarfoto).eq(1).click();
        cy.get(elementos.browser).eq(0).click()
         cy.wait(1000)
    
        cy.get(elementos.fileInput1).last()
            .attachFile('prodemge_logo.jpg')
        cy.wait(1000)
        cy.get(elementos.enviarimagem).eq(1).click()
        const email = fakerPT_BR.internet.email()
        cy.contains('E-mail:')
            .siblings()
            .filter(elementos.emailInput).clear().type(email)
        cy.wait(2000)
        const matricula = faker.finance.accountNumber(3)
        cy.contains('Matrícula:')
            .siblings()
            .filter(elementos.matriculaInput).clear().type(matricula)
        cy.contains('Arquivo em anexo:')
        cy.get(elementos.fileInput2)
            .attachFile('anexar_arquivo.zip')
        cy.wait(2000)
        cy.get(elementos.salvarButton).click()
        cy.wait(2000)
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
        cy.get(elementos.btnPesquisar).click()
        cy.wait(2000)
        cy.get(elementos.linhadasituacao).eq(0).click()
        cy.wait(1000)
        cy.get(elementos.btnNovo).click()
        cy.wait(1000)
        cy.get(elementos.msgBoxConfirm).click()


    });








});
