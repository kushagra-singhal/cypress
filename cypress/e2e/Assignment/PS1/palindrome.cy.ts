
// describe("Palindrome Checker", () => {
//   it("should check if a string is palindrome", () => {
//     cy.exec(
//       'node cypress/support/palindrome.js "banana"'
//     ).then((result) => {
//       // Log the result
//       const output = result.stdout.trim();
//       cy.log(`Palindrome Check: ${output}`);
//       expect(output).to.eq("false");
//     });
//   });
// });

// cypress/support/palindrome.js
// cypress/e2e/Assignment/PS1/palindrome.js

describe("Palindrome Function Test", () => {
  it("Checks if a string is a palindrome", () => {
    cy.exec(
      'node cypress/support/palindrome.js "A man, a plan, a canal, Panama"'
    ).then((result) => {
      const output = result.stdout.trim();
      cy.log(`Palindrome Check: ${output}`);
      expect(output).to.eq("true");
    });
  });
});
