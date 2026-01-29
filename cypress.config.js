const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'jztgsx',
  e2e: {
    baseUrl: "https://demoqa.com/webtables",
    defaultCommandTimeout: 10000,
    viewportHeight: 900,
    viewportWidth: 1440,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
