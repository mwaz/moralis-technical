import { test, expect } from "@playwright/test";
import * as login from "../utils/login";
import showAndCopyAPI from "./nfts";

test.describe("Get NFT tests", () => {
  let apiKey;
  test.beforeEach(async ({ page }) => {
    await login.loginUser(page, {
      username: `${process.env.MORALIS_ADMIN_EMAIL}`,
      password: `${process.env.MORALIS_ADMIN_PASSWORD}`,
    });
  });

  test.beforeEach(async ({ page }) => {
    await login.assertDashboardVisibility(page);
    apiKey = await showAndCopyAPI(page);
  });

  test("User can get NFTs by wallet", async ({ page, request }) => {
    const walletAddress = "0xff3879b8a363aed92a6eaba8f61f1a96a9ec3c1e";

    const nftResponse = await request.get(
      `https://deep-index.moralis.io/api/v2.2/${walletAddress}/nft`,
      {
        params: {
          chain: "eth",
          format: "decimal",
          normalizeMetadata: false,
          media_items: false,
        },
        headers: {
          accept: "application/json",
          "X-API-Key": `${apiKey}`,
        },
      }
    );

    const response = await nftResponse.json();
    await expect(nftResponse.status()).toEqual(200);
    const expectedNFTStructure = {
      amount: expect.any(String),
      token_id: expect.any(String),
      token_address: expect.any(String),
      contract_type: expect.any(String),
      owner_of: expect.any(String),
      last_metadata_sync: expect.any(String),
      last_token_uri_sync: expect.any(String),
      metadata: expect.any(String),
      block_number: expect.any(String),
      block_number_minted: expect.any(String),
      name: expect.any(String),
      symbol: expect.any(String),
      token_hash: expect.any(String),
      token_uri: expect.any(String),
      minter_address: expect.any(String),
      verified_collection: expect.any(Boolean),
      possible_spam: expect.any(Boolean),
      collection_logo: expect.any(String),
      collection_banner_image: expect.any(String),
    };

    // Verify the response structure
    await expect(response).toMatchObject({
      status: "SYNCED",
      page: expect.any(Number),
      page_size: expect.any(Number),
      cursor: expect.any(String),
      result: expect.arrayContaining([
        expect.objectContaining(expectedNFTStructure),
      ]),
    });

    // Verify a property in the response structure
    await expect(response.result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          token_id: expect.any(String),
          contract_type: "ERC1155",
        }),
      ])
    );
  });

  test("User cannot get NFTs by providing invalid wallet Address", async ({
    request,
  }) => {
    const walletAddress = "00xff3879b8a363aed92a6eaba8f61f1a96a9ec3c1e";

    const nftResponse = await request.get(
      `https://deep-index.moralis.io/api/v2.2/${walletAddress}/nft`,
      {
        params: {
          chain: "eth",
          format: "decimal",
          normalizeMetadata: false,
          media_items: false,
        },
        headers: {
          accept: "application/json",
          "X-API-Key": `${apiKey}`,
        },
      }
    );

    const response = await nftResponse.json();
    await expect(nftResponse.status()).toEqual(400);
    await expect(response.message).toEqual(
      "address with value '00xff3879b8a363aed92a6eaba8f61f1a96a9ec3c1e' is not a valid hex address"
    );
  });

  test("User cannot get NFTs by when wallet address is empty ", async ({
    request,
  }) => {
    const walletAddress = "  ";

    const nftResponse = await request.get(
      `https://deep-index.moralis.io/api/v2.2/${walletAddress}/nft`,
      {
        params: {
          chain: "eth",
          format: "decimal",
          normalizeMetadata: false,
          media_items: false,
        },
        headers: {
          accept: "application/json",
          "X-API-Key": `${apiKey}`,
        },
      }
    );

    const response = await nftResponse.json();
    await expect(nftResponse.status()).toEqual(400);
    await expect(response.message).toEqual(
      "address with value '  ' is not a valid hex address"
    );
  });

  test("User cannot get NFTs by when API Key is invalid", async ({
    request,
  }) => {
    const walletAddress = "0xff3879b8a363aed92a6eaba8f61f1a96a9ec3c1e";

    const nftResponse = await request.get(
      `https://deep-index.moralis.io/api/v2.2/${walletAddress}/nft`,
      {
        params: {
          chain: "eth",
          format: "decimal",
          normalizeMetadata: false,
          media_items: false,
        },
        headers: {
          accept: "application/json",
          "X-API-Key": `${apiKey}invalidString`,
        },
      }
    );

    const response = await nftResponse.json();
    await expect(nftResponse.status()).toEqual(401);
    await expect(response.message).toEqual("invalid signature");
  });

  test("User cannot get NFTs by when API Key format is invalid", async ({
    request,
  }) => {
    const walletAddress = "0xff3879b8a363aed92a6eaba8f61f1a96a9ec3c1e";

    const nftResponse = await request.get(
      `https://deep-index.moralis.io/api/v2.2/${walletAddress}/nft`,
      {
        params: {
          chain: "eth",
          format: "decimal",
          normalizeMetadata: false,
          media_items: false,
        },
        headers: {
          accept: "application/json",
          "X-API-Key": `invalidString`,
        },
      }
    );

    const response = await nftResponse.json();
    await expect(nftResponse.status()).toEqual(401);
    await expect(response.message).toEqual("Token is invalid format");
  });
});
