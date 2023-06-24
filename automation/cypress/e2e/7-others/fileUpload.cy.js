/// <reference types="cypress" />

it('File Upload functoin Test', () => {
    cy.visit('https://trytestingthis.netlify.app/')
    cy.get('#myfile').attachFile('politics2.png')
})