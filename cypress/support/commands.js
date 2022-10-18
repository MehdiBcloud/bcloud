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
Cypress.Commands.add('paypalFlow', (email, password) => {
  // Enable popup capture
  cy.capturePopup()
  // Click on the PayPal button inside PayPal's iframe
  cy.get('iframe').PaypalIframe().find('div[data-funding-source="paypal"]').click()
  // It will first inject a loader, wait until it changes to the real content
  cy
    .popup()
    .find('div')
    .should('not.exist')
    .wait(1000) // Not recommended, but the only way I found to wait for the real content
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
        cy.popup()
          .find('input#password')
          .type(password,{force:true})
        cy.popup()
          .find('button#btnLogin')
          .click({force:true})
      }
    })
  cy
    .popup()
    .find('button#btnLogin')
    .should('not.exist')
  cy.wait(5000)
  cy
    .popup()
    .find('button[data-testid=submit-button-initial]')
    .should('exist')
    .click({force:true})
})
Cypress.Commands.add('paypalCreditCard', () => {
  const PaypalInfos = require('../fixtures/Credit card (PayPal).json');
  const dataAddress = require('../fixtures/Address.json');
  // Enable popup capture
  cy.capturePopup()
  // Click on the PayPal button inside PayPal's iframe
  cy.get('iframe').PaypalIframe().find('div[data-funding-source="card"]').click()
  // It will first inject a loader, wait until it changes to the real content
  cy
    .popup()
    .find('div')
    .should('not.exist')
    .wait(10000) // Not recommended, but the only way I found to wait for the real content
  cy
    .popup()
    .then($body => {
      // Check if we need to sign in
      if ($body.find('input#cardNumber').length) {
        cy
          .popup()
          .find('input#cardNumber')    
          .type(PaypalInfos.CardNumber,{force:true})
        cy
          .popup()
          .find('input#cardExpiry')    
          .type(PaypalInfos.ExpirationDate,{force:true})
        cy
          .popup()
          .find('input#cardCvv')    
          .type(PaypalInfos.Cvv,{force:true})
        cy
          .popup()
          .find('input#firstName')    
          .type(dataAddress.firstName,{force:true})
        cy
          .popup()
          .find('input#lastName')  
          .type(dataAddress.lastName,{force:true})
        cy
          .popup()
          .find('input#billingLine1')    
          .type(dataAddress.address,{force:true})
        cy
          .popup()
          .find('input#billingCity')    
          .type(dataAddress.city+"/"+dataAddress.town+"/"+dataAddress.village,{force:true})
        cy
          .popup()
          .find('input#phone')    
          .type(dataAddress.phone,{force:true})
        cy
          .popup()
          .find('input#email')    
          .type(dataAddress.email,{force:true})
        cy
          .popup()
          .find('input#onboardOptionGuest')
          .check({force:true})
        cy
          .popup()
          .find('input#guestAgreeToTerms')
          .check({force:true})
      }
    })
  cy
    .popup()
    .find('div[data-testid="submit-button"] >button')
    .click({force:true})
})
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

