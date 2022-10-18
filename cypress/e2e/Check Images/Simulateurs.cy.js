/// <reference types="Cypress"/>
describe('Simulateurs',()=>{
    const Simulateurs={
                        "Cat1":[2,'simulators-gestion-de-projet'],
                        "Cat2":[4,'simulators-methode-agile-scrum'],
                        "Cat3":[2,'simulators-gouvernance-it-et-conformite'],
                        "Cat4":[2,'simulators-tests-de-logiciels'],
                        "Cat5":[1,'simulators-gestion-des-services-it'],
                        "Cat6":[1,'simulators-moa-business-analysis'],
                        }    
    for (const [key, value] of Object.entries(Simulateurs)) {
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
                        cy.get('#container-fluid >div').eq(1)
                        .find('>div').eq(1)
                        .find('>div').eq(0)
                        .find('>div').eq(0)
                        .find('>div >img')
                        .should('be.visible')
                        .and(($img) => {
                            expect($img[0].naturalWidth).to.be.greaterThan(0)
                        }) 
                    })

                    it('Check last image',()=>{
                        cy.get('[data-testid=addToCart]')
                        .invoke('text').then((text)=>{
                            if(text=='Ajouter au panier'){
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