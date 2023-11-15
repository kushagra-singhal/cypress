import { BaseHands, BaseEyes, BaseDependencies } from "../BaseRobot";

export class AddressDependencies extends BaseDependencies {}

export class AddressEyes extends BaseEyes {
  getInitialAddressCount() {
    return cy.get(".normal-desktop-address-tile").its("length");
  }
  checkAddressesCount(previousAddresses: number) {
    this.hasLengthForDomWithClass(
      "normal-desktop-address-tile",
      previousAddresses + 1
    );
  }
}

export class AddressHands extends BaseHands {
  addNewAddress(
    name: string,
    phoneNumber: string,
    postalCode: string,
    line1: string,
    line2: string
  ) {
    this.clickOnId("ya-myab-address-add-link");
    this.typeTextonId(
      "address-ui-widgets-enterAddressFullName",
      name
    );
    this.typeTextonId(
      "address-ui-widgets-enterAddressPhoneNumber",
      phoneNumber
    );
    this.typeTextonId(
      "address-ui-widgets-enterAddressPostalCode",
      postalCode
    );
    this.typeTextonId("address-ui-widgets-enterAddressLine1", line1);
    this.typeTextonId("address-ui-widgets-enterAddressLine2", line2);
    this.clickOnId("address-ui-widgets-form-submit-button");
  }
}
