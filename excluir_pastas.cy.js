export default class ExcluirPastasz_clean_up{
constructor() {
   this.botaoExcluir = '[class="z-menuitem"]'
  this.confirmarExclusao = '[class="z-messagebox-button z-button"]'
  this.ok = '[class="z-messagebox-button z-button"]'


}
excluirPasta() {
  cy.get(this.botaoExcluir).contains('Excluir').click();
  cy.get(this.confirmarExclusao).first().click();
  cy.get(this.ok).first().click();
}   

}