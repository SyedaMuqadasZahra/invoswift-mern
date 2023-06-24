import { LoginPage } from "../pages/login";

const loginPage = new LoginPage();

describe("All login Tests", () => {
  beforeEach(() => {
    cy.visit("https://opensource-demo.orangehrmlive.com/");
  });

  it("Login test 1", () => {
    cy.visit("https://opensource-demo.orangehrmlive.com/");

    loginPage.enterUsername("Admin");
    loginPage.enterPassword("admin123");
    loginPage.pressButton();
    cy.wait(5000);
  });

  it("Login test 2", () => {
    // cy.visit('https://opensource-demo.orangehrmlive.com/')
    loginPage.enterUsername("Admin");
    loginPage.enterPassword("admin123");
    loginPage.pressButton();
  });
});
