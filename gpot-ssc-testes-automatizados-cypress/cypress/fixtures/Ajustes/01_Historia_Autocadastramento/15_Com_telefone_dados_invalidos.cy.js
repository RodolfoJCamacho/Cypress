import { faker, fakerPT_BR } from '@faker-js/faker'
import { br } from 'faker-br/lib/locales/pt_BR';
import { elementos } from '../../../support/selectors';

describe('Acesso ao Sistema SEG-ID',() => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.clearCookies();
        cy.visit('/');
             cy.get('[class="col-md-9 footerVersion z-div"]').invoke('text').then(($value) => {
             cy.log($value)
             }),
             cy.wait(2000)
        })
                         
        it('Fluxos e operações Autocadastramento', () =>{                 
         
            cy.log ('15 Com telefone dados invalidos validar mensagem erro')
    
            cy.contains('Criar Usuário').click()
            cy.contains('Inserir Foto').click()
            cy.wait(1000)
            cy.contains('Browse...').click()
            cy.wait(1000)
            cy.get(elementos.fileInput1).last()
            .attachFile('prodemge_logo.jpg')
            cy.wait(1000)
            cy.contains('Enviar').click()
            const cpf = br.cpf()
            cy.contains('* CPF:')
            .siblings()
            .filter(elementos.cpfAut).type(cpf)
            const rg = fakerPT_BR.finance.accountNumber(8)
            cy.contains('* RG:')
            .siblings()
            .filter(elementos.rgAut).type(rg)
            const nome = fakerPT_BR.name.fullName()
            cy.contains('* Nome completo :')
            .siblings()
            .filter(elementos.nomeAut).type(nome)
            const email = fakerPT_BR.internet.email()
            cy.contains('* E-mail:')
            .siblings()
            .filter(elementos.emailAut).type(email)                      
            cy.contains('* Confirmar e-mail:')
            .siblings()
            .filter(elementos.emailAut).type(email)
            const email1 = fakerPT_BR.internet.email()
            cy.contains('E-mail alternativo:')
            .siblings()
            .filter(elementos.emailAAut).type(email1)
            cy.contains('Confirmar e-mail alternativo:')
            .siblings()
            .filter(elementos.emailAAut).type(email1)
            cy.contains('* Telefone:')
            .siblings()
            .filter(elementos.telefoneAut).type('@#@#$%%')
             cy.contains('Celular:')
            .siblings()
            .filter(elementos.celularAut).type('11982737465')
            cy.get(elementos.concluirButton).eq(1).click()
            cy.get(elementos.msgBoxConfirm).eq(0).click()
            cy.wait(2000)
            cy.get(elementos.msgBoxConfirm).eq(0).click()
                        
                
        });
                                      
            
    });                                
              