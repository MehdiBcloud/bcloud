/// <reference types="Cypress"/>
describe('Exams',()=>{
    const Exams = {
                "Cat1":[2,'certifications-gestion-de-projet'],
                "Cat2":[1,'certifications-methode-agile-scrum'],
                "Cat3":[2,'certifications-gestion-des-services-it'],
                "Cat4":[1,'certifications-gouvernance-it-et-conformite'],
                "Cat5":[1,'certifications-cloud-computing'],
                "Cat6":[1,'certifications-devops'],
                "Cat8":[4,'certifications-tests-de-logiciels'],
            }
    for (const [key, value] of Object.entries(Exams)) {
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