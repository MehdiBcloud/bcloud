/// <reference types="Cypress"/>
describe('Bcloud Login Test', () => {
    const dataLogin = require('../../fixtures/Login.json');
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
    it('Login',()=>{
        cy.wait(500)
        cy.get('#menua').click()
        cy.BcloudLogin({email:'mehdi.mehdi@gmail.com', password:'mehdi17112002'})
    })
    it("Login successfully",()=>{
        cy.wait(500)
        cy.contains("mehdi").should('exist')
    })
})