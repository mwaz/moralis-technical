import { Page, expect } from "@playwright/test";

// *** LOCATORS ***

export const nodesMenuItem = (page: Page) => page.getByTitle("Nodes");

// *** HELPERS ***

export async function openNodesTab(): Promise<void> {}

// *** ASSERTIONS ***
