import { test, expect } from "@playwright/test";
import * as login from "../../utils/login";
import * as node from "./create-node";

test.describe("Create Node tests", () => {
  test.beforeEach(async ({ page }) => {
    await login.loginUser(page, {
      username: `${process.env.MORALIS_ADMIN_EMAIL}`,
      password: `${process.env.MORALIS_ADMIN_PASSWORD}`,
    });
  });

  test("user can create and view nodes on the dashboard", async ({ page }) => {
    let nodeAPIKey;
    await login.assertDashboardVisibility(page);
    await node.openNodesTab(page);
    await node.createNode(page);
    nodeAPIKey = await node.selectOptionsAndCreateNode(page, {
      protocol: "Ethereum",
      network: "Mainnet",
    });
    await expect(page.getByText("Ethereum")).toBeVisible();
    await node.deleteNode(page);
  });

  test("user can cancel process of creating a node", async ({ page }) => {
    await login.assertDashboardVisibility(page);
    await node.openNodesTab(page);
    await node.createNode(page);
    await node.closeNodeModal(page);
  });

  test("user can view a node API key", async ({ page }) => {
    let nodeAPIKey;
    await login.assertDashboardVisibility(page);
    await node.openNodesTab(page);
    await node.createNode(page);
    nodeAPIKey = await node.selectOptionsAndCreateNode(page, {
      protocol: "Ethereum",
      network: "Mainnet",
    });
    await expect(page.getByText("Ethereum")).toBeVisible();
    await node.viewNodeKey(page, nodeAPIKey);
    await node.closeNodeModal(page);
    await node.deleteNode(page);
  });

  test("User cannot select a network if a protocol is not selected", async ({
    page,
  }) => {
    await login.assertDashboardVisibility(page);
    await node.openNodesTab(page);
    await node.createNode(page);
    await page
      .getByTestId("test-CardCountrySelect")
      .selectOption({ value: "" });
    await expect(node.nodeButton(page)).toBeDisabled();
  });

  test("User cannot create a node if a network is not selected", async ({
    page,
  }) => {
    await login.assertDashboardVisibility(page);
    await node.openNodesTab(page);
    await node.createNode(page);
    await page
      .getByTestId("test-CardCountrySelect")
      .selectOption({ value: "Ethereum" });
    await expect(node.nodeButton(page)).toBeDisabled();
  });

  test("User can access support help if they are facing problems creating a node", async ({
    page,
  }) => {
    await login.assertDashboardVisibility(page);
    await node.openNodesTab(page);
    await node.createNode(page);
    await node.clickSupportButton(page);
    await node.assertVisibleSupportPage(page);
  });
});
