class PesquisaPage {
    pesquisarProduto(produto) {
        cy.get('#search_query_top').type(produto);
        cy.get('button[name="submit_search"]').click();
    }
}