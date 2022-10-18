/// <reference types="Cypress"/>
describe('Bcloud', () => {
    let randomFirstName = '';
    let randomEmail = '';
    let randomLastName = '';
    var pattern = 'abcdefghijklmnopkrstwxyx';
    for(var i=0; i<6; i++){
        randomFirstName += pattern.charAt(Math.floor(Math.random() * pattern.length));
        randomLastName += pattern.charAt(Math.floor(Math.random() * pattern.length));
    }
    randomEmail = randomFirstName+"."+randomLastName+"@gmail.com";

    beforeEach(()=>{
        cy.viewport(1280 , 720)
        Cypress.Cookies.preserveOnce("token")
    })
    before(()=>{
        cy.clearCookies();
    })
    it('Go to dev.bcloud.ma',()=>{
        cy.visit('https://dev.bcloud.ma/',{
          auth: {
            username: 'dev',
            password: 'bcloud2020*',
          },
        })
    })
    it('Inscription',()=>{
        cy.wait(500)
        //Sign up:
        cy.get('#menua').click({force:true})
        cy.get('[data-testid="registerFname"]').type(randomFirstName)
        cy.get('[data-testid="registerLname"]').type(randomLastName)
        cy.get('[data-testid="registerEmail"]').type(randomEmail)
        cy.get('[data-testid="registerPassword"]').type('gfd.sdk.6574')
        cy.get('[data-testid="registerOffers"]').click()
        cy.get('[name=conditions]').check()
        cy.get('[data-testid="registerSubmit"]').click({force:true})
    }) 
    it('Check if it created',()=>{
        cy.contains(randomFirstName).should('exist')
    })
    
})