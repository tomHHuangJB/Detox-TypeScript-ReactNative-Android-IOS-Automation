import { by, element, expect } from "detox";
import { TEST_IDS } from "../../src/testIDs";
import { expectTextById, expectVisibleById } from "../support/waits";

export class DeviceScreen {
  async waitUntilLoaded(): Promise<void> {
    await expectVisibleById(TEST_IDS.device.screen);
  }

  async expectHeader(text: string): Promise<void> {
    await expectTextById(TEST_IDS.device.header, text);
  }

  async startDevice(): Promise<void> {
    await element(by.id(TEST_IDS.device.startButton)).tap();
  }

  async expectStatus(text: string): Promise<void> {
    await expectTextById(TEST_IDS.device.statusValue, text, 8000);
  }

  async expectToast(text: string): Promise<void> {
    await expectTextById(TEST_IDS.device.toastMessage, text, 8000);
  }

  async setNotifications(value: boolean): Promise<void> {
    const target = element(by.id(TEST_IDS.device.notificationToggle));
    await expect(target).toHaveToggleValue(!value);
    await target.tap();
    await expect(target).toHaveToggleValue(value);
  }

  async goBack(): Promise<void> {
    await element(by.id(TEST_IDS.device.backButton)).tap();
  }
}
