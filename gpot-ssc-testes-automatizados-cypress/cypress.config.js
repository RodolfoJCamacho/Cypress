const { defineConfig } = require("cypress");
const fs = require("fs");

function getEnvConfig(env) {
  const path = `./cypress/config/${env}.env.json`;
  if (fs.existsSync(path)) {
    return JSON.parse(fs.readFileSync(path, "utf8"));
  } else {
    console.warn(`Arquivo de ambiente "${path}" não encontrado. Usando configuração padrão.`);
    return {};
  }
}

module.exports = defineConfig({
  video: true,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'cypress-mochawesome-reporter, mocha-junit-reporter',
    mochaJunitReporterReporterOptions: {
      mochaFile: 'cypress/reports/junit/results-[hash].xml'
    },
    CypressMochawesomeReporterReporterOptions: {
      charts: true,
      reportPageTitle: 'Prodemge - Relatório de Testes',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false
    }
  },
  e2e: {
    setupNodeEvents(on, config) {
      // Carrega variáveis do ambiente correto
      const envConfig = getEnvConfig(config.env.ambiente || "dev");
      
      // Move baseUrl para o lugar certo
      if (envConfig.baseUrl) {
        config.baseUrl = envConfig.baseUrl;
        delete envConfig.baseUrl;
      }

      // Junta o restante das variáveis no config.env
      config.env = { ...config.env, ...envConfig };
      console.log('🔍 Variáveis carregadas no Cypress.env:', config.env);
      // Registra o plugin do mochawesome
      require('cypress-mochawesome-reporter/plugin')(on);

      return config;
    },
    chromeWebSecurity: false,
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
    experimentalSessionAndOrigin: true
  }
});
