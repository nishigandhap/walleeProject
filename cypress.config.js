const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    env: {
      baseUrl: 'https://woocommerce.showcase-wallee.com/'


    },
    specPattern: 'cypress/e2e/PageClass/*.js',
    defaultCommandTimeout: 5000
  },
});
