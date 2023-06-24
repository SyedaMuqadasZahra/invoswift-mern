/// <reference types="cypress" />

beforeEach('Before section', () => {
    cy.fixture('example.json').as("testdata")
})

it('Reading files using Fixutres', function(){

    cy.fixture('example.json')
    .then((data) => {
        cy.log(data.name)
        cy.log(data.email)
        cy.log(data.body)
    })

    cy.log('Email: ', this.testdata.email)
})

it('Readfile Method', () => {
    cy.readFile('./cypress/fixtures/example.json').then((data) => {
        cy.log(data.name)
    })
})

it('Readfile Method', () => {
    cy.writeFile('Sample.txt', 'Hello World')
})
