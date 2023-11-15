const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  viewportWidth: 1862,
  viewportHeight: 900,
  chromeWebSecurity: false,
  env: {
    BASEURL: "http://amazon.in",
    PHONE_NUMBER: "",
    PASSWORD: "",
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/mocha",
    charts: true,
    overwrite: false,
    html: true,
    json: true,
  },
});
