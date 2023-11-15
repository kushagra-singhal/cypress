import { AccountHands } from "../../robots/account/Robot";
import {
  AddressEyes,
  AddressHands,
} from "../../robots/address/Robot";
import { HomeDependencies, HomeHands } from "../../robots/home/Robot";
import { ListingHands } from "../../robots/listing/Robot";
import { OrderEyes, OrderHands } from "../../robots/order/Robot";
import {
  PaymentMethodEyes,
  PaymentMethodHands,
} from "../../robots/paymentMethod/Robot";
import { SignupHands } from "../../robots/signup/Robot";

describe("with login tests", { testIsolation: false }, () => {
  const homeHands = new HomeHands();
  const homeDependencies = new HomeDependencies();
  const listingHands = new ListingHands();
  const accountHands = new AccountHands();
  const paymentMethodEyes = new PaymentMethodEyes();
  const paymentMethodHands = new PaymentMethodHands();
  const addressEyes = new AddressEyes();
  const addressHands = new AddressHands();
  const orderEyes = new OrderEyes();
  const orderHands = new OrderHands();
  const signupHands = new SignupHands();

  before(() => {
    homeDependencies.init();

    homeHands.goToAccount();
    signupHands.signin();
  });
  after(() => {
    homeDependencies.clearAfterAll();
  });
  it("Select the amazon prime delivery checkbox and get the first displayed item delivery date and Check for delivery status", () => {
    homeHands.enterSearchKey("mobiles");
    listingHands.selectPrimeAndPrintFirstProductDetails();
  });
  it("Goto your orders and select Past one year order", () => {
    homeHands.goToOrders();
    orderHands.listPastYearOrders();
    orderEyes.checkDropdownValue();
  });

  it("Add a new delivery  address and verify the address is added", () => {
    homeHands.goToAccount();
    accountHands.goToSection(3);
    addressEyes.getInitialAddressCount().then((count) => {
      cy.readFile("cypress/test-data/data.json").then(
        (credentials) => {
          addressHands.addNewAddress(
            credentials.name,
            credentials.phoneNumber,
            credentials.postalCode,
            credentials.line1,
            credentials.line2
          );
        }
      );
      homeHands.goToAccount();
      accountHands.goToSection(3);

      addressEyes.checkAddressesCount(count);
    });
  });

  it("Add a new payment option and verify payment option is added", () => {
    homeHands.goToAccount();
    accountHands.goToSection(4);
    paymentMethodHands.gotoUpdatePreference();
    paymentMethodEyes.getInitialAddressCount().then((count) => {
      paymentMethodHands.addNewPaymentMethod();
      paymentMethodEyes.checkAddressesCount(count);
    });
  });
});
