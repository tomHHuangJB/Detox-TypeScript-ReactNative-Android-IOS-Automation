export const TEST_IDS = {
  login: {
    screen: "login.screen",
    title: "login.title",
    emailInput: "login.email.input",
    passwordInput: "login.password.input",
    submitButton: "login.submit.button",
    errorBanner: "login.error.banner"
  },
  dashboard: {
    screen: "dashboard.screen",
    header: "dashboard.header",
    syncBanner: "dashboard.sync.banner",
    labButton: "dashboard.lab.button",
    deviceRow: (deviceId: string) => `dashboard.device.${deviceId}.row`,
    deviceName: (deviceId: string) => `dashboard.device.${deviceId}.name`,
    deviceState: (deviceId: string) => `dashboard.device.${deviceId}.state`
  },
  device: {
    screen: "device.screen",
    header: "device.header",
    statusValue: "device.status.value",
    notificationToggle: "device.notification.toggle",
    startButton: "device.start.button",
    toastMessage: "device.toast.message",
    backButton: "device.back.button"
  },
  lab: {
    screen: "lab.screen",
    header: "lab.header",
    searchInput: "lab.search.input",
    scrollArea: "lab.scroll.area",
    resultRow: (itemId: string) => `lab.result.${itemId}.row`,
    resultName: (itemId: string) => `lab.result.${itemId}.name`,
    diagnosticsActivator: "lab.diagnostics.activator",
    diagnosticsPanel: "lab.diagnostics.panel",
    multiTapTarget: "lab.multitap.target",
    multiTapValue: "lab.multitap.value",
    carousel: "lab.carousel",
    carouselCard: (index: number) => `lab.carousel.card.${index}`,
    backButton: "lab.back.button"
  }
} as const;
