const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  reporter: [['html', { outputFolder: 'playwright-report', open: 'always' }]], // Gera e abre o relatório HTML
  use: {
    headless: false,  // Desativa o modo headless
  },
})