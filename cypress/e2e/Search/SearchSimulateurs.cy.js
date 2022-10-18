/// <reference types="Cypress"/>
const Simulateurs = [
    "Gestion de projet",
    "Gestion de projet Practitioner",
    "Professional Scrum Master I",
    "Professional Scrum Product Owner I",
    "Professional Scrum Master II",
    "SAFe® Agilist 5.1",
    "COBIT 5 FOUNDATION",
    "COBIT 2019 Foundation",
    "ISTQB Foundation",
    "Selenium A4Q Foundation",
    "Gestion des services IT",
    "IQBBA Foundation",
]
for (let index = 0; index < Simulateurs.length; index++) {
    describe(''+Simulateurs[index]+'',()=>{
        before(() => {
            cy.visit('https://www.bcloud.ma/')
        })
        it('Type: '+Simulateurs[index]+'',()=>{
            cy.get('[data-testid=global-search-bar]').find('>div >button').click()
            cy.get('#menu-list-grow >li').eq(2).click()
            cy.get('[data-testid=global-search-bar] >input').type(Simulateurs[index]+"{enter}")
        })
        it('Check if it exist',()=>{
            cy.get('[alt="<b>'+Simulateurs[index]+'</b>"]').should('exist')
        })
        it('Check if image is completly visible',()=>{
            cy.get('[alt="<b>'+Simulateurs[index]+'</b>"]')
            .should('be.visible')
            .and(($img) => {
                expect($img[0].naturalWidth).to.be.greaterThan(0)
            })
        }) 
    })
}
