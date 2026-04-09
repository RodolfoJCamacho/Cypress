import { faker } from '@faker-js/faker/locale/pt_BR';
import { elementos } from '../../../support/selectors';
import { waitForLoader } from '../../../support/utils';

describe('Acesso ao Sistema PRODOC | Fluxos e operações Repositório', () => {

   it('checando se existe loader', () => {
    cy.get('#botao-enviar').click()
    waitForLoader()  // chama a função importada
    cy.get('.mensagem-sucesso', { timeout: 10000 }).should('be.visible')
  })

  before(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit('/');
    cy.get(elementos.loginButtoname).type(Cypress.env('usuario01'));
    cy.get(elementos.passwordInput).type(Cypress.env('senha01'));
    cy.get(elementos.loginButton).click();
    cy.wait(1000);
  });

  //Timestamp BR e screenshots automáticas
  beforeEach(function () {
    const now = new Date();
    const timestamp = `${String(now.getDate()).padStart(2,'0')}-${String(now.getMonth()+1).padStart(2,'0')}-${now.getFullYear()}_${String(now.getHours()).padStart(2,'0')}-${String(now.getMinutes()).padStart(2,'0')}-${String(now.getSeconds()).padStart(2,'0')}`;
    Cypress.env('testTime', timestamp);
    cy.log(`Executando em: ${timestamp}`);
  });

  afterEach(function () {
    const timestamp = Cypress.env('testTime');
    const suiteName = this.currentTest.parent.title;
    const testName = this.currentTest.title;

    // screenshot sempre
    cy.screenshot(`${suiteName} -- ${testName} -- ${timestamp}`);

    // screenshot extra se falhar
    if (this.currentTest.state === 'failed') {
      cy.screenshot(`ERRO -- ${suiteName} -- ${testName} -- ${timestamp}`);
    }
  });

  // 1 - Criar Pasta
  it('1 - Criar Pasta', () => {
    cy.log('1. Criar Pastas');

    cy.get(elementos.CriarPasta).first().click();
    cy.get(elementos.campos).first().type('01 - Automacao');
    cy.get(elementos.salvar).click();
    cy.wait(1000);

    cy.log('1.1. Criar Pasta 00 - Automacao');

    cy.get(elementos.CriarPasta).first().click();
    cy.get(elementos.campos).first().type(Cypress.env('nomedapasta3'));
    cy.get(elementos.campos).eq(1).type(Cypress.env('titulodapasta'));
    cy.get(elementos.campos).last().type(Cypress.env('descricao'));
    cy.get(elementos.salvar).click();
    cy.reload();
    cy.wait(1000);
  });

  // 2 - Editar Pasta
  it('2 - Editar Pasta', () => {
    cy.log('2. Editar Pasta');
    cy.get(elementos.selecionelista)
      .contains(Cypress.env('criador'))
      .closest(elementos.selecionelista)
      .find(elementos.reticencias)
      .click();

    cy.get(elementos.EditarPasta).first().click();

    const randomNameEdit = faker.person.firstName();
    cy.get(elementos.Editarcampos).first().clear().type('02 - Automacao');
    cy.get(elementos.Editarcampos).eq(1).clear().type(`${faker.company.name()} ${randomNameEdit}`);
    cy.get(elementos.Editarcampos).last().clear().type(faker.lorem.sentence());

    cy.get(elementos.Salvaredicao).click();
    cy.wait(1000);
    cy.get(elementos.voltar).click();
    cy.wait(1000);
  });

  // 3 - Excluir Pasta
  it('3 - Excluir Pasta', () => {
    cy.log('3. Excluir Pasta');

    cy.get(elementos.tela, { timeout: 10000 }).should('be.visible');

    cy.contains('01 - Automacao', { timeout: 10000 })
      .should('be.visible')
      .closest('.z-listitem')
      .as('linhaAlvo');

    cy.get('@linhaAlvo')
      .find(elementos.reticencias, { timeout: 5000 })
      .should('be.visible')
      .click();

    cy.get(elementos.ExcluirPasta)
      .contains('Excluir', { matchCase: false })
      .click();

    cy.get(elementos.ConfirmaExclusao)
      .first()
      .should('be.visible')
      .click();

    cy.wait(1000);
    cy.get(elementos.ConfirmaOK).last().click();
    cy.wait(2000);
  });

  // 4 - Visualizar Pasta
  it('4 - Visualizar Pasta', () => {
    cy.log('4. Visualizar Pasta');
    cy.reload();

    cy.get(elementos.selecionelista)
      .contains(Cypress.env('nomedapasta3'))
      .dblclick();

    cy.get(elementos.tela).should('be.visible');
    cy.get(elementos.voltartelaprincipal).click();
    cy.wait(1000);
  });

  // 5 - Mover Pasta
  it('5 - Mover Pasta', () => {
    cy.log('5. Mover Pasta');
    cy.reload();

    cy.get(elementos.selecionelista)
      .filter(':contains("Usuario Automacao")')
      .last()
      .should('be.visible')
      .then(($linha) => {
        const inputCheckbox = $linha.find('input[type="checkbox"]').first();
        if (inputCheckbox.length) {
          cy.wrap(inputCheckbox).check({ force: true });
        } else {
          const customCheckbox = $linha.find('.z-checkbox').first();
          if (customCheckbox.length) {
            cy.wrap(customCheckbox).click({ force: true });
          } else {
            throw new Error('Checkbox não encontrado na linha do criador');
          }
        }
      });

    cy.contains('Mover').click();
    cy.get(elementos.tela).last().contains('Repositório').click();
    cy.wait(1000);
    cy.get(elementos.tela).last().contains('02 - Automacao').click();
    cy.wait(1000);
    cy.get(elementos.confirmar).last().click();
    cy.wait(1000);
    cy.get(elementos.ConfirmaOK).last().click();
    cy.wait(1000);
  });

  // 6 - Botão Limpar
  it('6 Botão Limpar', () => {
    cy.log('6 Botão Limpar');
    cy.reload();

    const randomName = faker.person.firstName();

    cy.get(elementos.CriarPasta).first().click();
    cy.get(elementos.campos).first().type(`${faker.commerce.department()} ${randomName}`);
    cy.get(elementos.campos).eq(1).type(`${faker.company.name()} ${randomName}`);
    cy.get(elementos.campos).last().type(faker.lorem.sentence());

    cy.get(elementos.Limpar).click();
    cy.get(elementos.close).click();

    cy.log('3.1 Excluir Pasta');

    cy.get(elementos.selecionelista)
      .contains(Cypress.env('criador'))
      .closest(elementos.selecionelista)
      .dblclick();

    cy.wait(1000);

    cy.get(elementos.reticencias).click();
    cy.wait(1000);

    cy.get(elementos.ExcluirPasta).contains('Excluir').click();
    cy.get(elementos.ConfirmaExclusao).first().should('be.visible').click();
    cy.wait(1000);

    cy.get(elementos.ConfirmaOK).last().click();
    cy.wait(1000);
  });

});