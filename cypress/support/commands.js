import 'cypress-iframe';
//Add to Cart:
Cypress.Commands.add('addToCart',()=>{
  cy.wait(1000)

  cy.get('#container-fluid >div').eq(1).find('>div').eq(1)
  .find('>div').eq(0)
  .find('>div').eq(1)
  .find('>a').click()

  cy.get('button[title="Ajouter au panier"]').click()
  cy.get('[data-testid=continueShopping]').click()
})
//Select Cat:
Cypress.Commands.add('selectCat',(testid)=>{
    cy.get('[data-testid='+testid+']').click({force:true})
})
//Check Images
Cypress.Commands.add('checkImage',(key)=>{
    cy.get('[alt="'+key+'"]')//need data-testid in tag img of product
        .should('be.visible')
        .and(($img) => {
            expect($img[0].naturalWidth).to.be.greaterThan(0)
    })  
})
Cypress.Commands.add('PaypalIframe', { prevSubject: 'element' }, $iframe => {
  return new Cypress.Promise(resolve => {
    $iframe.ready(function () {
      resolve($iframe.contents().find('body'));
    });
  });
});

const state = {}

Cypress.Commands.add('capturePopup', () => {
  cy.window().then((win) => {
    const open = win.open
    cy
      .stub(win, 'open')
      .callsFake((...params) => {
        // Capture the reference to the popup
        state.popup = open(...params)
        return state.popup
      })
  })
})
Cypress.Commands.add('popup', () => {
  const popup = Cypress.$(state.popup.document)
  return cy.wrap(popup.contents().find('body'))
})

//Paypal Sandbox
Cypress.Commands.add('paypalFlow', () => {
  cy.capturePopup()
  cy.get('iframe').PaypalIframe().find('div[data-funding-source="paypal"]').first().click()
  cy
    .popup()
    .find('div')
    .should('not.exist')
})
Cypress.Commands.add('PaypalCredentials', (email, password) => {
  cy.wait(1000)
  cy
    .popup()
    .then($body => {
      // Check if we need to sign in
      if ($body.find('input#email').length) {
        cy
          .popup()
          .find('input#email')
          .clear()
          .type(email,{force:true})
        // Click on the button in case it's a 2-step flow
        cy.popup()
          .find('button:visible')
          .first()
          .click({force:true})
        cy.wait(5000)
        cy.popup()
          .find('input#password')
          .type(password,{force:true})
        cy.popup()
          .find('button#btnLogin')
          .should('exist')
          .click({force:true})
      }
    })
})
Cypress.Commands.add('SubmitPaypalFlow', () => {
  cy.wait(10000)
  cy
    .popup()
    .find('button#payment-submit-btn')
    .should('exist')
    .click({force:true})
})

//Paypal Credit Card
Cypress.Commands.add('paypalCreditCardForm', () => {
  cy.get('iframe').PaypalIframe().find('div[data-funding-source="card"]').first().click()
})
Cypress.Commands.add('CreditCardCredentials',(name,info)=>{
  cy
    .get('iframe').PaypalIframe()
    .find('div#card-fields-container').find('>div >iframe').eq(0).PaypalIframe()
    .find('input[name="'+name+'"]').type(info,{force:true})
})
Cypress.Commands.add('SubmitPaypalCreditCard',()=>{
  cy
    .get('iframe').PaypalIframe()
    .find('div#card-fields-container').find('>div >iframe').eq(0).PaypalIframe()
    .find('button#submit-button').click({force:true})
})

//Payzone
Cypress.Commands.add('CreditCard', () => {
  cy.wait(500)
  cy.iframe('#c2pIframe').find('input[value="Submit to TermURL >>"]').should('be.visible').click()
})
Cypress.Commands.add('getBySel',(selector, ...args)=>{
  return cy.get(`[data-testid=${selector}]`, ...args)
})
Cypress.Commands.add('BcloudLogin',(user)=>{
  cy.get('[name=emailLogin]').type(user.email)
  cy.get('[name=passwordLogin]').type(user.password)
  cy.get('[data-testid=login]').click()
})

