import { by, element, waitFor } from "detox";
import { TEST_IDS } from "../../src/testIDs";
import { expectVisibleById } from "../support/waits";

export class LoginScreen {
  async waitUntilLoaded(): Promise<void> {
    await expectVisibleById(TEST_IDS.login.screen);
  }

  async signIn(email: string, password: string): Promise<void> {
    await element(by.id(TEST_IDS.login.emailInput)).replaceText(email);
    await element(by.id(TEST_IDS.login.passwordInput)).replaceText(password);
    await element(by.id(TEST_IDS.login.submitButton)).tap();
  }

  async expectError(message: string): Promise<void> {
    await waitFor(element(by.id(TEST_IDS.login.errorBanner)))
      .toHaveText(message)
      .withTimeout(5000);
  }
}
