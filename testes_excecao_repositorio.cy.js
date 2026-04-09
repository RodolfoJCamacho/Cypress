import realizarLogin from '../../../support/locators/login.js'
import dados from '../../../fixtures/Massa_dados/dados.json'
import flow from '../../../support/flows/flow.js'


describe('Acesso ao Sistema PRODOC | Fluxos e operações Repositório', () => {
before(() => {
  flow()
  realizarLogin(dados.usuario, dados.senha)
})

//Fluxo Exceção

//1 Historia Pasta 

  it('26 Campo Nome (obrigatório) Tentar Salvar com o campo vazio', () => {

    cy.log('26 Campo Nome (obrigatório) Tentar Salvar com o campo vazio');
       
   
  });

   it('27 Informar só espaços', () => {

    cy.log('27 Informar só espaços');
    
   
   
  });
   it('28 Exceder limite de caracteres', () => {

    cy.log('28 Exceder limite de caracteres');
    
   

   
  });
 it('29 Usar caracteres inválidos', () => {

    cy.log('29 Usar caracteres inválidos');
    
   

   
  });
 it('30 Campo Nome já existente → erro de duplicidade.', () => {

    cy.log('30 Campo Nome já existente → erro de duplicidade.');
    
   

   
  });
 it('31 Nome com formatação não permitida (ex: símbolos proibidos)', () => {

    cy.log('31 Nome com formatação não permitida (ex: símbolos proibidos)');
    
   

   
  });
 it('32 Campo Título Exceder limite de caracteres', () => {

    cy.log('32 Campo Título Exceder limite de caracteres');
    
   

   
  });
 it('33 Campo Descrição Exceder limite de caracteres', () => {

    cy.log('33 Campo Descrição Exceder limite de caracteres');
    
   

   
  });
 it('Conteúdo inválido (HTML/script, se houver bloqueio)', () => {

    cy.log('Conteúdo inválido (HTML/script, se houver bloqueio)');
    
   

   
  });
 it('35 Apenas espaços → erro (se houver validação). (nome, título e descrição)', () => {

    cy.log('35 Apenas espaços → erro (se houver validação). (nome, título e descrição)');
    
   

   
  });
 it('36 Botão Salvar Clicar com dados inválidos → não salva + mensagem.', () => {

    cy.log('36 Botão Salvar Clicar com dados inválidos → não salva + mensagem.');
    
   

   
  });
 it('37 As validações dos campos nome, título e descrição deverão ser feitas nos fluxos de incluir e editar uma pasta.', () => {

    cy.log('37 As validações dos campos nome, título e descrição deverão ser feitas nos fluxos de incluir e editar uma pasta.');
    
   

   
  });
 it('37.1 Mover uma pasta para dentro dela mesmo', () => {

    cy.log('37.1 Mover uma pasta para dentro dela mesmo');
    
   


   //2 Historia Arquivos 

   
  });
 it('38 Seleção de arquivos Clicar em Selecionar arquivo(s) e cancelar a seleção → nenhum arquivo listado.', () => {

    cy.log('38 Seleção de arquivos Clicar em Selecionar arquivo(s) e cancelar a seleção → nenhum arquivo listado.');
    
   

   
  });
 it('39 Selecionar arquivo com extensão não permitida', () => {

    cy.log('39 Selecionar arquivo com extensão não permitida');
    
   

   
  });
 it('40 Selecionar arquivo com formato não cadastrado no sistema (text/plain, application/pdf, audio/mp3, audio/mp4);', () => {

    cy.log('40 Selecionar arquivo com formato não cadastrado no sistema (text/plain, application/pdf, audio/mp3, audio/mp4);');
    
      
  });
 it('41 Selecionar arquivo cuja extensão não corresponde ao formato cadastrado no sistema (Exemplo: arquivo PDF com extensão .txt)', () => {

    cy.log('41 Selecionar arquivo cuja extensão não corresponde ao formato cadastrado no sistema (Exemplo: arquivo PDF com extensão .txt)');
    
   

   
  });
 it('42 Selecionar arquivo acima do tamanho máximo', () => {

    cy.log('42 Selecionar arquivo acima do tamanho máximo');
    
   

   
  });
 it('43 Selecionar arquivo acima do tamanho máximo unitário (5MB)', () => {

    cy.log('43 Selecionar arquivo acima do tamanho máximo unitário (5MB)');
    
      
  });
 it('44 Selecionar arquivos acima do tamanho máximo do pacote (100MB)', () => {

    cy.log('44 Selecionar arquivos acima do tamanho máximo do pacote (100MB)');
    
   

   
  });
 it('45 Selecionar arquivo vazio (0 KB)', () => {

    cy.log('45 Selecionar arquivo vazio (0 KB)');
    
   

   
  });
 it('46 Selecionar arquivo corrompido', () => {

    cy.log('46 Selecionar arquivo corrompido');
    
   

   
  });
 it('47 Selecionar arquivo com nome muito longo', () => {

    cy.log('47 Selecionar arquivo com nome muito longo');
    
   

   
  });
 it('48 Selecionar arquivo com caracteres inválidos no nome', () => {

    cy.log('48 Selecionar arquivo com caracteres inválidos no nome');
    
   

   
  });
 it('49 Selecionar arquivo duplicado (mesmo nome/conteúdo)', () => {

    cy.log('49 Selecionar arquivo duplicado (mesmo nome/conteúdo)');
    
   

   
  });
 it('50 Selecionar arquivos e a lista não renderizar → erro de UI.', () => {

    cy.log('50 Selecionar arquivos e a lista não renderizar → erro de UI.');
    
   

   
  });
 it('51 Botão Salvar Todos Clicar sem nenhum arquivo selecionado → erro de validação.', () => {

    cy.log('51 Botão Salvar Todos Clicar sem nenhum arquivo selecionado → erro de validação.');
    
   

   
  });
 it('52 Botão Fechar / X Fechar com arquivos já selecionados sem confirmação → perda de dados.', () => {

    cy.log('52 Botão Fechar / X Fechar com arquivos já selecionados sem confirmação → perda de dados.');
    
   

   
  });
 it('53 Fechar durante upload em andamento → upload interrompido.', () => {

    cy.log('53 Fechar durante upload em andamento → upload interrompido.');
    
   

   
  });
 it('54 Edição de arquivo - conteúdo inválido (HTML/script, se houver bloqueio) para nome, título e descrição', () => {

    cy.log('54 Edição de arquivo - conteúdo inválido (HTML/script, se houver bloqueio) para nome, título e descrição');
    
   

   
  });
 it('55 Edição de arquivo - caracteres inválidos para nome, título e descrição.', () => {

    cy.log('55 Edição de arquivo - caracteres inválidos para nome, título e descrição.');
    
   

   
  });
 it('56 Edição de arquivo - limite de tamanho para nome, título e descrição.', () => {

    cy.log('56 Edição de arquivo - limite de tamanho para nome, título e descrição.');
    
   

   
  });
 it('57 Edição de arquivo - conteúdo vazio para nome, título e descrição.', () => {

    cy.log('57 Edição de arquivo - conteúdo vazio para nome, título e descrição.');
    
   

   
  });

  // 3 Historia Versão de Documentos

 it('58 Clicar em Adicionar uma nova versão e não adicionar o arquivo', () => {

    cy.log('58 Clicar em Adicionar uma nova versão e não adicionar o arquivo');
    
   
   
  });

 it('59 Formato não cadastrado no sistema.', () => {

    cy.log('59 Formato não cadastrado no sistema.');
    
   
   
  });
 it('60 Extensão não bate com o formato cadastrado no sistema.', () => {

    cy.log('60 Extensão não bate com o formato cadastrado no sistema.');
    
   

   
  });
 it('61 Selecionar arquivo maior que o limite permitido → erro.', () => {

    cy.log('61 Selecionar arquivo maior que o limite permitido → erro.');
    
   

   
  });
it('62 Selecionar arquivo vazio (0 KB) → erro.', () => {

    cy.log('62 Selecionar arquivo vazio (0 KB) → erro.');
    
   

   
  });

  it('63 Selecionar arquivo corrompido → erro.', () => {

    cy.log('63 Selecionar arquivo corrompido → erro.');
    
   

   
  });

  it('64 Selecionar arquivo com nome inválido', () => {

    cy.log('64 Selecionar arquivo com nome inválido');
    
   

   
  });

  it('65 Selecionar arquivo igual à versão atual (mesmo hash)', () => {

    cy.log('65 Selecionar arquivo igual à versão atual (mesmo hash)');
    
   

   
  });

  it('66 Comentário com script/HTML → bloqueio.', () => {

    cy.log('66 Comentário com script/HTML → bloqueio.');
    
      
  });

  //4 Historia Comentário de Arquivos

  it('67 Campo Novo Comentário Clicar Salvar com campo vazio → erro de validação.', () => {

    cy.log('67 Campo Novo Comentário Clicar Salvar com campo vazio → erro de validação.');
    
   

   
  });

  it('68 Campo Novo Comentário Informar apenas espaços', () => {

    cy.log('68 Campo Novo Comentário Informar apenas espaços');
    
   

   
  });

  it('69 Campo Novo Comentário Exceder limite máximo de caracteres → erro.', () => {

    cy.log('69 Campo Novo Comentário Exceder limite máximo de caracteres → erro.');
    
   

   
  });

  it('70 Campo Novo Comentário Inserir HTML / script → bloqueio ou sanitização.', () => {

    cy.log('70 Campo Novo Comentário Inserir HTML / script → bloqueio ou sanitização.');
    
   

   
  });


});