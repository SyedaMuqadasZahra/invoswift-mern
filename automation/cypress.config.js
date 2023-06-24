const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
const { downloadFile } = require("cypress-downloadfile/lib/addPlugin");

module.exports = defineConfig({
  watchForFileChanges: false,          
  experimentalSessionAndOrigin: true,
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    html: true,
    json: true,
    reportPageTitle: "custom-title",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    reportDir: "cypress/reports",
    reportFilename: "report",
  },
  e2e: {
    experimentalSessionAndOrigin: true,
    chromeWebSecurity: false,
    pageLoadTimeout: 3000000,
    setupNodeEvents(on, config) {
      on("task", { downloadFile });
      require("cypress-mochawesome-reporter/plugin")(on, config);
      allureWriter(on, config);
      return config;
    },
  },
});
                  