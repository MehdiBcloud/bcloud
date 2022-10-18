/// <reference types="Cypress"/>
describe('Formations',()=>{
    const dataFormation = {
        "Cat1":[4,"formations-gestion-de-projet"],
        "Cat2":[11,"formations-methode-agile-scrum"],
        "Cat3":[1,"formations-gestion-des-services-it"],
        "Cat4":[6,"formations-gouvernance-it-et-conformite"],
        "Cat5":[6,"formations-cloud-computing"],
        "Cat6":[5,"formations-devops"],
        "Cat7":[1,"formations-gestion-des-risques"],
        "Cat8":[3,"formations-gestion-de-la-qualite"],
        "Cat9":[3,"formations-salesforce"],
        "Cat10":[2,"formations-it-et-software"],
        "Cat11":[4,"formations-intelligence-artificielle"],
        "Cat12":[6,"formations-tests-de-logiciels"],
        "Cat13":[2,"formations-systemes-exploitations"],
        "Cat14":[3,"formations-bureautique-et-outils-collaboratifs"],
        "Cat15":[1,"formations-blockchain"],
        "Cat16":[2,"formations-sap"],
        "Cat17":[2,"formations-coaching-agile"],
        "Cat18":[4,"formations-developpement-web"],
        "Cat19":[2,"formations-moa-business-analysis"],
        "Cat20":[4,"formations-finance"],
        }
    for (const [key, value] of Object.entries(dataFormation)) {
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
                        cy.get('#container-fluid >div').eq(1).find('>div').eq(1)
                        .find('>div').eq(0)
                        .find('>div').eq(1)
                        .find('>a').invoke('text').then((text)=>{
                            if(text=='Ajouter au panier'){
                                cy.contains('Ajouter au panier').click()
                                cy.checkImage("thumbnail")

                                cy.get('[title="Ajouter au panier"]').click()
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

    

