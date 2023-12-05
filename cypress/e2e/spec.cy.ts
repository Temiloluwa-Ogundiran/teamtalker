describe("Testing", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
  it("Loading SignIn Page", () => {
    cy.visit("http://localhost:3000", { failOnStatusCode: false });

    cy.contains("Sign in", {timeout: 10000});
  });

  it("Validate correct user", () => {
    cy.visit("http://localhost:3000", { failOnStatusCode: false });

    cy.contains("Sign in", {timeout: 10000});
    cy.url().should("include", "sign-in");

    cy.get("#identifier-field").type("temiloluuu@gmail.com");

    cy.get(".cl-formButtonPrimary").click();

    cy.get("#password-field").type("783_goguN");
    cy.get(".cl-formButtonPrimary").click();
    cy.get(".mob", { timeout: 20000 }).click();
    cy.contains("Server", { timeout: 20000 });
  });

  it("reject wrong user", () => {
    cy.visit("http://localhost:3000", { failOnStatusCode: false });

    cy.contains("Sign in", {timeout: 10000});
    cy.url().should("include", "sign-in");

    cy.get("#identifier-field").type("a@b.com");

    cy.get(".cl-formButtonPrimary").click();

    cy.contains("Couldn't find your account.")
  });

  it("reject wrong password", () => {
    cy.visit("http://localhost:3000", { failOnStatusCode: false });

    cy.contains("Sign in", {timeout: 10000});
    cy.url().should("include", "sign-in");

    cy.get("#identifier-field").type("temiloluuu@gmail.com");

    cy.get(".cl-formButtonPrimary").click();

    cy.get("#password-field").type("wrongpassword");
    cy.get(".cl-formButtonPrimary").click();
  });
});
