describe("Accessibility Test for DemoQA Form", () => {
  // beforeEach(() => {
  //   cy.visit("https://demoqa.com/automation-practice-form");
  // });

  it("should fill out the form using keyboard shortcuts", () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.readFile("cypress/test-data/part2.json").then((urls) => {
      cy.visit(urls.assignment4.BASE_URL);
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
    // Navigate and fill in the form using keyboard shortcuts
    // cy.get("#firstName").type("{selectall}Test").tab().type("User").tab();
    // cy.get("#userEmail").type("test.user@testing.com").tab();
    // cy.get("#genterWrapper").type("{rightarrow}").tab();
    // cy.get("#userNumber").type("1234567890").tab();
    // cy.get("#dateOfBirthInput").type("01012000").tab();
    // cy.get(".subjects-auto-complete__value-container")
    //   .type("Math{enter}")
    //   .tab();
    // cy.get("#hobbiesWrapper")
    //   .type("{downarrow}{space}")
    //   .tab()
    //   .tab()
    //   .tab()
    //   .tab();
    // cy.get("#currentAddress").type("123 Main Street").tab();

    // // Submit the form
    // cy.get("#submit").click();

    // Validate the submission
    cy.url().should("include", "automation-practice-form");
    cy.get(".modal-title").should(
      "have.text",
      "Thanks for submitting the form"
    );
  });
});
