import { Page, expect } from "@playwright/test";

// *** LOCATORS ***

export const emailInput = (page: Page) => page.getByTitle("Email");
export const passwordInput = (page: Page) => page.getByTitle("Password");
export const loginModalText = (page: Page) =>
  page.getByTestId("test-typography");
export const loginButton = (page: Page) => page.getByTestId("test-button");
export const dashboardUsageCard = (page: Page) =>
  page.getByText("Current Usage");

// *** HELPERS ***

/**
 * Logs in a user using email/password
 * Known issues: Captcha keeps popping up, therefore,
 * only UI test execution works, by stepping over and slowing down execution
 * @param page
 * @param param1
 */
export async function loginUser(
  page: Page,
  { username, password }: { username: string; password: string }
): Promise<void> {
  await page.goto("/login");
  await emailInput(page).click();
  await emailInput(page).pressSequentially(username, { delay: 100 });
  await passwordInput(page).click();
  await passwordInput(page).pressSequentially(password, { delay: 100 });
  await page.waitForTimeout(5000); // Bypassing Google re-captcha when running in headless mode .Not a solid way to do it!
  await expect(loginButton(page)).toBeVisible();
  await loginButton(page).click();
}

// *** ASSERTIONS ***

export async function assertDashboardVisibility(page: Page): Promise<void> {
  await expect(dashboardUsageCard(page)).toBeVisible({ timeout: 10000 });
}
