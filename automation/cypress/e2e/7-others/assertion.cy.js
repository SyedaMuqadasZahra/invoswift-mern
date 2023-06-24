 it('Assertion Demo', () => {
    cy.visit('https://example.cypress.io/')

    cy.contains('get').click()

    cy.get('#query-btn')
   //  Implicit Assertion
    .should('contain', 'Button')
    .and('have.class', 'query-btn')
    .and('be.visible')
    .and('be.enabled')

    expect(true).to.be.true

    // Explicit Assertion
    assert.notEqual(4, 5, 'Not Equal')
    assert.equal(4, '4', 'Not Equal')
 })