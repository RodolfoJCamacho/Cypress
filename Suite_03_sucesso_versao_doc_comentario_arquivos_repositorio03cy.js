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

  // 16 Adicionar Versão
  it('16 Adicionar Versão', () => {
    cy.log('16 Adicionar Versão');
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

    cy.get(elementos.VersionarArquivo).contains('Versionar').click();
    cy.get(elementos.Salvartodos).first().click();
    cy.get('input[type="file"]')
      .first()
      .attachFile({ filePath: 'Analise_reinderizacao.pdf', encoding: 'binary' }, { force: true });

    cy.get(elementos.versoes).last().click();
    cy.get(elementos.campos).last().type('Prodoc ' + faker.lorem.sentence());
    cy.get(elementos.Salvartodos).last().click();
    cy.get(elementos.close).click();
    cy.wait(1000);
  });

  // 17 Visualizar Versões
  it('17 Visualizar Versões', () => {
    cy.reload();
    cy.log('17 Visualizar Versões');
    cy.get(elementos.avancarpag).click();
    cy.get(elementos.tela)
      .contains('Usuario Automacao')
      .scrollIntoView()
      .closest(elementos.tela);

    cy.get(elementos.reticencias)
      .should('have.length.greaterThan', 0)
      .last()
      .should('be.visible')
      .as('reticenciaItem');

    cy.get('@reticenciaItem').click();
    cy.wait(500);
    cy.get(elementos.VersionarArquivo).contains('Versionar').click();
    cy.wait(500);
    cy.get(elementos.close).click();
  });

  // 18 Excluir Versão
  it('18 Excluir Versão', () => {
    cy.log('18 Excluir Versão');
    cy.get(elementos.tela)
      .contains('Usuario Automacao')
      .scrollIntoView()
      .closest(elementos.tela);

    cy.get(elementos.reticencias)
      .last()
      .as('reticenciaItem');

    cy.get('@reticenciaItem').click();
    cy.get(elementos.VersionarArquivo).contains('Versionar').click();
    cy.wait(500);
    cy.get(elementos.versionamentotela).should('be.visible');
    cy.get(elementos.Excluirversao).last().click();
    cy.get(elementos.ConfirmaExclusao).first().click();
    cy.get(elementos.close).last().click();
  });

  // 19 Selecionar versão maior|menos versão
  it('19 Selecionar versão maior|menos versão', () => {
    cy.log('19 Selecionar versão maior|menos versão');
    cy.reload();
    cy.get(elementos.avancarpag).click();
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

    cy.get(elementos.versoes).last().click();
    cy.get(elementos.versoes).first().click();
    cy.get(elementos.campos).last().type('Prodoc ' + faker.lorem.sentence());
    cy.get(elementos.Salvartodos).last().click();
    cy.get(elementos.close).click();
    cy.wait(1000);
  });

  // 20 Download do arquivo
  it('20 Download do arquivo', () => {
    cy.log('20 Download do arquivo');

    cy.get(elementos.tela)
      .contains('Usuario Automacao')
      .scrollIntoView()
      .closest(elementos.tela);

    cy.get(elementos.reticencias)
      .last()
      .as('reticenciaItem');

    cy.get('@reticenciaItem').click();
    cy.get(elementos.BaixarArquivo).contains('Baixar').click();
  });

  // 21 Criar Comentário
  it('21 Criar Comentário', () => {
    cy.log('21 Criar Comentário');
    cy.get(elementos.tela)
      .contains('Usuario Automacao')
      .scrollIntoView()
      .closest(elementos.tela);
    cy.get(elementos.reticencias)
      .last()
      .as('reticenciaItem');
    cy.get('@reticenciaItem').click();
    cy.get(elementos.ComentarArquivo).contains('Comentar').click();
    cy.get(elementos.campos).first().type(faker.lorem.sentence());
    cy.get(elementos.Salvartodos).click();
  });

  // 23 Editar Comentário
  it('23 Editar Comentário', () => {
    cy.log('23 Editar Comentário');
    cy.get(elementos.tela).last();
    cy.get(elementos.Editarcomentario).last().click();
    cy.get(elementos.campos).first().type(faker.lorem.sentence());
    cy.get(elementos.Salvartodos).last().click();
    cy.get(elementos.close).first().click();
    cy.wait(1000);
  });

  // 24 Visualizar Comentario
  it('24 Visualizar Comentario', () => {
    cy.log('24 Visualizar Comentario');
    cy.get(elementos.tela)
      .contains('Usuario Automacao')
      .scrollIntoView()
      .closest(elementos.tela);
    cy.get(elementos.reticencias)
      .last()
      .as('reticenciaItem');
    cy.get('@reticenciaItem').click();
    cy.get(elementos.ComentarArquivo).contains('Comentar').click();
  });

  // 22 Excluir Comentário
  it('22 Excluir Comentário', () => {
    cy.log('22 Excluir Comentário');
    cy.get(elementos.tela).last();
    cy.get(elementos.Excluircomentario).last().click();
    cy.get(elementos.ConfirmaExclusao).first().click();
    cy.get(elementos.ConfirmaOK).first().click();
  });

  // 25 Botão Cancelar / X
  it('25 Botão Cancelar / X', () => {
    cy.log('25 Botão Cancelar / X');
    cy.get(elementos.Cancelarcomentario).click();

    cy.get(elementos.tela)
      .should('have.length.greaterThan', 0)
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