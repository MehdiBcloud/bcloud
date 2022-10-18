/// <reference types="Cypress"/>
const Exams = [
    "PRINCE2 6th Edition Foundation",
    "PRINCE2® 6th Edition Practitioner",
    "Professional Scrum Master I",
    "ITIL® 4 Foundation",
    "VeriSM Foundation",
    "COBIT 5 Foundation",
    "EXIN Cloud Computing Foundation",
    "EXIN DevOps Foundation",
    "ISTQB FOUNDATION",
    "ISTQB Agile Tester",
    "ISTQB CTAL Test Manager",
    "ISTQB Mobile Application Tester"
]
for (let index = 0; index < Exams.length; index++) {
    describe(''+Exams[index]+'',()=>{
        before(() => {
            cy.visit('https://www.bcloud.ma/')
        })
        it('Type: '+Exams[index]+'',()=>{
            cy.get('[data-testid=global-search-bar]').find('>div >button').click()
            cy.get('#menu-list-grow >li').eq(1).click()
            cy.get('[data-testid=global-search-bar] >input').type(Exams[index]+"{enter}")
        })
        it('Check if it exist',()=>{
            cy.get('[alt="<b>'+Exams[index]+'</b>"]').should('exist')
        })
        it('Check if image is completly visible',()=>{
            cy.get('[alt="<b>'+Exams[index]+'</b>"]')
            .should('be.visible')
            .and(($img) => {
                expect($img[0].naturalWidth).to.be.greaterThan(0)
            })
        }) 
    })
}
