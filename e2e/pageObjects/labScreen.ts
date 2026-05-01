import { by, element, waitFor } from "detox";
import { TEST_IDS } from "../../src/testIDs";
import { expectTextById, expectVisibleById } from "../support/waits";

export class LabScreen {
  async waitUntilLoaded(): Promise<void> {
    await expectVisibleById(TEST_IDS.lab.screen);
  }

  async searchFor(term: string): Promise<void> {
    const input = element(by.id(TEST_IDS.lab.searchInput));
    await input.clearText();
    await input.replaceText(term);
    await input.tapReturnKey();
  }

  async revealDiagnostics(): Promise<void> {
    await element(by.id(TEST_IDS.lab.diagnosticsActivator)).longPress();
  }

  async expectDiagnosticsVisible(): Promise<void> {
    await expectVisibleById(TEST_IDS.lab.diagnosticsPanel, 5000);
  }

  async multiTap(times: number): Promise<void> {
    await element(by.id(TEST_IDS.lab.multiTapTarget)).multiTap(times);
  }

  async expectCounter(value: string): Promise<void> {
    await expectTextById(TEST_IDS.lab.multiTapValue, value);
  }

  async swipeCarouselLeft(): Promise<void> {
    await element(by.id(TEST_IDS.lab.carousel)).swipe("left", "fast");
  }

  async expectResultVisible(itemId: string): Promise<void> {
    await waitFor(element(by.id(TEST_IDS.lab.resultRow(itemId))))
      .toBeVisible()
      .whileElement(by.id(TEST_IDS.lab.scrollArea))
      .scroll(120, "down");
  }

  async goBack(): Promise<void> {
    await element(by.id(TEST_IDS.lab.backButton)).tap();
  }
}
