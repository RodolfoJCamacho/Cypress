import { faker } from '@faker-js/faker/locale/pt_BR';
import { elementos } from '../../../support/selectors';


describe('Acesso ao Sistema PRODOC | Fluxos e operações Repositório', () => {

 

  before(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit('/');
    cy.get(elementos.loginButtoname).type(Cypress.env('usuario01'));
    cy.get(elementos.passwordInput).type(Cypress.env('senha01'));
    cy.get(elementos.loginButton).click();
    cy.wait(1000);
  });

  
  // 1 - Criar Pasta
  it('26 Campo Nome (obrigatório) Tentar Salvar com o campo vazio', () => {
    
    cy.get(elementos.CriarPasta).first().click();
    cy.get(elementos.salvar).click();
    cy.get(elementos.ConfirmaOK).click()
    cy.wait(1000);
   
  });


  it('27 Informar só espaços', () => {
   
 const randomNameEdit = faker.person.firstName();


// digita espaço literal e TAB
cy.get(elementos.campos).first().click().type(' ');

cy.get(elementos.campos).eq(1)
  .clear()
  .type(`${faker.company.name()} ${randomNameEdit}`);

cy.get(elementos.campos).last()
  .clear()
  .type(faker.lorem.sentence());

cy.get(elementos.salvar).click();
cy.get(elementos.ConfirmaOK).click();
    
  });

   it('28 Exceder limite de caracteres', () => {
   
    
    const randomNameEdit = faker.person.firstName();
    const longText = faker.lorem.paragraphs(4)
    
    cy.get(elementos.campos).first().clear().type(longText);
    cy.get(elementos.campos).eq(1).clear().type(`${faker.company.name()} ${randomNameEdit}`);
    cy.get(elementos.campos).last().clear().type(faker.lorem.sentence());
    
    cy.wait(1000);
cy.get(elementos.close).click();
   
  });

 
  it('29 Usar caracteres inválidos', () => {

  cy.get(elementos.CriarPasta).first().click();
  cy.get(elementos.campos)
  .first()
  .clear()
  .type(Cypress.env('dadosinvalidos'));
  cy.get(elementos.salvar).click();
  cy.get(elementos.ConfirmaOK).click()
  cy.wait(1000);
  cy.get(elementos.close).click();
   
  });


  it('30 Campo Nome já existente → erro de duplicidade', () => {


    cy.get(elementos.CriarPasta).first().click();
    cy.get(elementos.campos).first().type(Cypress.env('nomepasta4'));
    cy.get(elementos.salvar).click();
    cy.wait(1000);
    cy.get(elementos.CriarPasta).first().click();
    cy.get(elementos.campos).first().type('nomepasta4');
    cy.get(elementos.salvar).click();
    cy.get(elementos.ConfirmaOK).click()
    cy.wait(1000);
    cy.get(elementos.close).click();
    cy.wait(1000);
   
    cy.contains('10 - Automacao', { timeout: 10000 })
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

 
  it('31 Nome com formatação não permitida ex: símbolos proibidos',() => {
    
  cy.get(elementos.CriarPasta).first().click();
  cy.get(elementos.campos)
  .first()
  .clear()
  .type(Cypress.env('dadosinvalidos'));
    cy.get(elementos.campos).eq(1).clear().type(Cypress.env('dadosinvalidos'))
    cy.get(elementos.campos).last().clear().type(Cypress.env('dadosinvalidos'))
  cy.get(elementos.salvar).click();
  cy.get(elementos.ConfirmaOK).click()
  cy.wait(1000);
  cy.get(elementos.close).click();
   
         
  });

  it('32 Campo Título Exceder limite de caracteres)', () => {
    
 cy.get(elementos.CriarPasta).first().click();

     const randomNameEdit = faker.person.firstName();
     const longText = faker.lorem.paragraphs(4)
    
    cy.get(elementos.campos).first().clear().type(longText);
    cy.get(elementos.campos).eq(1).clear().type(longText)
    cy.get(elementos.campos).last().clear().type(longText);
    
    cy.wait(1000);
    cy.get(elementos.close).click();
   
});

it('33 Campo Descrição Exceder limite de caracteres)', () => {
    
    const randomNameEdit = faker.person.firstName();
     const longText = faker.lorem.paragraphs(4)
    cy.get(elementos.CriarPasta).first().click();
    cy.get(elementos.campos).first().type(faker.lorem.sentence());
    cy.get(elementos.campos).eq(1).clear().type(`${faker.company.name()} ${randomNameEdit}`);
     cy.get(elementos.campos).last().clear().type(longText);
    
     cy.get(elementos.close).click();
     cy.wait(1000);

     
  });

it('34 Conteúdo inválido (HTML/script, se houver bloqueio)', () => {
    
  cy.reload();
    cy.get(elementos.CriarPasta).first().click();
    cy.get(elementos.campos).first().type(Cypress.env('codigohtml'));
    cy.get(elementos.campos).eq(1).type(Cypress.env('codigohtml'));
    cy.get(elementos.campos).last().type(Cypress.env('codigohtml'));
    cy.get(elementos.salvar).click();
    cy.get(elementos.ConfirmaOK).click()
    cy.wait(1000);
    cy.get(elementos.close).click();

   
  });

it('35 Apenas espaços → erro (se houver validação). (nome, ơtulo e descrição)', () => {
   cy.reload();  

  const randomNameEdit = faker.person.firstName();
cy.get(elementos.CriarPasta).first().click();

// digita espaço literal e TAB
cy.get(elementos.campos).first().click().type(' ');

cy.get(elementos.campos).eq(1)
  .clear()
  .type(`${faker.company.name()} ${randomNameEdit}`);

cy.get(elementos.campos).last()
  .clear()
  .type(faker.lorem.sentence());

cy.get(elementos.salvar).click();
cy.get(elementos.ConfirmaOK).first().click();
cy.wait(1000);
cy.get(elementos.close).click();
cy.wait(1000);

  });

  it('36 Botão Salvar Clicar com dados inválidos → não salva + mensagem.', () => {
   
    cy.get(elementos.CriarPasta).first().click();
    cy.get(elementos.salvar).click();
    cy.get(elementos.ConfirmaOK).click()
    cy.wait(1000);
    cy.get(elementos.close).click();
   
  });

 it('37 As validações dos campos nome, ơtulo e descrição deverão ser feitas nos fluxos de incluir e editaruma pasta.', () => {
    
cy.get(elementos.CriarPasta).first().click();
    cy.get(elementos.campos).first().type(Cypress.env('nomedapasta3'));
    cy.get(elementos.campos).eq(1).type(Cypress.env('titulodapasta'));
    cy.get(elementos.campos).last().type(Cypress.env('descricao'));
    cy.get(elementos.salvar).click();
    cy.reload();
    cy.wait(1000);

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

 it('37.1 Mover uma pasta para dentro dela mesma', () => {
    
  cy.get(elementos.tela).last()

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


});