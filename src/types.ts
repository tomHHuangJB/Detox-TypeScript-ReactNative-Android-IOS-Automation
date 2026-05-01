export type AppScenario =
  | "happyPath"
  | "offlineOnLogin"
  | "commandFailure"
  | "slowSync";

export type LaunchArgs = {
  scenario: AppScenario;
};

export type UserSession = {
  userId: string;
  firstName: string;
};

export type DeviceState = "Ready" | "Running" | "Offline";

export type DeviceItem = {
  id: string;
  name: string;
  state: DeviceState;
  notificationsEnabled: boolean;
};

export type LoginResult =
  | {
      ok: true;
      session: UserSession;
      devices: DeviceItem[];
    }
  | {
      ok: false;
      message: string;
    };

export type DeviceCommandResult =
  | {
      ok: true;
      device: DeviceItem;
    }
  | {
      ok: false;
      message: string;
    };
