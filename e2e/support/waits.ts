import { by, element, waitFor } from "detox";

export async function expectVisibleById(id: string, timeoutMs: number = 5000): Promise<void> {
  await waitFor(element(by.id(id))).toBeVisible().withTimeout(timeoutMs);
}

export async function expectTextById(id: string, text: string, timeoutMs: number = 5000): Promise<void> {
  await waitFor(element(by.id(id))).toHaveText(text).withTimeout(timeoutMs);
}
