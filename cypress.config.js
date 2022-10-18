const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth:1280,
  viewportHeight:720,
  chromeWebSecurity: false,
  e2e: {
    experimentalWebKitSupport: true,
    experimentalStudio: true,
    setupNodeEvents(on, config) {
    },
  },
});
