// describe("Shopping Cart Tests", () => {
//   beforeEach(() => {
//     // Visit the shopping cart website
//     cy.visit(urls.assignment3.BASE_URL);
//   });

//   it("should display the correct data", () => {
//     cy.get(".product").should("have.length.greaterThan", 0);

//     cy.get(".product:first-child .product-title").should(
//       "contain",
//       "Product 1"
//     );
//     cy.get(".product:first-child .product-price").should("contain", "$10.00");
//   });

//   it("should handle error state appropriately", () => {
//     // Mock a response to simulate an error state
//     cy.intercept(
//       "GET",
//       "https://react-shopping-cart-67954.firebaseapp.com/products",
//       {
//         statusCode: 500,
//         body: "Internal Server Error",
//       }
//     ).as("getProducts");

//     // Trigger an action that would fetch data and display an error
//     cy.get(".load-products-button").click();

//     // Wait for the mocked API call to complete
//     cy.wait("@getProducts");

//     cy.get(".error-message").should(
//       "contain",
//       "Something went wrong. Please try again."
//     );
//   });

//   it("should handle different responses", () => {
//     // Mock a successful response with specific data
//     cy.intercept(
//       "GET",
//       "https://react-shopping-cart-67954.firebaseapp.com/products",
//       {
//         statusCode: 200,
//         body: [
//           {
//             id: 1,
//             title: "Product 1",
//             price: 10.0,
//           },
//         ],
//       }
//     ).as("getProducts");

//     // Trigger an action that would fetch data and check if it's displayed correctly
//     cy.get(".load-products-button").click();

//     // Wait for the mocked API call to complete
//     cy.wait("@getProducts");

//     // Add assertions to check if the correct data is displayed
//     cy.get(".product:first-child .product-title").should(
//       "contain",
//       "Product 1"
//     );
//     cy.get(".product:first-child .product-price").should("contain", "$10.00");

//     // Mock a different response for a different scenario
//     cy.intercept(
//       "GET",
//       "https://react-shopping-cart-67954.firebaseapp.com/products",
//       {
//         statusCode: 200,
//         body: [
//           {
//             id: 2,
//             title: "Product 2",
//             price: 20.0,
//           },
//         ],
//       }
//     ).as("getDifferentProducts");

//     // Trigger the same action with different data and check if it's displayed correctly
//     cy.get(".load-products-button").click();

//     // Wait for the mocked API call to complete
//     cy.wait("@getDifferentProducts");

//     // Add assertions to check if the correct data is displayed
//     cy.get(".product:first-child .product-title").should(
//       "contain",
//       "Product 2"
//     );
//     cy.get(".product:first-child .product-price").should("contain", "$20.00");
//   });
// });


describe("Shopping Cart Tests", () => {
  it("Display Correct Data - Positive Scenario", () => {
    cy.readFile("cypress/test-data/part2.json").then((urls) => {
      cy.visit(urls.assignment3.BASE_URL);

      cy.contains("Add to cart").should("have.length.greaterThan", 0);
    });
  });

  it("Intercept API request and check data", () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.readFile("cypress/test-data/part2.json").then((urls) => {
      cy.intercept("GET", urls.assignment3.BE_URL).as("getData");

      cy.visit(urls.assignment3.BASE_URL);

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
    cy.readFile("cypress/test-data/part2.json").then((urls) => {
      cy.intercept("GET", urls.assignment3.BE_URL, (req) => {
        req.reply({
          statusCode: 500,
          body: "ERROR: Internal Server Error",
        });
      }).as("getError");

      cy.visit(urls.assignment3.BASE_URL, {
        failOnStatusCode: false,
      });

      cy.wait("@getError").then((interception) => {
        expect(interception.response?.statusCode).to.eq(500);
      });
    });
  });
  it("Error Handling - Mock 404 Not Found", () => {
    cy.readFile("cypress/test-data/part2.json").then((urls) => {
      cy.intercept(urls.assignment3.BE_URL, {
        statusCode: 404,
        body: "Not Found: Resource not available",
      }).as("getNotFound");

      cy.visit(urls.assignment3.BASE_URL, {
        failOnStatusCode: false,
      });

      cy.wait("@getNotFound").then((interception) => {
        expect(interception.response?.statusCode).to.eq(404);
      });
    });
  });
});