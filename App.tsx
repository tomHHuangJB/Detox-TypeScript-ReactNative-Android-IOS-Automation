import React, { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LaunchArguments } from "react-native-launch-arguments";
import { TEST_IDS } from "./src/testIDs";
import {
  AppScenario,
  DeviceCommandResult,
  DeviceItem,
  LaunchArgs,
  UserSession,
} from "./src/types";
import { createScenarioModel } from "./src/mock/scenarioModel";

type Screen = "login" | "dashboard" | "deviceDetail" | "lab";

const LAB_ITEMS = [
  { id: "robot-vacuum", name: "Shark Robot Vacuum" },
  { id: "coffee-maker", name: "Ninja Coffee Maker" },
  { id: "blender", name: "Ninja Blender" },
  { id: "air-fryer", name: "Ninja Air Fryer" },
  { id: "smoke-grill", name: "Ninja Woodfire Grill" },
  { id: "steam-mop", name: "Shark Steam Mop" },
  { id: "hair-dryer", name: "Shark FlexStyle" },
  { id: "espresso", name: "Ninja Luxe Cafe" },
  { id: "detect-pro", name: "Shark Detect Pro" },
  { id: "blast-chiller", name: "Ninja FrostVault" }
];

export default function App(): React.JSX.Element {
  const launchArgs = LaunchArguments.value<Partial<LaunchArgs>>();
  const scenario = (launchArgs.scenario ?? "happyPath") as AppScenario;
  const model = useMemo(() => createScenarioModel(scenario), [scenario]);

  const [screen, setScreen] = useState<Screen>("login");
  const [email, setEmail] = useState("qa@example.com");
  const [password, setPassword] = useState("Password123!");
  const [errorMessage, setErrorMessage] = useState("");
  const [syncBanner] = useState(model.syncBanner);
  const [session, setSession] = useState<UserSession | null>(null);
  const [devices, setDevices] = useState<DeviceItem[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<DeviceItem | null>(null);
  const [toast, setToast] = useState("");
  const [labSearch, setLabSearch] = useState("");
  const [diagnosticsVisible, setDiagnosticsVisible] = useState(false);
  const [multiTapCount, setMultiTapCount] = useState(0);

  const login = async () => {
    setErrorMessage("");
    const result = await model.login(email, password);
    if (!result.ok) {
      setErrorMessage(result.message);
      return;
    }

    setSession(result.session);
    setDevices(result.devices);
    setScreen("dashboard");
  };

  const openDevice = (device: DeviceItem) => {
    setSelectedDevice(device);
    setScreen("deviceDetail");
  };

  const sendCommand = async (): Promise<void> => {
    if (!selectedDevice) {
      return;
    }

    const result: DeviceCommandResult = await model.startDevice(selectedDevice.id);
    if (!result.ok) {
      setToast(result.message);
      return;
    }

    setToast("Command sent");
    setSelectedDevice(result.device);
    setDevices((prev) =>
      prev.map((device) => (device.id === result.device.id ? result.device : device))
    );
  };

  const setNotificationsEnabled = (value: boolean) => {
    if (!selectedDevice) {
      return;
    }

    const updatedDevice = { ...selectedDevice, notificationsEnabled: value };
    setSelectedDevice(updatedDevice);
    setDevices((prev) =>
      prev.map((device) => (device.id === updatedDevice.id ? updatedDevice : device))
    );
  };

  const filteredLabItems = LAB_ITEMS.filter((item) =>
    item.name.toLowerCase().includes(labSearch.trim().toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      {screen === "login" && (
        <View style={styles.screen} testID={TEST_IDS.login.screen}>
          <Text style={styles.title} testID={TEST_IDS.login.title}>
            SharkNinja Device Cloud
          </Text>
          <TextInput
            testID={TEST_IDS.login.emailInput}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
            placeholder="Email"
          />
          <TextInput
            testID={TEST_IDS.login.passwordInput}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            placeholder="Password"
          />
          {errorMessage ? (
            <Text style={styles.error} testID={TEST_IDS.login.errorBanner}>
              {errorMessage}
            </Text>
          ) : null}
          <Pressable testID={TEST_IDS.login.submitButton} style={styles.button} onPress={login}>
            <Text style={styles.buttonText}>Sign In</Text>
          </Pressable>
        </View>
      )}

      {screen === "dashboard" && session && (
        <ScrollView style={styles.screen} testID={TEST_IDS.dashboard.screen}>
          <Text style={styles.title} testID={TEST_IDS.dashboard.header}>
            Welcome, {session.firstName}
          </Text>
          {syncBanner ? (
            <Text testID={TEST_IDS.dashboard.syncBanner} style={styles.banner}>
              {syncBanner}
            </Text>
          ) : null}
          <Pressable
            testID={TEST_IDS.dashboard.labButton}
            accessibilityLabel="Open interaction lab"
            style={styles.secondaryButton}
            onPress={() => setScreen("lab")}
          >
            <Text style={styles.secondaryButtonText}>Open Interaction Lab</Text>
          </Pressable>
          {devices.map((device) => (
            <Pressable
              key={device.id}
              testID={TEST_IDS.dashboard.deviceRow(device.id)}
              style={styles.deviceRow}
              onPress={() => openDevice(device)}
            >
              <Text testID={TEST_IDS.dashboard.deviceName(device.id)} style={styles.deviceName}>
                {device.name}
              </Text>
              <Text testID={TEST_IDS.dashboard.deviceState(device.id)}>{device.state}</Text>
            </Pressable>
          ))}
        </ScrollView>
      )}

      {screen === "deviceDetail" && selectedDevice && (
        <View style={styles.screen} testID={TEST_IDS.device.screen}>
          <Text style={styles.title} testID={TEST_IDS.device.header}>
            {selectedDevice.name}
          </Text>
          <Text testID={TEST_IDS.device.statusValue}>{selectedDevice.state}</Text>
          <View style={styles.toggleRow}>
            <Text>Notifications</Text>
            <Switch
              testID={TEST_IDS.device.notificationToggle}
              value={selectedDevice.notificationsEnabled}
              onValueChange={setNotificationsEnabled}
            />
          </View>
          <Pressable testID={TEST_IDS.device.startButton} style={styles.button} onPress={sendCommand}>
            <Text style={styles.buttonText}>Start Device</Text>
          </Pressable>
          {toast ? (
            <Text testID={TEST_IDS.device.toastMessage} style={styles.banner}>
              {toast}
            </Text>
          ) : null}
          <Pressable testID={TEST_IDS.device.backButton} onPress={() => setScreen("dashboard")}>
            <Text style={styles.link}>Back</Text>
          </Pressable>
        </View>
      )}

      {screen === "lab" && (
        <View style={styles.screen} testID={TEST_IDS.lab.screen}>
          <Text style={styles.title} testID={TEST_IDS.lab.header}>
            Detox Interaction Lab
          </Text>
          <TextInput
            testID={TEST_IDS.lab.searchInput}
            accessibilityLabel="Search products"
            value={labSearch}
            onChangeText={setLabSearch}
            onSubmitEditing={() => setLabSearch((value) => value.trim())}
            style={styles.input}
            placeholder="Search showcase products"
            returnKeyType="search"
          />
          <Pressable
            testID={TEST_IDS.lab.diagnosticsActivator}
            accessibilityLabel="Show diagnostics"
            style={styles.secondaryButton}
            onPress={() => setDiagnosticsVisible(true)}
            onLongPress={() => setDiagnosticsVisible(true)}
          >
            <Text style={styles.secondaryButtonText}>Long Press For Diagnostics</Text>
          </Pressable>
          {diagnosticsVisible ? (
            <Text testID={TEST_IDS.lab.diagnosticsPanel} style={styles.banner}>
              Diagnostics enabled for deterministic mock validation
            </Text>
          ) : null}
          <Pressable
            testID={TEST_IDS.lab.multiTapTarget}
            accessibilityLabel="Multi tap target"
            style={styles.deviceRow}
            onPress={() => setMultiTapCount((value) => value + 1)}
          >
            <Text>Tap counter</Text>
            <Text testID={TEST_IDS.lab.multiTapValue}>{multiTapCount}</Text>
          </Pressable>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            testID={TEST_IDS.lab.carousel}
            style={styles.carousel}
          >
            {[1, 2, 3].map((card) => (
              <View
                key={card}
                testID={TEST_IDS.lab.carouselCard(card)}
                style={styles.carouselCard}
              >
                <Text style={styles.deviceName}>Card {card}</Text>
              </View>
            ))}
          </ScrollView>
          <ScrollView testID={TEST_IDS.lab.scrollArea} style={styles.labResults}>
            {filteredLabItems.map((item) => (
              <View key={item.id} testID={TEST_IDS.lab.resultRow(item.id)} style={styles.deviceRow}>
                <Text testID={TEST_IDS.lab.resultName(item.id)}>{item.name}</Text>
              </View>
            ))}
          </ScrollView>
          <Pressable testID={TEST_IDS.lab.backButton} onPress={() => setScreen("dashboard")}>
            <Text style={styles.link}>Back</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f4ee"
  },
  screen: {
    flex: 1,
    padding: 24
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    color: "#1e2b20"
  },
  input: {
    borderWidth: 1,
    borderColor: "#b7c5b5",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    backgroundColor: "#ffffff"
  },
  button: {
    marginTop: 8,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#104f3f"
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "600"
  },
  secondaryButton: {
    marginBottom: 16,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#dce7db"
  },
  secondaryButtonText: {
    color: "#1e2b20",
    fontWeight: "600"
  },
  error: {
    color: "#8a1c1c",
    marginBottom: 8
  },
  banner: {
    backgroundColor: "#e4efe8",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16
  },
  deviceRow: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#d6ded4"
  },
  deviceName: {
    fontSize: 18,
    fontWeight: "600"
  },
  toggleRow: {
    marginTop: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  link: {
    marginTop: 16,
    color: "#104f3f",
    fontWeight: "600"
  },
  carousel: {
    marginBottom: 16
  },
  carouselCard: {
    width: 180,
    padding: 16,
    marginRight: 12,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d6ded4"
  },
  labResults: {
    maxHeight: 220
  }
});
