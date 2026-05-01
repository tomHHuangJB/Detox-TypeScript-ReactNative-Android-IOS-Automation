# Detox Coverage Matrix

This project is designed to exercise a broad and interview-useful slice of the official Detox feature set.

It does not literally implement every platform-specific API in the docs, but it covers the most relevant cross-platform capabilities first and leaves clear extension points for iOS-only and Android-only actions.

## Core Capabilities Covered

### Matchers

- `by.id()`
  Used throughout the suite as the primary stable selector strategy.
- `by.text()`
  Used in `interactionLab.e2e.ts` for visible card verification.
- `by.label()`
  Used for `Search products` and `Open interaction lab`.
- `withAncestor()`
  Used to scope visible text assertions inside the carousel.

### Actions

- `.tap()`
  Used across login, dashboard, lab, and device flows.
- `.multiTap()`
  Used in the interaction lab counter.
- `.longPress()`
  Used to reveal diagnostics.
- `.swipe()`
  Used on the horizontal carousel.
- `.scroll()`
  Used via `whileElement()` on the lab results list.
- `.typeText()`
  Pattern supported by the app; `replaceText()` is used by default for stability.
- `.replaceText()`
  Used for deterministic input updates.
- `.clearText()`
  Used before search input updates.
- `.tapReturnKey()`
  Used to complete the search interaction.
- `.getAttributes()`
  Used to inspect diagnostics panel content.
- `.takeScreenshot()`
  Used for artifact capture in the lab flow.

### Expectations

- `.toBeVisible()`
- `.toHaveText()`
- `.toHaveToggleValue()`
- `.not`
  Pattern already usable for negative visibility and existence checks.

### Wait APIs

- `waitFor(...).toBeVisible().withTimeout(...)`
- `waitFor(...).toHaveText().withTimeout(...)`
- `waitFor(...).whileElement(...).scroll(...)`

### Device APIs

- `device.launchApp()`
- `launchArgs`
- `newInstance`
- `delete`
- permissions on app launch

## Senior Design Decisions Behind The Coverage

- Prefer `replaceText()` over typing character-by-character when business intent is field replacement, because it is faster and often less fragile.
- Use `by.id()` as the default strategy and reserve `by.text()` or `by.label()` for intentional secondary checks.
- Push deterministic scenario setup into launch arguments rather than relying on unstable shared environments.
- Keep test code layered so adding coverage for more Detox features does not collapse into unreadable specs.

## High-Value Extensions For Fuller Detox Practice

These are worth adding after the app is bootstrapped into a real React Native project with native setup:

- `scrollTo()` and `scrollToIndex()` for larger Android lists
- `longPressAndDrag()` for drag-and-drop reorder interactions
- `adjustSliderToPosition()` with a real slider component
- `setDatePickerDate()` with a real date picker
- `performAccessibilityAction()` with custom accessibility actions
- device orientation and deep-link launch scenarios
- push notification and permission-specific launch coverage

## Why Not Claim Literal “All Detox APIs”

Detox docs include platform-specific and component-specific APIs that require native widgets or device conditions not present in a lightweight scaffold. In an interview, the stronger position is:

"I designed the app and test framework to cover the major cross-platform Detox capabilities first, and I left clear extension points for iOS-specific and Android-specific APIs where the product actually needs them."
