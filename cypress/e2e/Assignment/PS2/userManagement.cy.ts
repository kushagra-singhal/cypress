import "cypress-plugin-tab";
describe("User Management Tests", { testIsolation: false }, () => {
  const generateID = () => {
    const today = new Date();
    return today.toString().replace(/[^\d]/g, "");
  };
  before(() => {
    cy.readFile("cypress/test-data/data2.json").then((urls) => {
      cy.visit(urls.userManagement.BASE_URL);
    });
  });
  after(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    cy.clearCookies();
    cy.clearLocalStorage();
  });
  it("Login and Store ID in Local Storage", () => {
    cy.get("input[name=username]").type("Admin");
    cy.get("input[name=password]").type("admin123");
    cy.get("button[type=submit]").click();

    const userID = generateID();
    window.localStorage.setItem("userID", userID);
  });

  it("Create User with Stored ID", () => {
    const userID = window.localStorage.getItem("userID");
    const username = `user${userID}`;
    const password = `password${userID}`;

    cy.get("ul.oxd-main-menu li").eq(0).click();
    cy.contains("Add").click();

    cy.get(".oxd-userdropdown-name")
      .invoke("text")
      .then((tempUserName) => {
        cy.get(".oxd-select-text-input")
          .eq(0)
          .click()
          .type("{downArrow}")
          .type("{enter}")
          .tab()
          .type(tempUserName)
          .wait(2000)
          .type("{downArrow}{enter}")
          .tab()
          .type("{downArrow}")
          .type("{enter}")
          .tab()
          .type(username)
          .tab()
          .type(password)
          .tab()
          .type(password)
          .tab()
          .tab()
          .click();
      });
  });

  it("Delete User", () => {
    const userID = window.localStorage.getItem("userID");
    cy.wait(5000);
    cy.get(".oxd-form input").first().type(`user${userID}`);
    cy.get(".oxd-form button").last().click();
    cy.get(".oxd-table-card .oxd-table-cell", { timeout: 10000 })
      .contains(`user${userID}`)
      .should("exist");
    cy.get(".oxd-table-cell-actions button").first().click();
    cy.get(".orangehrm-modal-footer button").last().click();
  });
});