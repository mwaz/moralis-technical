import { Page } from "@playwright/test";

// *** LOCATORS ***

export const showAPIKeyButton = (page: Page) =>
  page.getByTestId("mui-showhide").getByTestId("mui-button");
export const copyAPIKeyButton = (page: Page) =>
  page.getByTestId("mui-copy").getByTestId("mui-button");

// *** HELPERS ***

/**
 * Shows API Key on the dashboard and copies it to the clipboard
 * @param page 
 * @returns the copied API Key
 */
export default async function showAndCopyAPI(page: Page): Promise<string> {
  await showAPIKeyButton(page).click();
  await copyAPIKeyButton(page).click();
  const handle = await page.evaluateHandle(() =>
    navigator.clipboard.readText()
  );
  const clipboardContent = await handle.jsonValue();
  return clipboardContent.toString();
}

// *** ASSERTIONS ***
