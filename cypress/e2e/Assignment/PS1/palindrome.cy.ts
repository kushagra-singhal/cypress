

// describe("Palindrome Check", () => {
//   it("should check if a string is palindrome or not", () => {
//     cy.exec('node cypress/e2e/Assignment2/palindrome.js "madam"') // replace with the correct path
//       .its('stdout')
//       .should("eq", "true"); // the expected output for the given example

//     cy.exec('node cypress/e2e/Assignment2/palindrome.js "hello"') // replace with the correct path
//       .its("stdout")
//       .should("eq", "false"); // the expected output for the given example
//   });
// });

// Approach 2
// palindrome_spec.js

// describe("Palindrome Checker", () => {
//   it("should check if a string is palindrome", () => {
//     // Execute the external JavaScript file using cy.exec
//     cy.exec(
//       'node cypress/support/palindrome.js "A man, a plan, a canal, Panama"'
//     ).then((result) => {
//       // Log the result
//       const output = result.stdout.trim();
//       cy.log(`Palindrome Check: ${output}`);

//       // assuming the expected output is "true"
//       expect(output).to.eq("true");
//     });
//   });
// });

// cypress/support/palindrome.js

describe("Palindrome Function Test", () => {
  it("Checks if a string is a palindrome", () => {
    cy.exec(
      'node cypress/e2e/Assignment/PS1/palindrome.js "A man, a plan, a canal, Panama"'
    ).then((result) => {
      const output = result.stdout.trim();
      cy.log(`Palindrome Check: ${output}`);
      expect(output).to.eq("");
    });
  });
});

