import { AuthFlow } from "../flows/authFlow";
import { DashboardScreen } from "../pageObjects/dashboardScreen";
import { DeviceScreen } from "../pageObjects/deviceScreen";
import { launchWithScenario } from "../support/appLauncher";

describe("Resilience scenarios", () => {
  const authFlow = new AuthFlow();
  const dashboard = new DashboardScreen();
  const device = new DeviceScreen();

  it("handles delayed sync without arbitrary sleeps", async () => {
    await launchWithScenario("slowSync");
    await authFlow.signInSuccessfully("qa@example.com", "Password123!");
    await dashboard.expectSyncBanner("Sync delayed, retrying...");
  });

  it("surfaces command failure deterministically", async () => {
    await launchWithScenario("commandFailure");
    await authFlow.signInSuccessfully("qa@example.com", "Password123!");
    await dashboard.openDevice("vacuum-01");
    await device.waitUntilLoaded();
    await device.startDevice();
    await device.expectToast("Command failed due to cloud timeout");
    await device.expectStatus("Ready");
  });
});
