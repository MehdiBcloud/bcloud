/// <reference types="Cypress"/>

describe('Bcloud various Tests', () => {
    before(()=>{
        cy.clearCookies()
    })
    it('Go to dev.bcloud.ma',()=>{
        cy.visit('https://dev.bcloud.ma/',{
          auth: {
            username: 'dev',
            password: 'bcloud2020*',
          },
        })
    })
    it('Protocol should be https',()=>{
        cy.location('protocol').should('contain','https');
        cy.url().should('eq','https://dev.bcloud.ma/')
    })
    it('url should be https://dev.bcloud.ma/',()=>{
        cy.url().should('eq','https://dev.bcloud.ma/')
    })
    it('title should contain BCloud Maroc',()=>{
        cy.title().should('contain','BCloud Maroc')
    })
    it('hostname should equal dev.bcloud.ma',()=>{
        cy.location('hostname').should('eq','dev.bcloud.ma')
    })
    it('pathname should equal /cart',()=>{
        cy.get('[data-testid=cart]').click()
        cy.location('pathname').should('eq','/cart')
    })
    it.skip('ipapi test',()=>{
        cy.request({
            method:'GET',
            url:'https://api.ipify.org?format=json'
        }).then((res)=>{
            cy.request({
                method:'GET',
                url:'https://ipapi.co/'+res.body.ip+'/json/'
            }).then((resp)=>{
                cy.log(resp.body.city)
                cy.log(resp.body.country_name)
                cy.log(resp.body.region)
                cy.log(resp.body.timezone)
                cy.log(resp.body.currency_name)
            })
        })
    })
    
})