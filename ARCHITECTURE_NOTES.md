# Detox Architecture Notes

This scaffold is intentionally designed to sound senior in an interview.

## Why This Test Design Is Better Than A Basic Demo

### 1. Testability Is Designed Into The App

- the app exposes stable `testID`s
- selectors are centralized
- test scenarios are deterministic
- app state can be controlled by launch args

This is more maintainable than ad hoc selectors and random shared environments.

### 2. Tests Are Layered

- page objects handle direct interactions
- flows compose business behavior
- specs stay readable and scenario-focused

This prevents every test file from re-implementing the same UI steps.

### 3. Flake Prevention Is Explicit

- no `sleep`
- `waitFor` around async state transitions
- deterministic mock responses
- fresh launches for test isolation
- assertions around final states, not intermediate timing

### 4. Scalability Concerns Are Addressed Early

- typed contracts for app state
- reusable helpers
- clean folder separation
- scenario control for future test expansion

### 5. Realistic Interview Narrative

You can describe this as:

"I prefer building Detox suites around deterministic state, strong selectors, and reusable abstractions. The highest-value work is not only writing a passing test, but creating a system where failures are diagnosable, scenarios are stable, and the suite can scale without turning into copy-paste UI scripts."

## Good Interview Contrast

Weak approach:

- match by visible text everywhere
- hard-coded delays
- shared login state across tests
- tests calling raw Detox APIs directly in every spec

Stronger approach:

- `testID` selectors
- launch helpers
- page objects and flows
- explicit state setup
- platform-ready config for iOS and Android
