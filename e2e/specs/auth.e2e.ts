import { AuthFlow } from "../flows/authFlow";
import { LoginScreen } from "../pageObjects/loginScreen";
import { launchWithScenario } from "../support/appLauncher";

describe("Authentication", () => {
  const authFlow = new AuthFlow();
  const loginScreen = new LoginScreen();

  beforeEach(async () => {
    await launchWithScenario("happyPath");
  });

  it("logs in successfully with a deterministic happy path", async () => {
    await authFlow.signInSuccessfully("qa@example.com", "Password123!");
  });

  it("shows a clear cloud-service error for offline login", async () => {
    await launchWithScenario("offlineOnLogin");
    await loginScreen.waitUntilLoaded();
    await loginScreen.signIn("qa@example.com", "Password123!");
    await loginScreen.expectError("Unable to reach cloud services");
  });
});
