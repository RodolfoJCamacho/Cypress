// RepositorioPage.js
export default class RepositorioPage {
  constructor() {
    // Dados fake para gerar pastas, títulos e descrições
    this.sobrenomes = [
      "Estrutura_Societária", "Atos_Societários", "Conselho Administração",
      "Assembleia Geral Acionistas", "Compliance Corporativo", "Código Conduta Etica",
      "Contratos Empresariais", "Fusões Aquisições M&A", "Due Diligence Corporativa",
      "Planejamento_Societário", "Holdings_e_Controladas", "Acordo_de_Acionistas",
      "Reestruturação_Empresarial", "Relações_com_Investidores", "Política_de_Dividendos",
      "Auditoria_Interna_Corporativa", "Gestão_de_Riscos_Empresariais",
      "Procurações_Corporativas", "Governança_Corporativa", "Conformidade_Regulatória"
    ];

    this.tiposEmpresa = ["LTDA", "S/A", "Comércio", "Indústria", "Consultoria"];
    
    this.departamentos = [
      "Financeiro", "Jurídico", "Recursos Humanos", "TI",
      "Comercial", "Marketing", "Logística", "Compras",
      "Planejamento", "Auditoria"
    ];

    this.palavrasPT = [
      "contrato", "empresa", "departamento", "reunião", "documento",
      "financeiro", "recursos", "humanos", "projeto", "relatório",
      "gestão", "administrativo", "comercial", "planejamento", "logística",
      "processo", "atividade", "análise", "auditoria", "controle"
    ];
  }

  // ==============================
  // Geradores de dados fake
  // ==============================
  gerarNomePasta() {
    const sobrenome = this.sobrenomes[Math.floor(Math.random() * this.sobrenomes.length)];
    return `${sobrenome}`;
  }

  gerarTitulo() {
    return this.departamentos[Math.floor(Math.random() * this.departamentos.length)];
  }

  gerarDescricao(qtdPalavras = 25) {
    const texto = [];
    for (let i = 0; i < qtdPalavras; i++) {
      texto.push(this.palavrasPT[Math.floor(Math.random() * this.palavrasPT.length)]);
    }
    return texto.join(" ") + ".";
  }

  gerarDadosPasta(qtdPalavrasDescricao = 15) {
    return {
      nomePasta: this.gerarNomePasta(),
      titulo: this.gerarTitulo(),
      descricao: this.gerarDescricao(qtdPalavrasDescricao)
    };
  }

  // ==============================
  // Ações na página de Repositório
  // ==============================

  clicarPrimeiraReticencia(locatorsRepositorio, criador) {
    cy.get(locatorsRepositorio.tela)
      .contains(criador)
      .should('be.visible')
      .parentsUntil(locatorsRepositorio.tela)
      .filter(`:has(${locatorsRepositorio.reticencias})`)
      .first()
      .find(locatorsRepositorio.reticencias)
      .first()
      .click();
  }

  clicarCriarPasta(locatorsRepositorio) {
    cy.get(locatorsRepositorio.CriarPasta).click();
  }

  preencherFormularioPasta(locatorsRepositorio, dadosPasta) {
    cy.get(locatorsRepositorio.inputNomePasta).clear().type(dadosPasta.nomePasta);
    cy.get(locatorsRepositorio.inputTitulo).clear().type(dadosPasta.titulo);
    cy.get(locatorsRepositorio.inputDescricao).clear().type(dadosPasta.descricao);
  }

  salvarPasta(locatorsRepositorio) {
    cy.get(locatorsRepositorio.botaoSalvar).click();
  }

  criarPastaCompleta(locatorsRepositorio, dadosPasta = null) {
    const pasta = dadosPasta || this.gerarDadosPasta(15);
    this.clicarCriarPasta(locatorsRepositorio);
    this.preencherFormularioPasta(locatorsRepositorio, pasta);
    this.salvarPasta(locatorsRepositorio);
    return pasta; // retorna os dados da pasta criada
  }
 
  selecionarPastaCriada(locatorsRepositorio, criador) {
    cy.get(locatorsRepositorio.tela)
    .contains(locatorsRepositorio.criador, criador) // procura o elemento que tem a classe/criador e o texto
    .should('be.visible')
    .dblclick();
  }
  
moverPasta(locatorsRepositorio) {
    // Clica no botão "Mover"
    cy.contains('Mover').should('be.visible').click();

    // Seleciona a primeira pasta da lista
    cy.get(locatorsRepositorio.selecionelista)
      .should('be.visible')
      .first()
      .click({ force: true });

    // Seleciona a última tela
    cy.get(locatorsRepositorio.tela)
      .last()
      .click({ force: true })
      .within(() => {
          // Procura e clica na opção "Repositório" dentro desta tela
          cy.contains('Repositório')
            .should('be.visible')
            .click({ force: true });
      });
}

 selecionarPastaCriadackeck(locatorsRepositorio, criador) {
    // Encontra o elemento que contém o criador dentro da lista
    cy.get(locatorsRepositorio.tela)
      .contains(locatorsRepositorio.criador, criador)
      .should('be.visible')
      .closest('.z-listitem') // garante que pegamos a linha correta
      .then(($linha) => {
          // Tenta encontrar um checkbox <input> primeiro
          const inputCheckbox = $linha.find('input[type="checkbox"]').first();
          if (inputCheckbox.length) {
              // Se for um input padrão, usa .check()
              cy.wrap(inputCheckbox).check({ force: true });
          } else {
              // Caso seja um checkbox customizado (div/span), clica no elemento da classe z-checkbox
              const customCheckbox = $linha.find('.z-checkbox').first();
              if (customCheckbox.length) {
                  cy.wrap(customCheckbox).click({ force: true });
              } else {
                  throw new Error('Checkbox não encontrado na linha do criador: ' + criador);
              }
          }

      });
}


  }
