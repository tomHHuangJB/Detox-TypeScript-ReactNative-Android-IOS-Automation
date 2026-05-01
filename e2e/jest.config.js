module.exports = {
  rootDir: "..",
  testMatch: ["<rootDir>/e2e/specs/**/*.e2e.ts"],
  testTimeout: 120000,
  maxWorkers: 1,
  setupFilesAfterEnv: ["<rootDir>/e2e/setup.ts"],
  reporters: ["detox/runners/jest/reporter"],
  testEnvironment: "detox/runners/jest/testEnvironment"
};
