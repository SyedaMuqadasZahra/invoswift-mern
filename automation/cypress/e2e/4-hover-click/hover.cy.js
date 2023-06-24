describe("hover and click", function () {
  it("should hover on component and click", function () {
    cy.viewport(1024, 768);
    cy.visit("https://www.speedtest.net/");
    cy.wait(5000);
    cy.get(".main-menu-link", { timeout: 5000 }).trigger("mouseover", {
      force: true,
    });
    cy.get('.nav-container .nav-menu ul li > a[href="/apps/ios"]', {
      timeout: 5000,
    }).click({ force: true });
  });
});
                       