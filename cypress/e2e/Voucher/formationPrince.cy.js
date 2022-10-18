/// <reference types="Cypress"/>

describe('PRINCE2® 6th Edition Foundation voucher',()=>{
	let amount;
	let price;
	const dataLogin = require('../../fixtures/Login.json');
	before(()=>{
		cy.clearCookies()
	})
	beforeEach(()=>{
		cy.viewport(1280 , 720);
        Cypress.Cookies.preserveOnce("token");
        Cypress.Cookies.preserveOnce("ctoken");
	})
	it('Go to www.bcloud.ma',()=>{
        cy.visit('https://www.bcloud.ma/')
    })
    it('Login (www.bcloud.ma)',()=>{
        cy.wait(500)
        cy.get('#menua').click()
        cy.get('[name=emailLogin]').type(dataLogin.email)
        cy.get('[name=passwordLogin]').type(dataLogin.pass+'{enter}', {sensitive: true})
    })
    it('Course PRINCE2® 6th Edition Foundation',()=>{
        cy.wait(500)
        cy.get('#nav >li >span >i').eq(0).trigger('mouseover',{force: true})
        cy.get('[data-testid=formations-gestion-de-projet]').trigger('mouseover',{force: true})
        cy.get('[data-testid="formation-prince2-foundation"]').click({force:true})
    })
    it('Add to cart',()=>{
        cy.wait(500)
        cy.get('[data-testid=addToCartCourse]').click()
        cy.get('[data-testid=addToCartCourse]').eq(1).click()
        cy.get('[data-testid=openCart]').click()
    })
    it('Add promo code',()=>{
    	cy.wait(500)
    	cy.get('#__next >div')
        .find('>div').eq(1)
        .find('>div')
        .find('>div').eq(1)
        .find('>div').eq(0)
        .find('>div').eq(1)
        .find('>div >div').eq(1)
        .find('>div').eq(1)
        .find('>b').invoke('text').then((TotalPrice)=>{
            amount = TotalPrice;
        })
        cy.get('#splide01-slide01 > span').invoke('text').then((text1) => {
            cy.log(text1)
            cy.get('form').eq(1)
            .find('>div >div >input').type(text1,{force:true})
            cy.contains('Appliquer').click()
        })        
    })
    it('Check Amount',()=>{
    	cy.wait(500)
    	cy.get('#__next >div')
        .find('>div').eq(1)
        .find('>div')
        .find('>div').eq(1)
        .find('>div').eq(0)
        .find('>div').eq(1)
        .find('>div >div').eq(1)
        .find('>div').eq(1)
        .find('>b').invoke('text').then((priceReduced)=>{
            expect(priceReduced.match(/\d+/)[0]).to.equal(String(Math.floor((amount.match(/\d+/)[0] * 5)/100)))
        })
        cy.get('#__next >div')
        .find('>div').eq(1)
        .find('>div')
        .find('>div').eq(1)
        .find('>div').eq(0)
        .find('>div').eq(1)
        .find('>div >div').eq(2)
        .find('>div').eq(1)
        .find('>b').invoke('text').then((totalPrice)=>{
            expect(totalPrice.match(/\d+/)[0]).to.equal(String(amount.match(/\d+/)[0] - Math.floor((amount.match(/\d+/)[0] * 5)/100)))
        })
        cy.get('button[data-testid="PayOrder"]').click()
    })
    it('Check Last Amount',()=>{
    	cy.wait(500)
    	cy.get('#navbar').parent()
        .find('>div').eq(1)
        .find('>div >div').eq(1)
        .find('>div').eq(0)
        .find('>div').eq(1)
        .find('>div').eq(3)
        .find('>div').eq(1)
        .find('>strong').invoke('text').then((totalPrice)=>{
            expect(totalPrice.match(/\d+/)[0]).to.equal(String(amount.match(/\d+/)[0] - Math.floor((amount.match(/\d+/)[0] * 5)/100)))
        })
        cy.get('#c2pSubmitButtonContainer >button').invoke('text').then((productPrice)=>{
            expect(productPrice.match(/\d+/)[0]).to.equal(String(amount.match(/\d+/)[0] - Math.floor((amount.match(/\d+/)[0] * 5)/100)))
        })
    })
})