import { test, expect } from "@playwright/test";

test.describe("Checkboxes", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/checkboxes");
  });

  test("Default State @smoke", async ({ page }) => {
    const boxes = page.locator('input[type="checkbox"]');
    await expect(boxes).toHaveCount(2); //asserting that there are two checkboxes
    await expect(boxes.nth(0)).not.toBeChecked();
    await expect(boxes.nth(1)).toBeChecked();
  });

  test("First checkbox toggles independetly @regression", async ({ page }) => {
    const first = page.locator('input[type="checkbox"]').nth(0);
    await first.check();
    await expect(first).toBeChecked();
    await first.uncheck();
    await expect(first).not.toBeChecked();
  });

  test("Second checkbox toggles independetly @regression", async ({ page }) => {
    const second = page.locator('input[type="checkbox"]').nth(1);
    await second.uncheck();
    await expect(second).not.toBeChecked();
    await second.check();
    await expect(second).toBeChecked();
  });
});
