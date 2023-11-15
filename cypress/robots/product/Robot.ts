import { BaseHands, BaseEyes, BaseDependencies } from "../BaseRobot";

export class ProductDependencies extends BaseDependencies {}

export class ProductEyes extends BaseEyes {
  checkProductName(prevName: string) {
    cy.get("span#productTitle")
      .invoke("text")
      .then((newName) => {
        assert.equal(prevName, newName.trim());
      });
  }
}

export class ProductHands extends BaseHands {
  addToCartAndGoToCart() {
    cy.get("body").then((body) => {
      if (body.find("#add-to-cart-button").length > 0) {
        cy.get("#add-to-cart-button").last().click();
      }
      if (body.find("#dealsx_atc_btn a").length > 0) {
        this.clickOnDomElement("dealsx_atc_btn a");
      }
      if (body.find("#attach-popover-lgtbox").length > 0) {
        this.clickOnId("attach-popover-lgtbox");
      }
    });
    this.clickOnId("nav-cart");
  }
}
