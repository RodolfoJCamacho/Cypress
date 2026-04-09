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

   
  it('38 Seleção de arquivos Clicar em Selecionar arquivo(s) e cancelar a seleção → nenhum arquivo listado.', () => {


    cy.get(elementos.EnviarArquivo).first().click();

    cy.get('input[type="file"]')
      .first()
      .attachFile([
        { filePath: 'Analise_reinderizacao.pdf', encoding: 'binary' },
        { filePath: 'Analise_reinderizacao01.pdf', encoding: 'binary' },
        { filePath: 'Analise_reinderizacao03.png', encoding: 'binary' },
      ], { force: true });

    cy.wait(4000);
    cy.get(elementos.fechar).click();


  });

  
  it('39 Selecionar arquivo com extensão não permitido', () => {


    cy.get(elementos.EnviarArquivo).first().click();

 cy.get('input[type="file"]')
      .first()
      .attachFile([
        { filePath: 'Analise_reinderizacao02.tar', encoding: 'binary' },
       
      ], { force: true });

    cy.wait(4000);
    cy.get(elementos.Salvartodos).last().click();
    cy.wait(1000)
     cy.get(elementos.ConfirmaOK).click();
     cy.wait(1000)
    cy.get(elementos.close).click();
   
     }); 
  
  it('40 Selecionar arquivo com formato não cadastrado no sistema (text/plain, applicaƟon/pdf, audio/mp3,audio/mp4);', () => {
  

     cy.get(elementos.EnviarArquivo).first().click();

 cy.get('input[type="file"]')
      .first()
      .attachFile([
        { filePath: 'Analise_reinderizacao02.tar', encoding: 'binary' },
       
      ], { force: true });

    cy.wait(4000);
    cy.get(elementos.Salvartodos).last().click();
    cy.wait(1000)
     cy.get(elementos.ConfirmaOK).click();
     cy.wait(1000)
    cy.get(elementos.close).click();
  
     }); 
  
  it('41 Selecionar arquivo cuja extensão não corresponde ao formato cadastrado no sistema (Exemplo:arquivo PDF com extensão .js)', () => {
 
    cy.reload();

    cy.get(elementos.EnviarArquivo).first().click();

 cy.get('input[type="file"]')
      .first()
      .attachFile([
        { filePath: 'Analise_reinderizacao02.tar', encoding: 'binary' },
       
      ], { force: true });

     cy.wait(4000);
    cy.get(elementos.Salvartodos).last().click();
    cy.wait(1000)
     cy.get(elementos.ConfirmaOK).click();
     cy.wait(1000)
    cy.get(elementos.close).click();
   
     }); 
  
  
  it('42 Selecionar arquivo acima do tamanho máximo', () => {
  
      cy.get(elementos.EnviarArquivo).first().click();

    cy.get('input[type="file"]')
      .first()
      .attachFile([
               { filePath: 'arquivo_maior_5mg.pdf', encoding: 'binary' },
      ], { force: true });

    cy.wait(4000);
     cy.get(elementos.ConfirmaOK).click();
     cy.wait(1000);
   cy.get(elementos.close).click();

  });

  
  it('43 Selecionar arquivo acima do tamanho máximo unitário (5MB)', () => {
   
      cy.get(elementos.EnviarArquivo).first().click();

    cy.get('input[type="file"]')
      .first()
      .attachFile([
               { filePath: 'arquivo_maior_5mg.pdf', encoding: 'binary' },
      ], { force: true });

     cy.wait(4000);
     cy.get(elementos.ConfirmaOK).click();
     cy.wait(1000);
   cy.get(elementos.close).click();


  });

   it('44 Selecionar arquivos acima do tamanho máximo do pacote (100MB)', () => {
    
    //acima de 100 megas o cypress não consegue fazer o upload mesmo zipado pois 

//O Node precisa carregar 100MB na memória.
//O Cypress serializa o arquivo em base64 para enviar para o browser.
//Base64 aumenta o tamanho do arquivo em ~33%, então 100MB vira ~133MB.
//O browser precisa manter esse arquivo em memória para “simular” o upload.
//Se a máquina não tiver RAM suficiente, o Cypress travará ou falhará.
//O timeout padrão (cy.fixture() tem 60s) pode ser excedido antes do fim da operação.

   // cy.get(elementos.EnviarArquivo).first().click();
    //cy.wait(4000);
    //cy.get('input[type="file"]')
   //   .first()
    //  .attachFile([
    //    { filePath: 'Arquitetura_prodemge.zip.zip', encoding: 'binary' },
    //   ], { force: true });

   // cy.wait(4000);
    // cy.get(elementos.ConfirmaOK).click();
   //  cy.wait(1000);
  // cy.get(elementos.close).click();

   
  });

   it('45 Selecionar arquivo vazio (0 KB)', () => {
    
     cy.get(elementos.EnviarArquivo).first().click();

   cy.get('input[type="file"]')
      .first()
      .attachFile([
        { filePath: 'arquivo_vazio.txt', encoding: 'binary' },
       
      ], {  allowEmpty: true, force: true });

    cy.wait(4000);
    cy.get(elementos.close).click()

   
  });
  
       it('46 Selecionar arquivo corrompido', () => {
   
cy.get(elementos.EnviarArquivo).first().click();

    cy.get('input[type="file"]')
      .first()
      .attachFile([
        { filePath: 'enviar_arquivos_corrupt.png', encoding: 'binary' },
       ], { force: true });
  cy.wait(1000)
         cy.get(elementos.close).click()
         cy.wait(1000);
      });

   it('47 Selecionar arquivo com nome muito longo)', () => {
    
      cy.get(elementos.EnviarArquivo).first().click();

    cy.get('input[type="file"]')
      .first()
      .attachFile([
        { filePath: 'Hoje existem duas histórias do ambiente desenvolvimento no diretorio de execução do projeto (e2e) que estão na pipeline PipelineHojeexistem duas histórias dHo.pdf', encoding: 'binary' },
       ], { force: true });
       cy.wait(4000);
  cy.get(elementos.close).click()
    cy.wait(1000);
   
    

  });
  
   it('48 Selecionar arquivo com caracteres inválidos no nome', () => {
    
       cy.get(elementos.EnviarArquivo).first().click();

    cy.get('input[type="file"]')
      .first()
      .attachFile([
        { filePath: '@#$$%%¨¨&&&.pdf', encoding: 'binary' },
       
      ], { force: true });

    cy.wait(4000);
    cy.get(elementos.close).click()
    

     });

   it('49 Selecionar arquivo duplicado (mesmo nome/conteúdo)', () => {
    
      cy.get(elementos.EnviarArquivo).first().click();

    cy.get('input[type="file"]')
      .first()
      .attachFile([
        { filePath: 'Analise_reinderizacao.pdf', encoding: 'binary' },
        { filePath: 'Analise_reinderizacao.pdf', encoding: 'binary' },
        ], { force: true });

    cy.wait(4000);
    cy.get(elementos.Salvartodos).last().click();
      cy.wait(1000);
    cy.get(elementos.ConfirmaOK).click(); 
      cy.wait(1000);
    cy.get(elementos.close).click()
    cy.wait(1000);



     });

   it('50 Selecionar arquivos e a lista não renderizar → erro de UI.)', () => {
    
      cy.get(elementos.EnviarArquivo).first().click();

    cy.get('input[type="file"]')
      .first()
      .attachFile([
        { filePath: 'Analise_reinderizacao.pdf', encoding: 'binary' },
            ], { force: true });

    cy.wait(4000);
    cy.get(elementos.Salvartodos).last().click();


     });

   it('51 Botão Salvar Todos Clicar sem nenhum arquivo selecionado → erro de validação.', () => {
    
    cy.reload();
     cy.get(elementos.EnviarArquivo).first().click();

      cy.wait(4000);
    cy.get(elementos.Salvartodos).last().click();

     cy.get(elementos.ConfirmaOK).click(); 

    cy.wait(1000);
    cy.get(elementos.close).click()

     });

 it('52 Botão Fechar / X Fechar com arquivos já selecionados sem confirmação → perda de dados.', () => {
    
      cy.get(elementos.EnviarArquivo).first().click();

    cy.get('input[type="file"]')
      .first()
      .attachFile([
        { filePath: 'Analise_reinderizacao.pdf', encoding: 'binary' },
            ], { force: true });

    cy.wait(4000);
    cy.get(elementos.fechar).click();

     });

 it('53 Fechar durante upload em andamento → upload interrompido.', () => {
    
      cy.get(elementos.EnviarArquivo).first().click();

    cy.get('input[type="file"]')
      .first()
      .attachFile([
        { filePath: 'Analise_reinderizacao.pdf', encoding: 'binary' },
          ], { force: true });
   
    cy.get(elementos.close).click();


     });

  it('54 Edição de arquivo - conteúdo inválido HTML/script, se houver bloqueio para nome, titulo descrição)', () => {
     
    cy.reload();
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
    cy.wait(1000);
    cy.get(elementos.Editarcampos).first().clear().type(Cypress.env('codigohtml'));
    cy.wait(1000);
    cy.get(elementos.Editarcampos).eq(1).clear().type(Cypress.env('codigohtml'));
    cy.wait(1000);
    cy.get(elementos.Editarcampos).last().clear().type(Cypress.env('codigohtml'));

    cy.get(elementos.Salvaredicao).click();
    cy.wait(1000);  
    cy.get(elementos.ConfirmaOK).click();
     cy.wait(1000);
    cy.get(elementos.voltar).click();


     });

   it('55 Edição de arquivo - caracteres inválidos para nome, ơtulo e descrição.', () => {
        
//cy.get(elementos.avancarpag).click();
   // cy.wait(1000);

    cy.reload();
    cy.get(elementos.tela)
      .contains('Usuario Automacao')
      .scrollIntoView()
      .closest(elementos.tela)
      .find(elementos.reticencias)
      .first()
      .click();
   cy.get(elementos.EditarArquivo).first().click();
    cy.wait(1000);
    cy.get(elementos.Editarcampos).first().clear().type(Cypress.env('dadosinvalidos'));
    cy.wait(1000);
    cy.get(elementos.Editarcampos).eq(1).clear().type(Cypress.env('dadosinvalidos'));
    cy.wait(1000);
    cy.get(elementos.Editarcampos).last().clear().type(Cypress.env('dadosinvalidos'));

    cy.get(elementos.Salvaredicao).click();
    cy.wait(1000);
    cy.get(elementos.ConfirmaOK).click();
     cy.wait(1000);
    cy.get(elementos.voltar).click();


     });

  it('56 Edição de arquivo - limite de tamanho para nome, ơtulo e descrição.', () => {

    //cy.get(elementos.avancarpag).click();
    //cy.wait(1000);

    cy.reload();

    cy.get(elementos.tela)
      .contains('Usuario Automacao')
      .scrollIntoView()
      .closest(elementos.tela)
      .find(elementos.reticencias)
      .first()
      .click();
    cy.get(elementos.EditarArquivo).first().click();
    cy.wait(1000);


  const longText = faker.lorem.paragraphs(4)
    
    cy.get(elementos.Editarcampos).first().clear().type(longText);
    cy.wait(1000);
    cy.get(elementos.Editarcampos).eq(1).clear().type(longText);
    cy.wait(1000);
    cy.get(elementos.Editarcampos).last().clear().type(longText);
    cy.wait(1000);
    cy.get(elementos.voltar).click();

       
     });

 it('57 Edição de arquivo - conteúdo vazio para nome, ơtulo e descrição.)', () => {

    //cy.get(elementos.avancarpag).click();
   // cy.wait(1000);
 cy.reload();
    cy.get(elementos.tela)
      .contains('Usuario Automacao')
      .scrollIntoView()
      .closest(elementos.tela)
      .find(elementos.reticencias)
      .first()
      .click();
    cy.get(elementos.EditarArquivo).first().click();

    cy.get(elementos.Editarcampos).first().clear()
    cy.get(elementos.Editarcampos).eq(1).clear().type(Cypress.env('dadosinvalidos'));
    cy.wait(1000);
    cy.get(elementos.Editarcampos).last().clear().type(Cypress.env('dadosinvalidos'));
    cy.wait(1000);

    cy.get(elementos.Salvaredicao).click();

    cy.get(elementos.ConfirmaOK).click();
     cy.wait(1000);
    cy.get(elementos.voltar).click();

    
    });

  
   
});
