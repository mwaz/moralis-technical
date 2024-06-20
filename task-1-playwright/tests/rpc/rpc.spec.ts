import { test, expect } from "@playwright/test";
import * as login from "../utils/login";
import * as node from "../node/create-node";

function isHexadecimal(str) {
  return /^0x[0-9a-fA-F]+$/.test(str);
}
test.describe("RPC tests", () => {
  let nodeAPIKey;
  test.beforeEach(async ({ page }) => {
    await login.loginUser(page, {
      username: `${process.env.MORALIS_ADMIN_EMAIL}`,
      password: `${process.env.MORALIS_ADMIN_PASSWORD}`,
    });
  });

  test.beforeEach(async ({ browser, page }) => {
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
  });

  test("User can get blockNumber", async ({ page, request }) => {
    const blockNumber = await request.post(
      `https://site1.moralis-nodes.com/eth/${nodeAPIKey}`,
      {
        data: {
          jsonrpc: "2.0",
          id: 1,
          method: "eth_blockNumber",
        },
      }
    );
    const response = await blockNumber.json();
    await expect(blockNumber.ok()).toBeTruthy();
    await expect(response).toHaveProperty("jsonrpc");
    await expect(response).toHaveProperty("id");
    await expect(response).toHaveProperty("result");
    await node.deleteNode(page);
  });

  test("User can get block by number", async ({ page, request }) => {
    const block = await request.post(
      `https://site1.moralis-nodes.com/eth/${nodeAPIKey}`,
      {
        data: {
          jsonrpc: "2.0",
          id: 1,
          method: "eth_getBlockByNumber",
          params: ["latest", true],
        },
      }
    );
    const response = await block.json();
    await expect(block.ok()).toBeTruthy();

    await expect(response).toHaveProperty("jsonrpc");
    await expect(response).toHaveProperty("id");
    await expect(response).toHaveProperty("result");

    const result = response.result;
    expect(result).toEqual(
      expect.objectContaining({
        baseFeePerGas: expect.any(String),
        blobGasUsed: expect.any(String),
        difficulty: expect.any(String),
        excessBlobGas: expect.any(String),
        extraData: expect.any(String),
        gasLimit: expect.any(String),
        gasUsed: expect.any(String),
        hash: expect.any(String),
        logsBloom: expect.any(String),
        miner: expect.any(String),
        mixHash: expect.any(String),
        nonce: expect.any(String),
        number: expect.any(String),
        parentBeaconBlockRoot: expect.any(String),
        parentHash: expect.any(String),
        receiptsRoot: expect.any(String),
        sha3Uncles: expect.any(String),
        size: expect.any(String),
        stateRoot: expect.any(String),
        timestamp: expect.any(String),
        totalDifficulty: expect.any(String),
        transactions: expect.any(Array),
      })
    );
    expect(result.transactions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          blockHash: expect.any(String),
          blockNumber: expect.any(String),
          from: expect.any(String),
          gas: expect.any(String),
          gasPrice: expect.any(String),
          hash: expect.any(String),
          input: expect.any(String),
          nonce: expect.any(String),
          to: expect.any(String),
          transactionIndex: expect.any(String),
          value: expect.any(String),
          type: expect.any(String),
          chainId: expect.any(String),
          v: expect.any(String),
          r: expect.any(String),
          s: expect.any(String),
        }),
      ])
    );
    await expect(result.uncles).toEqual(expect.arrayContaining([]));
    await expect(result.withdrawals).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          index: expect.any(String),
          validatorIndex: expect.any(String),
          address: expect.any(String),
          amount: expect.any(String),
        }),
      ])
    );

    await node.deleteNode(page);
  });

  test.only("User can get transaction by hash", async ({ page, request }) => {
    const transaction = await request.post(
      `https://site1.moralis-nodes.com/eth/${nodeAPIKey}`,
      {
        data: {
          jsonrpc: "2.0",
          id: 1,
          method: "eth_getTransactionByHash",
          params: [
            "0xd4b2e80202cc55517c328412a7792772e1bdd925ac1a2120aeafe84316206ad3",
          ],
        },
      }
    );
    const response = await transaction.json();
    await expect(transaction.ok()).toBeTruthy();
    await expect(response).toHaveProperty("jsonrpc");
    await expect(response).toHaveProperty("id");
    await expect(response).toHaveProperty("result");

    const result = response.result;
    await expect(result).toEqual(
      expect.objectContaining({
        blockHash: expect.any(String),
        blockNumber: expect.any(String),
        from: expect.any(String),
        gas: expect.any(String),
        gasPrice: expect.any(String),
        maxPriorityFeePerGas: expect.any(String),
        maxFeePerGas: expect.any(String),
        hash: expect.any(String),
        input: expect.any(String),
        nonce: expect.any(String),
        to: expect.any(String),
        transactionIndex: expect.any(String),
        value: expect.any(String),
        type: expect.any(String),
        accessList: expect.arrayContaining([]),
        chainId: expect.any(String),
        v: expect.any(String),
        r: expect.any(String),
        s: expect.any(String),
      })
    );

    const hexFields = [
      result.blockHash,
      result.blockNumber,
      result.gas,
      result.gasPrice,
      result.maxPriorityFeePerGas,
      result.maxFeePerGas,
      result.hash,
      result.nonce,
      result.transactionIndex,
      result.value,
      result.chainId,
      result.v,
      result.r,
      result.s,
    ];

    for (const field of hexFields) {
      expect(isHexadecimal(field)).toBe(true);
    }
    await node.deleteNode(page);
  });
  
  /**
   * Negative cases
   *  Verify user cannot login with an invalid node api key
   * Verify user cannot login with a deleted node api key
   */
});
