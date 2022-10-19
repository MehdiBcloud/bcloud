/// <reference types="Cypress"/>
/// <reference types="cypress-iframe" />

describe('paypal order', () => {
    const dataLogin = require('../../fixtures/Login.json');
    const PaypalInfos = require('../../fixtures/Paypal.json');
    
    beforeEach(() => {
        Cypress.Cookies.preserveOnce("token");
        Cypress.Cookies.preserveOnce("ctoken");
        Cypress.config('defaultCommandTimeout', 10000);
    })
    before(()=>{
        cy.clearCookies();
    })
    it('Visit dev.bcloud.ma',()=>{
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
        cy.get('[name=emailLogin]').type(dataLogin.email)
        cy.get('[name=passwordLogin]').type(dataLogin.pass+'{enter}', {sensitive: true})
    })
    it('Certif Agile Scrum',()=>{
        cy.wait(1000)
        cy.get('#nav >li >span >i').eq(1).trigger('mouseover',{force: true})
        cy.get('[data-testid=certifications-methode-agile-scrum]').trigger('mouseover',{force: true})
        cy.get('[data-testid="certification-professional-scrum-master-I"]').click({force:true})
    })
    it('Add to Cart',()=>{
        cy.wait(500)
        cy.get('[data-testid=addToCart]').click()
        cy.get('[data-testid=continueShopping]').click()
    })
    it('Go to Cart',()=>{
        cy.wait(500)
        cy.get('[data-testid=cart]').click({force:true})
    })

    it('Confirm Purchase',()=>{
        cy.wait(500)
        cy.get('[data-testid=PayOrder]').click()
    })
    it('Select Paypal Option',()=>{
        cy.wait(500)
        cy.get("#vertical-tab-1").click({force:true})
    })
    it('Paypal Sandbox',()=>{
        cy.paypalFlow()  
    })
    it('Paypal Credentials',()=>{
        cy.PaypalCredentials(PaypalInfos.email,PaypalInfos.password)  
    })
    it('Back Home',()=>{
        cy.wait(500)
        cy.contains('Votre commande a été confirmée.',{timeout:30000}).should('be.visible')
        cy.get('a[href="/"]').eq(1).click({force:true})
    })

    it.skip('Salesforce Sync',()=>{
        cy.wait(500)
        cy.request({   
            method: 'POST',
            url: "https://bcloud--staging.my.salesforce.com/services/oauth2/token",
            form:true,
            body:{
                "client_id":"3MVG91LYYD8O4krRFZk502yUZjqFaLU52fYEfkOl4kV6SPp8o_fUoA3KtPGaj4tcLL2zVL9y1bfjmTCUtAfnp",
                "client_secret":"25D05A9400290032A21E87846B89186AD59EB95AE61526BD347610A0A40B10CF",
                "grant_type":"password",
                "username":"ayoub.ammor@bcloud.ma.staging",
                "password":"Emsicentre@12345R9sd6DIXuLxmKiInyC8KFJbK"
            }
            }).then((res)=>{
                cy.log(res.body.access_token)
                cy.request({
                    method:'GET',
                    url:"https://bcloud--staging.my.salesforce.com/services/data/v50.0/query/?q=SELECT+Id,Status+From+Order+where+AccountId+in+(SELECT+id+From+Account+where+Name+=+'mehdi+mehdi')+order+by+CreatedDate+desc+LIMIT+1",
                    headers:{
                        'authorization' : 'Bearer '+ res.body.access_token
                    }
                }).then((resOrder)=>{
                    cy.log(res.body.access_token)
                    cy.log(resOrder.body.records[0].Id)
                    cy.request({
                        method:'DELETE',
                        url:"https://bcloud--staging.my.salesforce.com/services/data/v50.0/sobjects/Order/"+resOrder.body.records[0].Id,
                        headers:{
                            'authorization' : 'Bearer '+ res.body.access_token
                        }
                    })
                })
                
            })
    })
})