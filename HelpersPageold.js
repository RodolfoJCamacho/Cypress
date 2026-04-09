// Classe com helpers de espera/validação para Cypress + XPath
class HelpersPage {

  // ============================================================
  // _validarLocator()
  // Método interno (helper privado) para evitar erro por locator vazio/undefined
  // ============================================================
  _validarLocator(locator, nome = 'locator') {              // Declara função e define nome padrão do parâmetro (para mensagem de erro)
    if (!locator) {                                         // Se locator for null, undefined, string vazia etc.
      throw new Error(`${nome} está vazio/undefined: ${locator}`); // Interrompe o teste com erro claro
    }
    if (typeof locator !== 'string') {                      // Se locator não for string
      throw new Error(`${nome} precisa ser string. Recebido: ${typeof locator}`); // Interrompe com erro explicando o tipo
    }
    // Se passou daqui, locator é string e não vazia
  }

  // ============================================================
  // aguardarElementoAparecer()
  // Espera o elemento EXISTIR no DOM e depois garante que está VISÍVEL
  // Evita colocar cy.* dentro do callback do waitUntil (causa erro de fila)
  // ============================================================
  aguardarElementoAparecer(locator, tempoMaximo = 60000) {  // Método público; tempoMaximo default = 60s
    this._validarLocator(locator);                          // Valida entrada antes de qualquer coisa

    return cy.waitUntil(                                    // Inicia polling (repete até retornar true ou estourar timeout)
      () =>                                                  // Função que será repetida pelo waitUntil
        cy.document().then((doc) => {                       // Pega o document real do navegador (DOM real)
          const result = doc.evaluate(                      // Executa XPath diretamente no DOM (sem usar cy.xpath aqui)
            locator,                                        // Expressão XPath a ser avaliada
            doc,                                            // Contexto de busca (document inteiro)
            null,                                           // Namespace resolver (não usado)
            XPathResult.FIRST_ORDERED_NODE_TYPE,            // Retorna somente o primeiro nó encontrado
            null                                            // Resultado anterior (não usado)
          );

          return !!result.singleNodeValue;                  // Converte para boolean: true se achou nó, false se não achou
        }),
      {
        errorMsg: `Elemento ${locator} não apareceu dentro do tempo estipulado.`, // Mensagem se timeout estourar
        timeout: tempoMaximo,                               // Tempo máximo total do polling
        interval: 150,                                      // Intervalo entre tentativas (ms)
      }
    )
    .then(() => {                                           // Só executa depois que o waitUntil retornou true (ou seja: existe no DOM)
      return cy.xpath(locator, { timeout: tempoMaximo })     // Agora sim usa cy.xpath para virar chain Cypress “normal”
        .first()                                            // Se vier mais de um, pega só o primeiro
        .scrollIntoView({ easing: 'linear', duration: 300 })// Rola até ele (ajuda quando existe mas está fora da viewport)
        .should('be.visible');                              // Garante visibilidade (Cypress faz retry até timeout do comando)
    });
  }

  // ============================================================
  // aguardarElementoSumir()
  // Espera o elemento SUMIR do DOM ou ficar realmente INVISÍVEL
  // ============================================================
  aguardarElementoSumir(locator, tempoMaximo = 60000) {     // Método público; tempoMaximo default = 60s
    this._validarLocator(locator);                          // Valida entrada

    const estaRealmenteVisivel = (el) => {                  // Função auxiliar local para validar visibilidade “real”
      if (!el) return false;                                // Se el não existe, não está visível
      if (!Cypress.dom.isVisible(el)) return false;         // Checa visibilidade via Cypress (CSS/display/opacity etc.)
      const rect = el.getBoundingClientRect();              // Pega tamanho/posição real no layout
      return rect.width > 0 && rect.height > 0;             // Só considera visível se ocupa espaço real
    };

    return cy.waitUntil(                                    // Polling até condição de “sumiu”
      () =>
        cy.document().then((doc) => {                       // Acessa DOM real
          const result = doc.evaluate(                      // Avalia o XPath no DOM real
            locator,                                        // XPath procurado
            doc,                                            // Contexto = doc
            null,                                           // Namespace resolver
            XPathResult.FIRST_ORDERED_NODE_TYPE,            // Primeiro nó encontrado
            null                                            // Resultado anterior
          );

          const elemento = result.singleNodeValue;          // Extrai o elemento real do DOM

          if (!elemento) return true;                       // Se não existe mais no DOM → condição esperada (sumiu)
          return !estaRealmenteVisivel(elemento);           // Se existe mas não está realmente visível → condição esperada
        }),
      {
        errorMsg: `Elemento ${locator} ainda está visível após ${tempoMaximo}ms.`, // Mensagem se timeout estourar
        timeout: tempoMaximo,                               // Tempo máximo
        interval: 250,                                      // Intervalo entre tentativas
      }
    )
    .then(() => {                                           // Depois que sumiu/invisível
      cy.log(`Elemento ${locator} não está mais visível.`);  // Log no runner
    });
  }

  // ============================================================
  // validarMensagemTextoContido()
  // Valida que existe um elemento que CONTÉM o texto e está visível
  // Aqui NÃO precisa waitUntil (cy.contains já faz retry)
  // ============================================================
  validarMensagemTextoContido(textoMensagem, tempoMaximo = 10000) { // Texto e tempoMaximo default = 10s
    if (!textoMensagem) {                                    // Se texto não veio
      throw new Error(`textoMensagem inválido: ${textoMensagem}`);  // Erro claro
    }

    return cy.contains(textoMensagem, { timeout: tempoMaximo }) // Procura elemento que contenha o texto (com retry)
      .should('be.visible')                                 // Exige que esteja visível (com retry)
      .then(() => {                                         // Após encontrar e validar
        cy.log(`Mensagem contendo: '${textoMensagem}' -> identificada na tela.`); // Log
      });
  }

  // ============================================================
  // validarMensagemTextoExato()
  // Valida texto EXATO em um locator específico (XPath)
  // ============================================================
  validarMensagemTextoExato(textoMensagem, locatorMensagem, tempoMaximo = 10000) { // Recebe texto esperado, locator e tempo
    this._validarLocator(locatorMensagem, 'locatorMensagem'); // Valida locator
    if (!textoMensagem) {                                    // Valida texto
      throw new Error(`textoMensagem inválido: ${textoMensagem}`);
    }

    // Monta regex que casa SOMENTE o texto exato (escapando caracteres especiais)
    const regexExato = new RegExp(                            // Cria uma regex nova
      `^${textoMensagem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$` // ^...$ garante texto inteiro; replace escapa regex chars
    );

    return this.aguardarElementoAparecer(locatorMensagem, tempoMaximo) // Espera o elemento existir e ficar visível
      .then(() => cy.xpath(locatorMensagem, { timeout: tempoMaximo }).first()) // Busca o elemento novamente
      .should(($el) => {                                     // Assertion custom do Cypress (retry embutido)
        const texto = $el.text().trim();                     // Lê texto do elemento e remove espaços extras
        expect(texto, 'Texto capturado na tela').to.match(regexExato); // Valida texto exatamente igual
      })
      .then(() => {                                          // Depois de validar
        cy.log(`Mensagem exata identificada: '${textoMensagem}'`); // Log
      });
  }

  // ============================================================
  // aguardarInputEstabilizar()
  // Espera o input existir, estar visível e parar de “mexer” (re-render)
  // Útil para ZK ou frameworks que recriam o DOM
  // ============================================================
  aguardarInputEstabilizar(locator, tempoMaximo = 60000) {   // Recebe XPath do input
    this._validarLocator(locator);                            // Valida locator

    return cy.waitUntil(                                      // Polling até “estável”
      () =>
        cy.xpath(locator).then(($el) => {                     // Procura via cy.xpath (aqui ok porque estamos retornando chain)
          if ($el.length === 0) return false;                 // Se não existe, continua tentando

          const el = $el[0];                                  // Pega o primeiro elemento DOM puro

          if (!Cypress.dom.isVisible(el)) return false;       // Se existe mas não está visível, continua tentando

          const rect1 = el.getBoundingClientRect();           // Captura posição/tamanho inicial do input

          return Cypress.Promise.delay(150).then(() =>        // Espera 150ms (sem travar Cypress) e depois revalida
            cy.xpath(locator).then(($el2) => {                // Busca o elemento de novo
              if ($el2.length === 0) return false;            // Se sumiu, ainda está instável

              const el2 = $el2[0];                            // Pega o DOM de novo
              if (!Cypress.dom.isVisible(el2)) return false;  // Se ficou invisível, ainda instável

              const rect2 = el2.getBoundingClientRect();      // Captura posição/tamanho novamente

              const mudou =                                   // Compara os dois retângulos
                rect1.x !== rect2.x ||                        // Mudou X
                rect1.y !== rect2.y ||                        // Mudou Y
                rect1.width !== rect2.width ||                // Mudou largura
                rect1.height !== rect2.height;                // Mudou altura

              return !mudou;                                  // true = estável; false = ainda mudando
            })
          );
        }),
      {
        errorMsg: `Input ${locator} não ficou estável dentro do tempo estipulado.`, // Mensagem se falhar
        timeout: tempoMaximo,                                 // Tempo máximo do polling
        interval: 200,                                        // Intervalo entre tentativas
      }
    )
    .then(() =>                                                // Depois que estabilizou
      cy.xpath(locator)                                        // Retorna o elemento para encadear ações
        .first()                                               // Pega o primeiro
        .scrollIntoView({ easing: 'linear', duration: 250 })   // Rola até ele
        .should('be.visible')                                  // Confirma visibilidade
    );
  }

  // ============================================================
  // aguardarTelaEstabilizar()
  // Espera um container/tela parar de mudar layout (filhos pararem de se mover)
  // ============================================================
  aguardarTelaEstabilizar(locatorTela, tempoMaximo = 60000) { // XPath do container principal da tela
    this._validarLocator(locatorTela, 'locatorTela');          // Valida locator

    return cy.waitUntil(                                       // Polling até “estável”
      () =>
        cy.xpath(locatorTela).then(($container) => {           // Busca o container via XPath
          if ($container.length === 0) return false;           // Se container não existe, continua tentando

          const containerEl = $container[0];                   // DOM puro do container
          if (!Cypress.dom.isVisible(containerEl)) return false; // Se não está visível, continua tentando

          const elementos1 = $container.find('*');             // Pega todos os elementos filhos do container
          const rects1 = Array.from(elementos1)                // Converte NodeList/jQuery collection em array JS
            .map((e) => e.getBoundingClientRect());            // Captura posição/tamanho de cada filho

          const count1 = rects1.length;                        // Quantidade de filhos (snapshot 1)

          return Cypress.Promise.delay(200).then(() =>         // Espera 200ms e revalida
            cy.xpath(locatorTela).then(($container2) => {      // Busca o container de novo
              if ($container2.length === 0) return false;      // Se sumiu, instável

              const containerEl2 = $container2[0];             // DOM do container de novo
              if (!Cypress.dom.isVisible(containerEl2)) return false; // Se ficou invisível, instável

              const elementos2 = $container2.find('*');        // Pega filhos novamente
              const rects2 = Array.from(elementos2)            // Converte para array
                .map((e) => e.getBoundingClientRect());        // Captura retângulos snapshot 2

              const count2 = rects2.length;                    // Quantidade snapshot 2

              if (count1 !== count2) return false;             // Se mudou a quantidade de filhos, ainda renderizando

              const mudou = rects1.some((r1, idx) => {         // some() retorna true se algum item satisfaz condição
                const r2 = rects2[idx];                        // Pega retângulo correspondente
                if (!r2) return true;                          // Se não existe par, considera instável
                return (                                       // Compara posição/tamanho
                  r1.x !== r2.x ||
                  r1.y !== r2.y ||
                  r1.width !== r2.width ||
                  r1.height !== r2.height
                );
              });

              return !mudou;                                   // true = estável; false = instável
            })
          );
        }),
      {
        errorMsg: `A tela ${locatorTela} não ficou estável dentro do tempo estipulado.`, // Mensagem se falhar
        timeout: tempoMaximo,                                  // Tempo máximo
        interval: 200,                                         // Intervalo
      }
    )
    .then(() => {                                               // Depois que estabilizou
      cy.log(`Tela ${locatorTela} estabilizada`);                // Log
      return cy.xpath(locatorTela).first().should('be.visible'); // Retorna container pronto para encadear
    });
  }

  // ============================================================
  // validarImagemCarregada()
  // Valida se a imagem carregou e não está “quebrada”
  // ============================================================
  validarImagemCarregada(locatorImagem, descricao) {            // Recebe XPath e uma descrição para log/assert
    this._validarLocator(locatorImagem, 'locatorImagem');       // Valida locator

    return this.aguardarElementoAparecer(locatorImagem)         // Espera imagem existir e ficar visível
      .then(($img) => {                                         // Recebe jQuery object do elemento
        const img = $img[0];                                    // Converte para DOM puro

        return cy.waitUntil(                                    // Polling até a imagem carregar completamente
          () =>
            Cypress.Promise.resolve(                            // Garante retorno “promise-like” para o waitUntil
              img.complete &&                                   // complete = browser terminou o load
              img.naturalWidth > 1 &&                           // naturalWidth > 0/1 = não está quebrada
              img.naturalHeight > 1                             // naturalHeight > 0/1 = não está quebrada
            ),
          {
            timeout: 20000,                                     // Dá até 20s para imagens grandes
            interval: 150,                                      // Intervalo de checagem
            errorMsg: `Imagem (${descricao}) não carregou corretamente.`,
          }
        )
        .then(() => {                                           // Depois que carregou
          expect(img.naturalWidth, `Largura da ${descricao}`).to.be.greaterThan(100); // Assert largura mínima
          expect(img.naturalHeight, `Altura da ${descricao}`).to.be.greaterThan(50); // Assert altura mínima
          cy.log(`Imagem (${descricao}) OK (${img.naturalWidth}x${img.naturalHeight}px)`); // Log
        });
      });
  }

  // ============================================================
  // validarTextoNoElemento()
  // Valida que um elemento contém um texto (includes)
  // ============================================================
  validarTextoNoElemento(textoEsperado, locatorTexto, tempoMaximo = 10000) { // Recebe texto esperado e XPath do elemento
    this._validarLocator(locatorTexto, 'locatorTexto');         // Valida locator

    return this.aguardarElementoAparecer(locatorTexto, tempoMaximo) // Espera elemento aparecer e ficar visível
      .then(() => cy.xpath(locatorTexto).first())               // Busca o elemento
      .should('be.visible')                                     // Garante visibilidade
      .should(($el) => {                                        // Assertion custom
        const textoTela = $el.text().trim();                    // Lê texto da tela (trim remove espaços)
        expect(textoTela).to.include(String(textoEsperado));    // Valida que contém o texto esperado
      })
      .then(() => {                                             // Depois de validar
        cy.log(`Texto "${textoEsperado}" validado no elemento.`); // Log
      });
  }
}

// Exporta a classe (para importar em outros arquivos)
export default HelpersPage;