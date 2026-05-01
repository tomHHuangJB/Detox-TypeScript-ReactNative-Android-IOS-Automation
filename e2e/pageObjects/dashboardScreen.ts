import { by, element, expect, waitFor } from "detox";
import { TEST_IDS } from "../../src/testIDs";
import { expectVisibleById } from "../support/waits";

export class DashboardScreen {
  async waitUntilLoaded(): Promise<void> {
    await expectVisibleById(TEST_IDS.dashboard.screen);
  }

  async expectWelcomeHeader(): Promise<void> {
    await expect(element(by.id(TEST_IDS.dashboard.header))).toBeVisible();
  }

  async expectSyncBanner(text: string): Promise<void> {
    await waitFor(element(by.id(TEST_IDS.dashboard.syncBanner)))
      .toHaveText(text)
      .withTimeout(8000);
  }

  async openInteractionLab(): Promise<void> {
    await element(by.id(TEST_IDS.dashboard.labButton)).tap();
  }

  async openDevice(deviceId: string): Promise<void> {
    await waitFor(element(by.id(TEST_IDS.dashboard.deviceRow(deviceId))))
      .toBeVisible()
      .withTimeout(5000);
    await element(by.id(TEST_IDS.dashboard.deviceRow(deviceId))).tap();
  }

  async expectDeviceState(deviceId: string, expectedState: string): Promise<void> {
    await expect(element(by.id(TEST_IDS.dashboard.deviceState(deviceId)))).toHaveText(expectedState);
  }
}
