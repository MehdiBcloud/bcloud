/// <reference types="Cypress"/>
describe('Cloud',()=>{
    const Clouds = {
                "Cat1":[8,'les-clouds-messagerie-et-office'],
                "Cat2":[1,'les-clouds-securite'],
                "Cat3":[5,'les-clouds-infrastructure'],
                "Cat4":[1,'les-clouds-Productivité'],
                "Cat5":[3,'les-clouds-gestion-de-projet'],
            }
    for (const [key, value] of Object.entries(Clouds)) {
        describe(''+value[1]+'',()=>{
            for (let i = 0; i<value[0]; i++) {
                describe('Product '+(i+1),()=>{
                    before(() => {
                        cy.visit('https://www.bcloud.ma/')
                    })
                    it('Check First image',()=>{
                        cy.selectCat(value[1])

                        cy.get('#__next >div >div').eq(1)
                        .find('>div').eq(1)
                        .find('>div >div >div >div >div')
                        .find('>img').eq(i).should('be.visible')
                        .and(($img) => {
                            expect($img[0].naturalWidth).to.be.greaterThan(0)
                        })
                    })

                    it('Select product',()=>{
                        cy.get('#__next >div >div').eq(1)
                        .find('>div').eq(1)
                        .find('>div >div >div >div >div')
                        .find('>p >a').eq(i).click({force: true})
                    })

                    it('Check Second image',()=>{
                        cy.get('#container-fluid >div').eq(1).find('>div').eq(1)
                        .find('>div').eq(0)
                        .find('>div').eq(0)
                        .find('>div >img')
                        .should('be.visible')
                        .and(($img) => {
                            expect($img[0].naturalWidth).to.be.greaterThan(0)
                        }) 
                    })
                
                    it('Check last two images',()=>{
                        cy.get('#container-fluid >div').eq(1)
                        .find('>div').eq(1)
                        .find('>div').eq(0)
                        .find('>div').eq(1)
                        .find('>a').invoke('text').then((text)=>{
                            if(text=='Acheter maintenant'){
                                cy.get('[data-testid=addToCart]').click()
                                cy.get('[data-testid=openCart]').click()
                                cy.checkImage("thumbnail") 
                            }            
                        })
                    })
                })     
            }
        })
    } 

})