export default class ExcluirArquivosz_clean_up{
constructor() {
  this.botaoExcluir = '[class="z-menuitem"]'.last();
  this.confirmarExclusao = '[class="z-messagebox-button z-button"]'.first();
}
excluirArquivo() {
  cy.get(this.botaoExcluir).click();
  cy.get(this.confirmarExclusao).click();
}   

}