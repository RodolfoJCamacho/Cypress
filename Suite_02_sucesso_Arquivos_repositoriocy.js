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

  // -------------------
  // Timestamp BR e screenshots
  // -------------------
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

  // -------------------
  // TESTES
  // -------------------

  it('7 Enviar Arquivo', () => {
    cy.log('7 Enviar Arquivo');
    cy.reload();

    cy.get(elementos.EnviarArquivo).first().click();

    cy.get('input[type="file"]')
      .first()
      .attachFile([
        { filePath: 'Analise_reinderizacao.pdf', encoding: 'binary' },
        { filePath: 'Analise_reinderizacao01.pdf', encoding: 'binary' },
        { filePath: 'Analise_reinderizacao03.png', encoding: 'binary' },
      ], { force: true });

    cy.wait(4000);
    cy.get(elementos.Salvartodos).last().click();
  });

  it('8 Editar Arquivo', () => {
    cy.log('8 Editar Arquivo');
    cy.get(elementos.avancarpag).click();
    cy.wait(1000);

    cy.get(elementos.tela)
      .contains('Usuario Automacao')
      .scrollIntoView()
      .closest(elementos.tela)
      .find(elementos.reticencias)
      .first()
      .click();

    cy.get(elementos.EditarArquivo).first().click();

    const randomNameEdit = faker.person.firstName();

    cy.get(elementos.Editarcampos).first().clear().type('Prodoc ' + faker.company.name() + '.pdf');
    cy.get(elementos.Editarcampos).eq(1).clear().type(`${faker.company.name()} ${randomNameEdit}`);
    cy.get(elementos.Editarcampos).last().clear().type(faker.lorem.sentence());

    cy.get(elementos.Salvaredicao).click();
    cy.get(elementos.voltar).click();
  });

  it('10 Visualizar Arquivo', () => {
    cy.log('10 Visualizar Arquivo');
    cy.reload();
    cy.get(elementos.avancarpag).click();
    cy.wait(1000);

    cy.get(elementos.tela)
      .contains('Usuario Automacao')
      .scrollIntoView()
      .closest(elementos.tela)
      .find(elementos.reticencias)
      .last()
      .click();

    cy.get(elementos.VisualizarArquivo).contains('Visualizar').click();
    cy.wait(3000);
    cy.get(elementos.close).click();
    cy.wait(1000);
  });

  it('13 Comentar', () => {
    cy.log('13 Comentar');

    cy.get(elementos.tela)
      .contains('Usuario Automacao')
      .scrollIntoView()
      .closest(elementos.tela)
      .find(elementos.reticencias)
      .last()
      .click();

    cy.get(elementos.ComentarArquivo).contains('Comentar').click();
    cy.get(elementos.campos).first().type(faker.lorem.sentence());
    cy.get(elementos.Salvartodos).click();
    cy.wait(1000);
    cy.get(elementos.close).click();
    cy.wait(1000);
  });

  it('14 Versionar', () => {
    cy.log('14 Versionar');

    cy.get(elementos.tela)
      .contains('Usuario Automacao')
      .scrollIntoView()
      .closest(elementos.tela)
      .find(elementos.reticencias)
      .last()
      .click();

    cy.get(elementos.VersionarArquivo).contains('Versionar').click();
    cy.get(elementos.Salvartodos).first().click();

    cy.get('input[type="file"]')
      .first()
      .attachFile({ filePath: 'Analise_reinderizacao.pdf', encoding: 'binary' }, { force: true });

    cy.wait(4000);

    cy.get(elementos.campos).last().type('Prodoc ' + faker.lorem.sentence());
    cy.get(elementos.Salvartodos).last().click();
    cy.get(elementos.close).click();
    cy.wait(1000);
  });

  it('15 Baixar arquivo', () => {
    cy.log('15 Baixar arquivo');

    cy.get(elementos.tela)
      .contains('Usuario Automacao')
      .scrollIntoView()
      .closest(elementos.tela)
      .find(elementos.reticencias)
      .last()
      .click();

    cy.get(elementos.BaixarArquivo).contains('Baixar').click();
  });

  it('12 Copiar Arquivo', () => {
    cy.log('12 Copiar Arquivo');
    cy.get(elementos.avancarpag).click();
    cy.wait(1000);

    cy.get(elementos.tela)
      .each(($linha) => {
        cy.wrap($linha).invoke('text').then((text) => {
          if (text.includes('Usuario Automacao')) {
            cy.wrap($linha).click();
            cy.wrap($linha).find('input[type="checkbox"]').last().click({ force: true });
          }
        });
      });

    cy.get(elementos.CopiarArquivo).first().click();
    cy.get(elementos.tela).last().contains('Repositório').click();
    cy.get(elementos.tela).last().contains('02 - Automacao').click();
    cy.get(elementos.confirmar).last().click();
    cy.get(elementos.ConfirmaOK).click();

    cy.reload();
    cy.get(elementos.tela).last().contains('02 - Automacao').dblclick();
    cy.get(elementos.selecionelista)
      .last()
      .contains('Usuario Automacao')
      .closest(elementos.selecionelista)
      .find(elementos.reticencias)
      .click();

    cy.get(elementos.ExcluirPasta).contains('Excluir').click();
    cy.get(elementos.ConfirmaExclusao).first().click();
    cy.wait(1000);
    cy.get(elementos.ConfirmaOK).last().click();
    cy.wait(2000);
    cy.reload();
  });

  it('11 Mover Arquivo', () => {
    cy.log('11 Mover Arquivo');
    cy.get(elementos.avancarpag).click();
    cy.wait(1000);

    cy.get(elementos.tela)
      .each(($linha) => {
        cy.wrap($linha).invoke('text').then((text) => {
          if (text.includes('Usuario Automacao')) {
            cy.wrap($linha).click();
            cy.wrap($linha).find('input[type="checkbox"]').last().click({ force: true });
          }
        });
      });

    cy.contains('Mover').click();
    cy.get(elementos.tela).last().contains('Repositório').click();
    cy.get(elementos.tela).last().contains('02 - Automacao').click();
    cy.get(elementos.confirmar).last().click();
    cy.get(elementos.ConfirmaOK).click();

    cy.reload();
    cy.get(elementos.tela).last().contains('02 - Automacao').dblclick();
    cy.get(elementos.selecionelista)
      .last()
      .contains('Usuario Automacao')
      .closest(elementos.selecionelista)
      .find(elementos.reticencias)
      .click();

    cy.get(elementos.ExcluirPasta).contains('Excluir').click();
    cy.get(elementos.ConfirmaExclusao).first().click();
    cy.wait(1000);
    cy.get(elementos.ConfirmaOK).last().click();
    cy.wait(2000);
    cy.reload();
  });

  it('9 Excluir Arquivo', () => {
    cy.log('9 Excluir Arquivo');
    cy.get(elementos.avancarpag).click();
    cy.wait(1000);

    cy.get(elementos.tela)
      .each(($linha) => {
        cy.wrap($linha).invoke('text').then((text) => {
          if (text.includes('Usuario Automacao')) {
            cy.wrap($linha).click();
            cy.wrap($linha).find('input[type="checkbox"]').last().click({ force: true });
          }
        });
      });

    cy.get(elementos.ExcluirSelecao).click();
    cy.get(elementos.ConfirmaExclusao).first().click();
    cy.wait(1000);
    cy.get(elementos.ConfirmaOK).last().click();
  });

});