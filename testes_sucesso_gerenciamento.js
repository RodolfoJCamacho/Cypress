import realizarLogin from '../../../support/locators/login.js'
import dados from '../../Massa_dados/dados.json'
import flow from '../../../support/flows/flow.js'


describe('Acesso ao Sistema PRODOC | Fluxos e operações Gerenciamento', () => {
beforeEach(() => {
flow()
realizarLogin(dados.usuario, dados.senha)
})

   
})
   

  


