import { BaseHands, BaseEyes, BaseDependencies } from "../BaseRobot";

export class SignupDependencies extends BaseDependencies {}

export class SignupEyes extends BaseEyes {}

export class SignupHands extends BaseHands {
  signin() {
    this.typeTextonId("ap_email", Cypress.env("PHONE_NUMBER"));
    this.clickOnId("continue");
    this.typeTextonId("ap_password", Cypress.env("PASSWORD"));
    this.clickOnId("signInSubmit");
  }
}
