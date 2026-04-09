class HelpersPage {

  // ============================================================
  // _validarLocator()
  // Método interno para evitar erro por locator vazio/undefined
  // ============================================================
  _validarLocator(locator, nome = 'locator') {                     // Define método recebendo o locator e um nome opcional para mensagem de erro
    if (!locator) {                                                // Verifica se locator é null, undefined, vazio, false etc.
      throw new Error(`${nome} está vazio/undefined: ${locator}`); // Interrompe o teste com erro claro
    }
    if (typeof locator !== 'string') {                             // Verifica se o locator NÃO é string
      throw new Error(`${nome} precisa ser string. Recebido: ${typeof locator}`); // Erro informando tipo incorreto
    }
  }

  // ============================================================
  // aguardarElementoAparecer()
  // Espera o elemento existir e estar visível
  // ============================================================
  aguardarElementoAparecer(locator, tempoMaximo = 60000) { // Recebe CSS selector e timeout (default 60s)
    this._validarLocator(locator);                         // Valida se locator é válido antes de usar

    return cy.get(locator, { timeout: tempoMaximo })       // Procura o elemento no DOM com retry automático até o timeout
      .first()                                             // Se encontrar vários, pega apenas o primeiro
      .scrollIntoView({ easing: 'linear', duration: 300 }) // Rola a tela até o elemento
      .should('be.visible');                               // Garante que o elemento está visível (retry automático)
  }

  // ============================================================
  // aguardarElementoSumir()
  // Espera o elemento não existir mais no DOM
  // ============================================================
  aguardarElementoSumir(locator, tempoMaximo = 60000) {    // Recebe CSS selector e timeout
    this._validarLocator(locator);                         // Valida locator

    return cy.get(locator, { timeout: tempoMaximo })       // Tenta encontrar o elemento
      .should('not.exist');                                // Espera até que ele não exista mais no DOM
  }

  // ============================================================
  // validarMensagemTextoContido()
  // Valida que algum elemento contém determinado texto
  // ============================================================

  validarMensagemTextoContido(textoMensagem, tempoMaximo = 10000) { // Recebe texto e timeout
    if (!textoMensagem) {                                           // Valida se texto foi informado
      throw new Error(`textoMensagem inválido: ${textoMensagem}`);  // Interrompe se não foi
    }

    return cy.contains(textoMensagem, { timeout: tempoMaximo })     // Procura qualquer elemento que contenha o texto (com retry)
      .should('be.visible')                                         // Garante que está visível
      .then(() => {                                                 // Depois de validar
        cy.log(`Mensagem contendo: '${textoMensagem}' -> identificada na tela.`); // Log no runner
      });
  }

  // ============================================================
  // validarMensagemTextoExato()
  // Valida texto exato dentro de um elemento específico
  // ============================================================

  validarMensagemTextoExato(textoMensagem, locatorMensagem, tempoMaximo = 10000) {
    this._validarLocator(locatorMensagem, 'locatorMensagem');       // Valida locator
    if (!textoMensagem) {                                           // Valida texto
      throw new Error(`textoMensagem inválido: ${textoMensagem}`);
    }

    const regexExato = new RegExp(                                  // Cria expressão regular
      `^${textoMensagem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`   // Escapa caracteres especiais e garante match exato
    );

    return this.aguardarElementoAparecer(locatorMensagem, tempoMaximo) // Espera elemento aparecer
      .should(($el) => {                                               // Assertion custom com retry automático
        const texto = $el.text().trim();                               // Captura texto e remove espaços extras
        expect(texto, 'Texto capturado na tela').to.match(regexExato); // Valida que texto é exatamente igual
      })
      .then(() => {                                                    // Depois de validar
        cy.log(`Mensagem exata identificada: '${textoMensagem}'`);     // Log
      });
  }

  // ============================================================
  // aguardarInputEstabilizar()
  // Espera input parar de mudar posição/tamanho (re-render)
  // ============================================================

  aguardarInputEstabilizar(locator, tempoMaximo = 60000) {
    this._validarLocator(locator);                             // Valida locator

    return cy.get(locator, { timeout: tempoMaximo })           // Procura o input
      .should('be.visible')                                    // Garante que está visível
      .then(($el) => {                                         // Recebe elemento encontrado

        const el = $el[0];                                     // Converte jQuery em DOM puro
        const rect1 = el.getBoundingClientRect();              // Captura posição e tamanho inicial

        return Cypress.Promise.delay(150).then(() =>           // Espera 150ms sem travar Cypress
          cy.get(locator).then(($el2) => {                     // Busca o elemento novamente

            const el2 = $el2[0];                               // DOM puro novamente
            const rect2 = el2.getBoundingClientRect();         // Captura nova posição/tamanho

            const mudou =                                      // Verifica se mudou algo
              rect1.x !== rect2.x ||
              rect1.y !== rect2.y ||
              rect1.width !== rect2.width ||
              rect1.height !== rect2.height;

            expect(mudou, `Input ${locator} ainda está renderizando`).to.be.false; // Falha se ainda estiver mudando
          })
        );
      })
      .then(() =>                                              // Depois que estabilizou
        cy.get(locator)
          .first()
          .scrollIntoView()
          .should('be.visible')
      );
  }

  // ============================================================
  // aguardarTelaEstabilizar()
  // Espera container parar de mudar layout
  // ============================================================

  aguardarTelaEstabilizar(locatorTela, tempoMaximo = 60000) {
    this._validarLocator(locatorTela, 'locatorTela');          // Valida locator

    return cy.get(locatorTela, { timeout: tempoMaximo })       // Busca container
      .should('be.visible')                                    // Garante visibilidade
      .then(($container) => {

        const elementos1 = $container.find('*');               // Captura todos filhos
        const rects1 = Array.from(elementos1)                  // Converte para array
          .map((e) => e.getBoundingClientRect());              // Captura posições snapshot 1

        const count1 = rects1.length;                          // Quantidade de filhos snapshot 1

        return Cypress.Promise.delay(200).then(() =>
          cy.get(locatorTela).then(($container2) => {

            const elementos2 = $container2.find('*');          // Filhos snapshot 2
            const rects2 = Array.from(elementos2)
              .map((e) => e.getBoundingClientRect());

            const count2 = rects2.length;                      // Quantidade snapshot 2

            expect(count1).to.equal(count2);                   // Garante que número de filhos não mudou

            const mudou = rects1.some((r1, idx) => {           // Verifica se algum mudou posição
              const r2 = rects2[idx];
              if (!r2) return true;

              return (
                r1.x !== r2.x ||
                r1.y !== r2.y ||
                r1.width !== r2.width ||
                r1.height !== r2.height
              );
            });

            expect(mudou, `Tela ${locatorTela} ainda renderizando`).to.be.false; // Falha se mudou
          })
        );
      })
      .then(() => {
        cy.log(`Tela ${locatorTela} estabilizada`);
        return cy.get(locatorTela).first().should('be.visible');
      });
  }

  // ============================================================
  // validarImagemCarregada()
  // Valida se imagem carregou corretamente
  // ============================================================

  validarImagemCarregada(locatorImagem, descricao) {
    this._validarLocator(locatorImagem, 'locatorImagem');     // Valida locator

    return this.aguardarElementoAparecer(locatorImagem)       // Espera imagem aparecer
      .then(($img) => {

        const img = $img[0];                                  // DOM puro

        return cy.waitUntil(() =>
          Cypress.Promise.resolve(
            img.complete &&                                   // Verifica se terminou carregamento
            img.naturalWidth > 1 &&                           // Verifica largura válida
            img.naturalHeight > 1                             // Verifica altura válida
          ),
          {
            timeout: 20000,
            interval: 150,
            errorMsg: `Imagem (${descricao}) não carregou corretamente.`,
          }
        )
        .then(() => {
          expect(img.naturalWidth).to.be.greaterThan(100);    // Valida largura mínima
          expect(img.naturalHeight).to.be.greaterThan(50);    // Valida altura mínima
          cy.log(`Imagem (${descricao}) OK`);
        });
      });
  }

  // ============================================================
  // validarTextoNoElemento()
  // Valida que elemento contém texto esperado
  // ============================================================

  validarTextoNoElemento(textoEsperado, locatorTexto, tempoMaximo = 10000) {
    this._validarLocator(locatorTexto, 'locatorTexto');       // Valida locator

    return this.aguardarElementoAparecer(locatorTexto, tempoMaximo) // Espera elemento aparecer
      .should('contain', String(textoEsperado))               // Verifica que contém texto
      .then(() => {
        cy.log(`Texto "${textoEsperado}" validado no elemento.`);
      });
  }
}

export default HelpersPage;