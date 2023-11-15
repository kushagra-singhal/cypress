// import data from "../../test-data/test-login.json";
import data from "../../../test-data/test-login.json"
describe("Login Flow Test", () => {
  beforeEach(() => {
    cy.readFile("cypress/test-data/part2.json").then((urls) => {
      cy.visit(urls.assignment5.BASE_URL);
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