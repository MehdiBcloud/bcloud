import './commands'
import "cypress-localstorage-commands";

require('cypress-plugin-tab');
require('cypress-grep')

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})
Cypress.Keyboard.defaults({
    keystrokeDelay: 0,
})