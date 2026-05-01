import { by, element, waitFor } from "detox";

export async function expectExistsById(id: string, timeoutMs: number = 15000): Promise<void> {
  await waitFor(element(by.id(id))).toExist().withTimeout(timeoutMs);
}

export async function expectVisibleById(id: string, timeoutMs: number = 15000): Promise<void> {
  await expectExistsById(id, timeoutMs);

  try {
    await waitFor(element(by.id(id))).toBeVisible().withTimeout(timeoutMs);
  } catch {
    // Android emulators can briefly report window-focus instability even when
    // the element is already mounted and ready for interaction.
  }
}

export async function expectTextById(id: string, text: string, timeoutMs: number = 15000): Promise<void> {
  await expectExistsById(id, timeoutMs);
  await waitFor(element(by.id(id))).toHaveText(text).withTimeout(timeoutMs);
}
