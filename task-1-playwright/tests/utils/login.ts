import { Page, expect } from "@playwright/test";

// *** LOCATORS ***

export const emailInput = (page: Page) => page.getByTitle("Email");
export const passwordInput = (page: Page) => page.getByTitle("Password");
export const loginModalText = (page: Page) =>
  page.getByTestId("test-typography");
export const loginButton = (page: Page) => page.getByTestId("test-button");
export const dashboardUsageCard = (page: Page) => page.getByTestId("mui-card");

// *** HELPERS ***

export async function loginUser(
  page: Page,
  { username, password }: { username: string; password: string }
): Promise<void> {
  await page.goto("/login");
  await emailInput(page).fill(username);
  await passwordInput(page).fill(password);
  await expect(loginButton(page)).toBeVisible();
  await loginButton(page).click();
}

// *** ASSERTIONS ***

export async function assertDashboarVisibility(page: Page): Promise<void> {
    await expect(dashboardUsageCard(page)).toBeVisible();
}
