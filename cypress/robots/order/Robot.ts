import { BaseHands, BaseEyes, BaseDependencies } from "../BaseRobot";

export class OrderDependencies extends BaseDependencies {}

export class OrderEyes extends BaseEyes {
  checkDropdownValue() {
    cy.get(".a-dropdown-prompt").should("contain.text", "2023");
  }
}

export class OrderHands extends BaseHands {
  listPastYearOrders() {
    this.clickOnDomElement(".a-dropdown-container");
    this.clickOnChildDom("a-popover-1", ".a-popover-inner li", 2);
  }
}
