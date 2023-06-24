it("Visit google website", () => {
  cy.visit("https://www.google.com");

  cy.get(".gLFyf").type("Cypress keyboard shortcuts");
  cy.contains("Google Search").click();
  cy.wait(7000).contains("Videos").click();
});
