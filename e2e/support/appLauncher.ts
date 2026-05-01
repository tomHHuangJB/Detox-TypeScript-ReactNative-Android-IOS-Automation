import { device } from "detox";
import { AppScenario } from "../../src/types";

export async function launchWithScenario(scenario: AppScenario): Promise<void> {
  await device.launchApp({
    newInstance: true,
    launchArgs: {
      scenario,
      detoxURLBlacklistRegex: ".*(10\\.0\\.2\\.2|localhost):8081.*"
    }
  });
}
