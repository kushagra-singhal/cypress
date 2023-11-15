import { CartEyes } from "../../robots/cart/Robot";
import {
  HomeDependencies,
  HomeEyes,
  HomeHands,
} from "../../robots/home/Robot";
import { ListingHands } from "../../robots/listing/Robot";
import {
  ProductEyes,
  ProductHands,
} from "../../robots/product/Robot";

describe("without login tests", { testIsolation: false }, () => {
  const homeEyes = new HomeEyes();
  const homeHands = new HomeHands();
  const homeDependencies = new HomeDependencies();
  const productHands = new ProductHands();
  const productEyes = new ProductEyes();
  const listingHands = new ListingHands();
  const cartEyes = new CartEyes();

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
