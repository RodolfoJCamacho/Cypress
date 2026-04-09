import realizarLogin from '../../../support/locators/login.js';
import dados from '../../../fixtures/Massa_dados/dados.json';
import flow from '../../../support/flows/flow.js';
import locatorsRepositorio from '../../../support/locators/repositorio.js';
import RepositorioPage from '../../../support/pages/repositorio.js';
import excluir_pastas from '../../../support/z_clean_up/excluir_pastas.cy.js';
import HelpersPage from '../../../support/pages/HelpersPage.js'

describe('Acesso ao Sistema PRODOC | Fluxos e operações Repositório', () => {
  let repositorio;
  let excluir;
  
  before(() => {
    flow();
    realizarLogin(dados.usuario, dados.senha);

    // Instancia a página e o helper de exclusão apenas uma vez
    repositorio = new RepositorioPage();
    excluir = new excluir_pastas();
  });

  // 1 - Criar Pasta
  it('1 - Criar Pasta', () => {
    cy.log('1. Criar Pastas');
    
    cy.get(locatorsRepositorio.CriarPasta).click();
    cy.get(locatorsRepositorio.campos).first().type(repositorio.gerarNomePasta());
    cy.get(locatorsRepositorio.campos).eq(1).type(repositorio.gerarTitulo());
    cy.get(locatorsRepositorio.campos).last().type(repositorio.gerarDescricao());
    cy.get(locatorsRepositorio.salvar).click();
    
    cy.contains('Registro salvo com sucesso!', { timeout: 10000 }).should('be.visible');
  });

  // 2 - Editar Pasta
  it('2 - Editar Pasta', () => {
    cy.log('2. Editar Pasta');

    repositorio.clicarPrimeiraReticencia(locatorsRepositorio, dados.criador);
    
    cy.get(locatorsRepositorio.EditarPasta).first().click();
    cy.get(locatorsRepositorio.Editarcampos).first().clear().type(repositorio.gerarNomePasta());
    cy.get(locatorsRepositorio.Editarcampos).eq(0).clear().type(repositorio.gerarTitulo());
    cy.get(locatorsRepositorio.Editarcampos).last().clear().type(repositorio.gerarDescricao());
    cy.get(locatorsRepositorio.Salvaredicao).click();
    
    cy.get(locatorsRepositorio.voltar).click();
    cy.get('.z-loading').should('not.exist'); // espera o loading sumir
  });

  // 3 - Excluir Pasta
  it('3 - Excluir Pasta', () => {
    cy.log('3. Excluir Pasta');

    repositorio.clicarPrimeiraReticencia(locatorsRepositorio, dados.criador);
    excluir.excluirPasta(locatorsRepositorio, dados.criador);
  });

  // 4 - Visualizar Pasta
 it('4 - Visualizar Pasta', () => {
   cy.log('4. Visualizar Pasta');

    
    const repositorio = new RepositorioPage();

    repositorio.selecionarPastaCriada(locatorsRepositorio, dados.criador);
  });

  // 5 - Mover Pasta
  it('5 - Mover Pasta', () => {
    cy.log('5. Mover Pasta');

    const repositorio = new RepositorioPage();
    repositorio.selecionarPastaCriadackeck(locatorsRepositorio, dados.criador); //selecionarPastaCriadackeck
    repositorio.moverPasta(locatorsRepositorio);
    

  });

  it('6 Botão Limpar', () => {

    cy.log('6 Botão Limpar');

 
   
  });

  // 2 História Arquivos

  it('7 Enviar Arquivo', () => {

    cy.log('7 Enviar Arquivo');

   

   
  });
  it('8 Editar Arquivo', () => {

    cy.log('8 Editar Arquivo');

   

   
  });
  it('9 Excluir Arquivo', () => {

    cy.log('9 Excluir Arquivo');

   

   
  });
  it('10 Visualizar Arquivo', () => {

    cy.log('10 Visualizar Arquivo');

   

   
  });
  it('11 Mover Arquivo', () => {

    cy.log('11 Mover Arquivo');

   

   
  });
  it('12 Copiar Arquivo', () => {

    cy.log('12 Copiar Arquivo');

   

   
  });
  it('13 Comentar', () => {

    cy.log('13 Comentar');

   

   
  });
  it('14 Versionar', () => {

    cy.log('14 Versionar');

   

   
  });
  it('15 Baixar arquivo', () => {

    cy.log('15 Baixar arquivo');

   
   
  });

  // 3 Historia Versão de Documentos

  it('16 Adicionar Versão', () => {

    cy.log('16 Adicionar Versão');

      
  });
  it('17 Visualizar Versões', () => {

    cy.log('17 Visualizar Versões');

   

   
  });
  it('18 Excluir Versão', () => {

    cy.log('18 Excluir Versão');

   

   
  });
  it('19 Selecionar versão maior|menos versão', () => {

    cy.log('19 Selecionar versão maior|menos versão');

   

   
  });
  it('20 Download do arquivo', () => {

    cy.log('20 Download do arquivo');

   

   
  });

  //4 Historia Comentário de Arquivos

  it('21 Criar Comentário', () => {

    cy.log('21 Criar Comentário');

      
  });

  it('22 Excluir Comentário', () => {

    cy.log('22 Excluir Comentário');

   

   
  });
  it('23 Editar Comentário', () => {

    cy.log('23 Editar Comentário');

   

   
  });
  it('24 Visualizar Comentario', () => {

    cy.log('24 Visualizar Comentario');

   

   
  });
  it('25 Botão Cancelar / X', () => {

    cy.log('25 Botão Cancelar / X');

   

   
  });
  

   }); 

