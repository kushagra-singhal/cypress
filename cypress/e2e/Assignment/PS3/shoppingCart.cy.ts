
describe("Shopping Cart Tests", () => {
  it("Display Correct Data - Positive Scenario", () => {
    cy.readFile("cypress/test-data/data2.json").then((urls) => {
      cy.visit(urls.shoppingCart.BASE_URL);

      cy.contains("Add to cart").should("have.length.greaterThan", 0);
    });
  });

  it("Intercept API request and check data", () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.readFile("cypress/test-data/data2.json").then((urls) => {
      cy.intercept("GET", urls.shoppingCart.BE_URL).as("getData");

      cy.visit(urls.shoppingCart.BASE_URL);

      cy.wait("@getData").then((interception) => {
        const responseBody = interception.response?.body;

        if (typeof responseBody === "object") {
          expect(responseBody).to.have.property("products");
        }
      });
    });
  });

  it("Error Handling - Mock 500 Internal Server Error", () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.readFile("cypress/test-data/data2.json").then((urls) => {
      cy.intercept("GET", urls.shoppingCart.BE_URL, (req) => {
        req.reply({
          statusCode: 500,
          body: "ERROR: Internal Server Error",
        });
      }).as("getError");

      cy.visit(urls.shoppingCart.BASE_URL, {
        failOnStatusCode: false,
      });

      cy.wait("@getError").then((interception) => {
        expect(interception.response?.statusCode).to.eq(500);
      });
    });
  });
  it("Error Handling - Mock 404 Not Found", () => {
    cy.readFile("cypress/test-data/data2.json").then((urls) => {
      cy.intercept(urls.shoppingCart.BE_URL, {
        statusCode: 404,
        body: "Not Found: Resource not available",
      }).as("getNotFound");

      cy.visit(urls.shoppingCart.BASE_URL, {
        failOnStatusCode: false,
      });

      cy.wait("@getNotFound").then((interception) => {
        expect(interception.response?.statusCode).to.eq(404);
      });
    });
  });
});