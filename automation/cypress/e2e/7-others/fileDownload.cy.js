/// <reference types="cypress" />
/// <reference types="cypress-downloadfile"/>

it('File Download functoin Test', () => {
    // // This command will gdownload the file in the "cypress/downloads" folder
    // cy.downloadFile('https://www.africau.edu/images/default/sample.pdf','cypress/downloads','readMe.pdf')
    cy.downloadFile('https://www.africau.edu/images/default/sample.pdf','cypress/downloads','sample.pdf')
    cy.readFile("./cypress/downloads/sample.pdf").should('contain', 'Simple')


    // // This command will gdownload the file in the "downloads" folder in the root
    // // if the "downloads" or mentioned folder is not exist, then this is created automatically
    // cy.downloadFile('https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg','downloads','example.jpg')
})