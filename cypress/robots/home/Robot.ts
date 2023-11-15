import { BaseHands, BaseEyes, BaseDependencies } from "../BaseRobot";

export class HomeDependencies extends BaseDependencies {
  init() {
    this.accessUrl(Cypress.env("BASEURL"));
    cy.get("body").then((body) => {
      if (
        body.find(".glow-toaster-button-dismiss input").length > 0
      ) {
        cy.get(".glow-toaster-button-dismiss input").click();
      }
    });
  }
  clearAfterAll() {
    cy.window().then((win) => win.sessionStorage.clear());
    cy.clearCookies();
    cy.clearLocalStorage();
  }
}

export class HomeEyes extends BaseEyes {
  getInitialUrl() {
    return cy.url();
  }
  checkCurrentUrl(previousUrl: string) {
    cy.url().then((newUrl) => {
      expect(previousUrl).to.be.equal(newUrl);
    });
  }
}

export class HomeHands extends BaseHands {
  goToTodaysDeals() {
    cy.contains("Today's Deals").click();
  }
  enterSearchKey(searchKey: string) {
    this.typeTextonId("twotabsearchtextbox", searchKey);
    this.clickOnId("nav-search-submit-button");
  }
  goToOrders() {
    this.clickOnId("nav-orders");
  }
  navigateToMobilesAndBack() {
    this.clickOnId("nav-hamburger-menu");
    cy.get("#hmenu-content div")
      .filter(":contains('Mobiles, Computers')")
      .first()
      .click();
    this.wait(1000);
    cy.contains("All Mobile Phones").click({ force: true });
    cy.go(-1);
  }

  goToAccount() {
    this.clickOnId("nav-link-accountList");
  }
}
