import data from "../../../test-data/test-login.json"
describe("Login Flow Test", () => {
  beforeEach(() => {
    cy.readFile("cypress/test-data/data2.json").then((urls) => {
      cy.visit(urls.testLogin.BASE_URL);
    });
  });
  data.forEach((data) => {
    it(`Login - ${data.scenarioname}`, () => {
      cy.get("#username").type(data.username);
      cy.get("#password").type(data.password);

      cy.get("#submit").click();

      cy.get(data.assertionid).should("contain", data.assertion);
    });
  });
});