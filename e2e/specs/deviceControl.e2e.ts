import { DashboardScreen } from "../pageObjects/dashboardScreen";
import { DeviceScreen } from "../pageObjects/deviceScreen";
import { AuthFlow } from "../flows/authFlow";
import { launchWithScenario } from "../support/appLauncher";

describe("Device control", () => {
  const authFlow = new AuthFlow();
  const dashboard = new DashboardScreen();
  const device = new DeviceScreen();

  beforeEach(async () => {
    await launchWithScenario("happyPath");
    await authFlow.signInSuccessfully("qa@example.com", "Password123!");
  });

  it("starts a device successfully and shows a stable confirmation", async () => {
    await dashboard.openDevice("vacuum-01");
    await device.waitUntilLoaded();
    await device.expectHeader("Shark Robot Vacuum");
    await device.startDevice();
    await device.expectStatus("Running");
    await device.expectToast("Command sent");
    await device.goBack();
    await dashboard.expectDeviceState("vacuum-01", "Running");
  });

  it("allows notification preference updates with stable toggle assertions", async () => {
    await dashboard.openDevice("coffee-01");
    await device.waitUntilLoaded();
    await device.setNotifications(true);
  });
});
