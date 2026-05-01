import { DeviceCommandResult, DeviceItem, LoginResult, UserSession, AppScenario } from "../types";

const DEFAULT_USER: UserSession = {
  userId: "u-100",
  firstName: "Tom"
};

const DEFAULT_DEVICES: DeviceItem[] = [
  {
    id: "vacuum-01",
    name: "Shark Robot Vacuum",
    state: "Ready",
    notificationsEnabled: true
  },
  {
    id: "coffee-01",
    name: "Ninja Coffee Maker",
    state: "Offline",
    notificationsEnabled: false
  }
];

type ScenarioModel = {
  syncBanner: string;
  login: (email: string, password: string) => Promise<LoginResult>;
  startDevice: (deviceId: string) => Promise<DeviceCommandResult>;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function createScenarioModel(scenario: AppScenario): ScenarioModel {
  return {
    syncBanner: scenario === "slowSync" ? "Sync delayed, retrying..." : "",
    login: async (_email: string, _password: string): Promise<LoginResult> => {
      await delay(scenario === "slowSync" ? 1200 : 150);

      if (scenario === "offlineOnLogin") {
        return {
          ok: false,
          message: "Unable to reach cloud services"
        };
      }

      return {
        ok: true,
        session: DEFAULT_USER,
        devices: DEFAULT_DEVICES
      };
    },
    startDevice: async (deviceId: string): Promise<DeviceCommandResult> => {
      await delay(scenario === "slowSync" ? 1000 : 150);

      if (scenario === "commandFailure") {
        return {
          ok: false,
          message: "Command failed due to cloud timeout"
        };
      }

      const device = DEFAULT_DEVICES.find((item) => item.id === deviceId);
      if (!device) {
        return {
          ok: false,
          message: "Device not found"
        };
      }

      return {
        ok: true,
        device: {
          ...device,
          state: "Running"
        }
      };
    }
  };
}
