import { AccountHands } from "../robots/account/Robot";
import { AddressEyes, AddressHands } from "../robots/address/Robot";
import { CartEyes } from "../robots/cart/Robot";
import {
  HomeDependencies,
  HomeEyes,
  HomeHands,
} from "../robots/home/Robot";
import { ListingHands } from "../robots/listing/Robot";
import { OrderEyes, OrderHands } from "../robots/order/Robot";
import {
  PaymentMethodEyes,
  PaymentMethodHands,
} from "../robots/paymentMethod/Robot";
import { ProductHands, ProductEyes } from "../robots/product/Robot";
import { SignupHands } from "../robots/signup/Robot";

describe("All amazon tests", { testIsolation: false }, () => {
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
  const homeEyes = new HomeEyes();
  const productHands = new ProductHands();
  const productEyes = new ProductEyes();
  const cartEyes = new CartEyes();

  context("login is not required", () => {
    before(() => {
      homeDependencies.init();
    });
    after(() => {
      homeDependencies.clearAfterAll();
    });
    it("should navigate from left nav to Mobiles and select Mobiles phones and get back to the main menu", () => {
      homeEyes.getInitialUrl().then((preUrl) => {
        homeHands.navigateToMobilesAndBack();
        homeEyes.checkCurrentUrl(preUrl);
      });
    });

    it("should add to cart Today's deals product", () => {
      homeHands.goToTodaysDeals();
      listingHands.selectThirdProduct();
      productHands.addToCartAndGoToCart();
      cartEyes.checkQuantity();
    });

    it("should search for mobiles and display the last item details", () => {
      homeHands.enterSearchKey("mobiles");
      listingHands.printLastMobileNameAndPrice();
      listingHands.getLastMobileName().then((name) => {
        listingHands.clickLastMobile();
        productEyes.checkProductName(name);
      });
    });
  });
  context("login is required", () => {
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
});
