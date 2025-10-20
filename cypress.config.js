const { defineConfig } = require("cypress");

module.exports = defineConfig({
  retrise: {
    openMode: 0,
    runMode: 2,
  },
  e2e: {
    pageLoadTimeout: 300000,
    defaultCommandTimeout: 30000,
    reporter: 'cypress-mochawesome-reporter',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
