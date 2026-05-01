import { by, element, expect as detoxExpect } from "detox";
import { AuthFlow } from "../flows/authFlow";
import { DashboardScreen } from "../pageObjects/dashboardScreen";
import { LabScreen } from "../pageObjects/labScreen";
import { launchWithScenario } from "../support/appLauncher";

describe("Interaction lab", () => {
  const authFlow = new AuthFlow();
  const dashboard = new DashboardScreen();
  const lab = new LabScreen();

  beforeEach(async () => {
    await launchWithScenario("happyPath");
    await authFlow.signInSuccessfully("qa@example.com", "Password123!");
  });

  it("covers broader Detox interactions without sacrificing maintainability", async () => {
    await dashboard.openInteractionLab();
    await lab.waitUntilLoaded();

    await element(by.label("Search products")).tap();
    await lab.searchFor("Grill");
    await lab.expectResultVisible("smoke-grill");

    await lab.revealDiagnostics();
    await lab.expectDiagnosticsVisible();

    await lab.multiTap(3);
    await lab.expectCounter("3");

    await element(by.id("lab.carousel")).takeScreenshot("interaction-lab-carousel");
    await lab.swipeCarouselLeft();

    await detoxExpect(element(by.text("Card 2").withAncestor(by.id("lab.carousel")))).toBeVisible();

    const attributes = await element(by.id("lab.diagnosticsPanel")).getAttributes();
    if (!("text" in attributes) || typeof attributes.text !== "string") {
      throw new Error("Expected diagnostics panel text attributes");
    }
    expect(attributes.text).toContain("Diagnostics enabled");

    await lab.goBack();
    await dashboard.waitUntilLoaded();
  });
});
