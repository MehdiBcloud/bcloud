/// <reference types="Cypress"/>
const Courses = [
    "PRINCE2® 6th Edition Foundation",
    "PMP- Project Management Professional",
    "Professional Scrum Master I",
    "Professional Scrum Product Owner I",
    "Leading SAFe® 5 Agilist",
    "SAFe® 5.1 Scrum Master",
    "SAFe®5 Product Owner / Product Manager",
    "COBIT 5 Foundation",
    "ISO 27001 Lead Implementer",
    "ISO 27001 Lead Auditor",
    "COBIT 2019 Foundation",
    "AWS Certified Solutions Architect - Associate",
    "DevOps Foundation",
    "Salesforce Administrator I",
    "Selenium A4Q Foundation",
    "ISTQB CTAL TEST MANAGER",
    "ISTQB Agile Tester",
    "ISTQB Foundation",
]
for (let index = 0; index < Courses.length; index++) {
    describe(''+Courses[index]+'',()=>{
        it('Visit Bcloud.ma',()=>{
            cy.visit('https://www.bcloud.ma/')
        })
        it('Type: '+Courses[index]+'',()=>{
            cy.get('[data-testid=global-search-bar]').find('>div >button').click()
            cy.get('#menu-list-grow >li').eq(0).click()
            cy.get('[data-testid=global-search-bar] >input').type(Courses[index]+"{enter}")
        })
        it('Check if it exist',()=>{
            cy.get('[alt="<b>'+Courses[index]+'</b>"]').should('exist')
        })
        it('Check if image is completly visible',()=>{
            cy.get('[alt="<b>'+Courses[index]+'</b>"]')
            .should('be.visible')
            .and(($img) => {
                expect($img[0].naturalWidth).to.be.greaterThan(0)
            })
        }) 
    })
}
