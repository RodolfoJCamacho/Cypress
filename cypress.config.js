const { defineConfig } = require("cypress");
const fs = require("fs");

function getEnvConfig(env) {
  const filePath = `./cypress/config/${env}.env.json`;

  if (!fs.existsSync(filePath)) {
    console.warn(
      `Arquivo de ambiente "${filePath}" não encontrado. Usando configuração padrão.`
    );
    return {};
  }

  const raw = fs
    .readFileSync(filePath, "utf8")
    .replace(/^\uFEFF/, "") // remove BOM (Windows)
    .trim();

  if (!raw) return {};

  try {
    return JSON.parse(raw);
  } catch (e) {
    throw new Error(`JSON inválido em ${filePath}: ${e.message}`);
  }
}

module.exports = defineConfig({
  video: true,
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    reporterEnabled: "cypress-mochawesome-reporter, mocha-junit-reporter",
    mochaJunitReporterReporterOptions: {
      mochaFile: "cypress/reports/junit/results-[hash].xml",
    },
    CypressMochawesomeReporterReporterOptions: {
      charts: true,
      reportPageTitle: "Prodemge - Relatório de Testes",
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      const envConfig = getEnvConfig(config.env.ambiente || "dev");

      // Se no JSON vier baseUrl, sobrescreve a do Cypress
      if (envConfig.baseUrl) {
        config.baseUrl = envConfig.baseUrl;
        delete envConfig.baseUrl;
      }

      // Mescla env do config com o do arquivo
      config.env = { ...config.env, ...envConfig };
      console.log("🔍 Variáveis carregadas no Cypress.env:", config.env);

      require("cypress-mochawesome-reporter/plugin")(on);

      return config;
    },

    // Arquivos de teste
   specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",



    // Sessão + isolamento
    experimentalSessionAndOrigin: true,
    testIsolation: false,

    // Viewport
    viewportWidth: 1366,
    viewportHeight: 768,

    // Timeouts maiores
    defaultCommandTimeout: 15000,
    requestTimeout: 60000,
    responseTimeout: 60000,
    pageLoadTimeout: 120000,

    // Outros
    videoCompression: 32,

    
  },
  
});