describe("Accessibility Test for DemoQA Form", () => {

  it("should fill out the form using keyboard shortcuts", () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.readFile("cypress/test-data/data2.json").then((urls) => {
      cy.visit(urls.form_accessibility.BASE_URL);
    });
    cy.tab()
      .tab()
      .type("John")
      .tab()
      .type("Doe")
      .tab()
      .type("johndoe@example.com")
      .tab()
      .click({ force: true })
      .tab()
      .tab()
      .tab()
      .type("1234567890")
      .tab()
      .type("11 26 1999{enter}")
      .tab()
      .type("Maths{enter}")
      .tab()
      .click({ force: true })
      .tab()
      .tab()
      .tab()
      .tab()
      .type("India")
      .tab()
      .type("{downArrow}")
      .type("{downArrow}")
      .tab()
      .tab()
      .type("{downArrow}")
      .type("{downArrow}")
      .tab()
      .tab()
      .type("{enter}");

    cy.get(".modal-dialog").should("be.visible");
    // Validate the submission
    cy.url().should("include", "automation-practice-form");
    cy.get(".modal-title").should(
      "have.text",
      "Thanks for submitting the form"
    );
  });
});
