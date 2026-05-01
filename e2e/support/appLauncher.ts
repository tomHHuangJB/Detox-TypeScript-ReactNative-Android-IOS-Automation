import { device } from "detox";
import { AppScenario } from "../../src/types";

export async function launchWithScenario(scenario: AppScenario): Promise<void> {
  await device.launchApp({
    newInstance: true,
    delete: true,
    launchArgs: {
      scenario
    }
  });
}
