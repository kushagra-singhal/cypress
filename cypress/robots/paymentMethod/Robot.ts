import { BaseHands, BaseEyes, BaseDependencies } from "../BaseRobot";

export class PaymentMethodDependencies extends BaseDependencies {}

export class PaymentMethodEyes extends BaseEyes {
  getInitialAddressCount() {
    return cy.get(".a-box-group").its("length");
  }
  checkAddressesCount(previousAddresses: number) {
    this.hasLengthForDomWithClass(
      "a-box-group",
      previousAddresses + 1
    );
  }
}

export class PaymentMethodHands extends BaseHands {
  gotoUpdatePreference() {
    this.clickOnDomElement(".a-alert-container a");
  }
  addNewPaymentMethod() {
    cy.readFile("cypress/test-data/data.json").then((credentials) => {
      this.clickOnDomElement("input.apx-wrap-text");
      this.typeTextonId("fullName input", credentials.name);
      this.typeTextonId("phoneNumber input", credentials.phoneNumber);
      this.typeTextonId("postalCode input", credentials.postalCode);
      this.typeTextonId("line1 input", credentials.line1);
      this.typeTextonId("line2 input", credentials.line2);
      this.typeTextonId("city input", credentials.city);
      this.typeTextonId(
        "stateOrRegion input",
        credentials.stateOrRegion
      );

      this.clickOnId("apx-save-address-button-id");

      this.clickOnId("Continue");
      cy.get("span[id*='announce']").click({ force: true });
      cy.reload();
      this.wait(1000);
    });
  }
}
