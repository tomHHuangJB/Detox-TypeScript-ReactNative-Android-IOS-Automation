import { by, element, waitFor } from "detox";
import { TEST_IDS } from "../../src/testIDs";
import { expectVisibleById } from "../support/waits";

export class LoginScreen {
  async waitUntilLoaded(): Promise<void> {
    // The login screen is the deterministic default landing page; avoid a
    // focus-based startup wait here because this emulator can report the root
    // window as not focused even when the screen is already usable.
  }

  async signIn(email: string, password: string): Promise<void> {
    await expectVisibleById(TEST_IDS.login.emailInput, 20000);
    await expectVisibleById(TEST_IDS.login.passwordInput, 20000);
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
