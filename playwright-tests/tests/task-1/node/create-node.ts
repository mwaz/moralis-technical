import { Page, expect } from "@playwright/test";

// *** LOCATORS ***

export const nodesMenuItem = (page: Page) => page.getByTitle("Nodes");
export const createNodeButton = (page: Page) =>
  page.getByText("Create a New Node").first();
export const nodeButton = (page: Page) => page.getByText("Create Node").first();
export const createNodeModal = (page: Page) =>
  page.getByText("Start creating your node");
export const deleteNodeModal = (page: Page) =>
  page.getByText("Delete this Node?");
export const deleteButton = (page: Page) =>
  page.locator('[data-icon="trash"]').last();
export const deleteConfirmButton = (page: Page) =>
  page.getByRole("button", { name: "Delete" }).last();
export const closeModalButton = (page: Page) =>
  page.locator('[data-icon="xmark"]').last();
export const nodeKey = (page: Page) =>
  page.locator('[data-icon="key-skeleton"]').last();
export const supportButton = (page: Page) => page.getByText("Support").first();

// *** HELPERS ***

export async function openNodesTab(page): Promise<void> {
  await nodesMenuItem(page).click();
  await expect(createNodeButton(page)).toBeVisible();
}

/**
 *
 * @param page - browser tab
 * @param protocol - protocol that node will use
 * @param network - network that node will use
 * @returns key - API KEY of the node
 */
export async function selectOptionsAndCreateNode(
  page,
  { protocol, network }: { protocol: string; network: string }
): Promise<String> {
  await page
    .getByTestId("test-CardCountrySelect")
    .selectOption({ value: protocol });
  const optionToSelect = await page
    .locator("option", { hasText: network })
    .textContent();
  await page
    .locator('[name="select-network"]')
    .selectOption({ label: optionToSelect });
  await expect(nodeButton(page)).toBeVisible();
  const [response] = await Promise.all([
    page.waitForResponse(
      (resp) => resp.url().includes("/nodes") && resp.status() === 201
    ),
    nodeButton(page).click(),
  ]);
  const responseData = await response.json();
  return responseData.key;
}

/**
 * Click Node creation button
 * @param page
 */
export async function createNode(page: Page): Promise<void> {
  await createNodeButton(page).click();
  await expect(createNodeModal(page)).toBeVisible();
}

/**
 * Delete node from the list of available nodes - deletes the last node
 * @param page
 */
export async function deleteNode(page: Page): Promise<void> {
  await deleteButton(page).click();
  await expect(deleteNodeModal(page)).toBeVisible();
  await Promise.all([
    page.waitForResponse(
      (resp) => resp.url().includes("/nodes") && resp.status() === 200
    ),
    deleteConfirmButton(page).click(),
  ]);
}

/**
 * Closes an existing open modal - works for node modal and also the API Key modal
 * @param page
 */
export async function closeNodeModal(page: Page): Promise<void> {
  await closeModalButton(page).click();
  await expect(createNodeModal(page)).toBeHidden();
}

/**
 * View the Node API Key and verify it against the response
 * returned from the API response
 * @param page
 * @param apiKey
 */
export async function viewNodeKey(page: Page, apiKey: string): Promise<void> {
  await nodeKey(page).click();
  const value = await page
    .getByTestId("mui-modal")
    .getByTestId("mui-input")
    .inputValue();
  await expect(value).toEqual(apiKey);
}

export async function clickSupportButton(page: Page): Promise<void> {
  await supportButton(page).click();
}

// *** ASSERTIONS ***

export async function assertVisibleSupportPage(page): Promise<void> {
  await page.waitForURL("**/support");
  await expect(page.getByText("Can we help?")).toBeVisible();
}
