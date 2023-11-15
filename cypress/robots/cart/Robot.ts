import { BaseHands, BaseEyes, BaseDependencies } from "../BaseRobot";

export class CartDependencies extends BaseDependencies {}

export class CartEyes extends BaseEyes {
  checkQuantity() {
    cy.get("#a-autoid-0-announce .a-dropdown-prompt")
      .invoke("text")
      .then((newQty) => {
        expect("1").to.be.equal(newQty);
      });
  }
}

export class CartHands extends BaseHands {}
