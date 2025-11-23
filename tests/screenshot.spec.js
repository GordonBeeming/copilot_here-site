import { test, expect } from '@playwright/test';

test('screenshot', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Copilot Here/);
  await page.waitForTimeout(2000); // Wait for everything to settle
  await page.screenshot({ path: 'screenshot.png', fullPage: true });
});