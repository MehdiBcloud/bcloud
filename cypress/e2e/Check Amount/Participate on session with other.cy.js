/// <reference types="Cypress"/>
describe('Participate on session with other',()=>{
    const dataLogin = require('../../fixtures/Login.json');
    let amount;
    beforeEach(() => {
        cy.viewport(1280 , 720);
        Cypress.Cookies.preserveOnce("token");
        Cypress.Cookies.preserveOnce("ctoken");
    })
    before(()=>{
        cy.clearCookies();
    })
    it('Go to www.bcloud.ma',()=>{
        cy.visit('https://www.bcloud.ma/')
    })
    it('Login',()=>{
        cy.wait(500)
        cy.get('#menua').click()
        cy.get('[name=emailLogin]').type(dataLogin.email)
        cy.get('[name=passwordLogin]').type(dataLogin.pass+'{enter}', { sensitive: true })
    })
    it('Formation methode agile scrum',()=>{
        cy.wait(500)
        cy.get('#nav >li >span >i').eq(0).trigger('mouseover',{force: true})
        cy.get('[data-testid=formations-methode-agile-scrum]').trigger('mouseover',{force: true})
        cy.get('[data-testid=formation-professional-scrum-master-I]').click({force:true})
    })
    it('invoke the amount',()=>{
        cy.wait(500)
        cy.get('#container-fluid >div').eq(1).find('>div').eq(1)
        .find('>div').eq(0)
        .find('>div').eq(1)
        .find('>span').eq(0).invoke('text').then((price)=>{
            amount = price
        })
    })
    it('Add to cart',()=>{
        cy.wait(500)
        cy.get('[data-testid=addToCartCourse]').click()
    })
    it('Check option (with others)',()=>{
        cy.wait(500)
        cy.get('[value=accompanied]').check()
    })
    let randomFirstName = '';
    let randomEmail = '';
    let randomLastName = '';
    let randomPhoneNumber = '';
    var pattern = 'abcdefghijklmnopkrstwxyx';
    for(var i=0; i<5; i++){
        randomFirstName += pattern.charAt(Math.floor(Math.random() * pattern.length));
        randomLastName += pattern.charAt(Math.floor(Math.random() * pattern.length));
        randomPhoneNumber += i+""+i;
    }
    randomEmail = randomFirstName+"."+randomLastName+"@gmail.com";
    it('Add person',()=>{
        cy.wait(500)
        cy.get('[name=fname]').type(randomFirstName)
        cy.get('[name=lname]').type(randomLastName)
        cy.get('[name=email]').type(randomEmail)
        cy.get('#phone-form-control').type(randomPhoneNumber)
        cy.get('button[type="submit"]').eq(1).click() 
    })
    it('Check Total amount',()=>{
        cy.wait(500)
        cy.contains('Participant 1').should('exist')
        cy.get('[alt=thumbnail]').parent().parent()
        .find('>div').eq(3)
        .find('>div >div')
        .find('>div').eq(2).invoke('text').then((doublePrice)=>{
            expect(doublePrice.match(/\d+/)[0]).to.equal(String(amount.match(/\d+/)[0] * 2))
        })
    })
    it('Open cart',()=>{
        cy.wait(500)
        cy.get('[data-testid=addToCartCourse]').eq(1).click()
        cy.get('[data-testid=openCart]').click()
    })
    it('Check total amount (Second)',()=>{
        cy.wait(500)
        cy.get('#__next >div')
        .find('>div').eq(1)
        .find('>div')
        .find('>div').eq(1)
        .find('>div').eq(0)
        .find('>div').eq(1)
        .find('>div >div').eq(1)
        .find('>div').eq(1)
        .find('>b').invoke('text').then((doublePrice)=>{
            expect(doublePrice.match(/\d+/)[0]).to.equal(String(amount.match(/\d+/)[0] * 2))
        })

        cy.get('[data-testid=PayOrder]').click()
    })
    it('Check total amount (Third)',()=>{
        cy.wait(500)
        cy.get('#navbar').parent()
        .find('>div').eq(1)
        .find('>div >div').eq(1)
        .find('>div').eq(0)
        .find('>div').eq(1)
        .find('>div').eq(2)
        .find('>div').eq(1)
        .find('>strong').invoke('text').then((doublePrice)=>{
            expect(doublePrice.match(/\d+/)[0]).to.equal(String(amount.match(/\d+/)[0] * 2))
        })
        cy.get('#c2pSubmitButtonContainer >button').invoke('text').then((doublePrice)=>{
            expect(doublePrice.match(/\d+/)[0]).to.equal(String(amount.match(/\d+/)[0] * 2))
        })
    })


})