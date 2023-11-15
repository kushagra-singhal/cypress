import { BaseHands, BaseEyes, BaseDependencies } from "../BaseRobot";

export class ListingDependencies extends BaseDependencies {}

export class ListingEyes extends BaseEyes {}

export class ListingHands extends BaseHands {
  printLastMobileNameAndPrice() {
    this.printDetails(
      ".s-card-container h2 span",
      "mobile name",
      false
    );
    this.printDetails(
      ".s-card-container .a-price-whole",
      "mobile price",
      false
    );
  }
  getLastMobileName() {
    return cy.get(".s-card-container h2 span").last().invoke("text");
  }
  clickLastMobile() {
    cy.get(".s-card-container h2 a")
      .last()
      .then(($el) => {
        $el.attr("target", "_self");
      })
      .click();
  }
  selectThirdProduct() {
    this.clickOnChildDom(
      "grid-main-container",
      "div[class*=DealGridItem-module__dealItemContent]",
      2
    );
    cy.get("body").then((body) => {
      if (
        body.find("div[class*=ProductShowcase__actions]").length > 0
      ) {
        cy.get("div[class*=ProductShowcase__actions] a")
          .eq(0)
          .click();
      }
      if (body.find("#octopus-dlp-asin-stream li").length > 0) {
        cy.get("#octopus-dlp-asin-stream li").eq(0).click();
      }
      if (body.find(".s-card-container h2 a").length > 0) {
        cy.get(".s-card-container h2 a")
          .eq(0)
          .then(($el) => {
            $el.attr("target", "_self");
          })
          .click();
      }
    });
  }
  selectPrimeAndPrintFirstProductDetails() {
    cy.get("#primeRefinements .a-checkbox").eq(0).click();
    this.printDetails(".s-card-container h2 span", "name");
    this.printDetails(".s-card-container .a-price-whole", "price");
    this.printDetails(
      ".s-card-container span[aria-label*=Delivery]",
      "delivery date"
    );
  }

  printDetails(
    selector: string,
    attribute: string,
    first: boolean = true
  ) {
    if (first) {
      cy.get(selector)
        .first()
        .invoke("text")
        .then((text) => {
          cy.log(attribute + " : ", text);
        });
    } else {
      cy.get(selector)
        .last()
        .invoke("text")
        .then((text) => {
          cy.log(attribute + " : ", text);
        });
    }
  }
}
