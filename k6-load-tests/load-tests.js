import http from "k6/http";
import { check, group } from "k6";
import { moralisConfig } from "./environmentConfig.js";

export const options = {
  ext: {
    loadimpact: {
      projectID: "3702227",
      name: "moralis load tests",
    },
  },
  thresholds: {
    // During the whole test execution, the error rate must be lower than 1%.
    http_req_failed: ["rate<0.01"],
    // the rate of successful checks should be higher than 90%
    checks: ["rate>0.9"],
  },
  scenarios: {
    moralis_tests_scenario: {
      env: moralisConfig(),
      executor: "ramping-vus",
      stages: [
        { duration: "0.5m", target: 10 }, // simulate ramp-up of traffic from 1 to 10 virtual users over 0.5 minutes.
        { duration: "0.5m", target: 15 }, // stay at 15 virtual users for 0.5 minutes
        { duration: "0.5m", target: 0 }, // ramp-down to 0 users
      ],
    },
  },
};

export default function () {
  group("GET/ Get NFTs from a wallet address", () => {
    const params = {
      tags: {
        chain: "eth",
        format: "decimal",
        normalizeMetadata: false,
        media_items: false,
      },
      headers: {
        accept: "application/json",
        "X-API-Key": `${__ENV.API_KEY}`,
      },
    };
    const walletAddress = "0xff3879b8a363aed92a6eaba8f61f1a96a9ec3c1e";
    const res = http.get(
      `https://deep-index.moralis.io/api/v2.2/${walletAddress}/nft`,
      params
    );
    check(res, {
      "status code should be 200 - GET/ NFTs from wallet": (res) =>
        res.status === 200,
    });
    check(res.json(), {
      "status is SYNCED": (r) => r.status === "SYNCED",
      "page is a number": (r) => typeof r.page === "number",
      "page_size is a number": (r) => typeof r.page_size === "number",
      "result is an array": (r) => Array.isArray(r.result),
      "result contains expected structure": (r) =>
        r.result.every(
          (item) =>
            typeof item.amount === "string" &&
            typeof item.token_id === "string" &&
            typeof item.token_address === "string" &&
            typeof item.contract_type === "string" &&
            typeof item.owner_of === "string" &&
            typeof item.last_metadata_sync === "string" &&
            typeof item.last_token_uri_sync === "string" &&
            typeof item.block_number === "string" &&
            typeof item.name === "string" &&
            typeof item.symbol === "string" &&
            typeof item.token_hash === "string" &&
            typeof item.verified_collection === "boolean" &&
            typeof item.possible_spam === "boolean" &&
            typeof item.collection_logo === "string" &&
            typeof item.collection_banner_image === "string"
        ),
    });
  });

  group("POST/ Get blockNumber from a Node", () => {
    const params = {
      headers: {
        accept: "application/json",
      },
    };
    const data = {
      jsonrpc: "2.0",
      id: 1,
      method: "eth_blockNumber",
    };
    const res = http.post(
      `${__ENV.NODE_URL_1}/${__ENV.NODE_API_KEY}`,
      data,
      params
    );
    check(res, {
      "status code should be 200 - POST/ blockNumber from node": (res) =>
        res.status === 200,
    });
    check(res.json(), {
      "jsonrpc is 2.0": (r) => r.jsonrpc === "2.0",
      "result is a string": (r) => typeof r.result === "string",
      "result is a valid hex string": (r) => /^0x[0-9a-fA-F]+$/.test(r.result),
    });
  });

  group("POST/ Get block by number from a Node", () => {
    const params = {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "k6/0.42.0 (https://k6.io/)",
        Accept: "application/json",
      },
    };
    const data = JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "eth_getBlockByNumber",
      params: ["latest", true],
    });
    const res = http.post(
      `${__ENV.NODE_URL_1}/${__ENV.NODE_API_KEY}`,
      data,
      params
    );
    check(res, {
      "status code should be 200 - POST/ Block by number": (res) =>
        res.status === 200,
    });
  });

  group("POST/ Get transaction by a hash from a Node", () => {
    const params = {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "k6/0.42.0 (https://k6.io/)",
        Accept: "application/json",
      },
    };
    const data = JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "eth_getTransactionByHash",
      params: [
        "0xd4b2e80202cc55517c328412a7792772e1bdd925ac1a2120aeafe84316206ad3",
      ],
    });
    const res = http.post(
      `${__ENV.NODE_URL_1}/${__ENV.NODE_API_KEY}`,
      data,
      params
    );
    check(res, {
      "status code should be 200 - POST/ Transaction by hash": (res) =>
        res.status === 200,
    });

    const responseBody = res.json();
    check(responseBody, {
      "response is JSON-RPC 2.0": (body) => body.jsonrpc === "2.0",
      "id is number": (body) => typeof body.id === "number",
      "result is object": (body) => typeof body.result === "object",
      "gasPrice is string": (body) => typeof body.result.gasPrice === "string",
      "accessList is array": (body) => Array.isArray(body.result.accessList),
      "chainId is string": (body) => typeof body.result.chainId === "string",
      "v is string": (body) => typeof body.result.v === "string",
    });
  });
}
