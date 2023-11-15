import { BaseHands, BaseEyes, BaseDependencies } from "../BaseRobot";

export class AccountDependencies extends BaseDependencies {}

export class AccountEyes extends BaseEyes {}

export class AccountHands extends BaseHands {
  goToSection(sectionId: number) {
    cy.get("a h2").eq(sectionId).click();
  }
}
