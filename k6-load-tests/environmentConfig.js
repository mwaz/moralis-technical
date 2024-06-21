export function moralisConfig(filename) {
  let envConfig = {
    BASE_URL: "BASE_URL",
    NODE_URL_1: "https://site1.moralis-nodes.com/eth",
    NODE_URL_2: "https://site2.moralis-nodes.com/eth",
    MORALIS_ADMIN_EMAIL: "someone@gmail.com",
    MORALIS_ADMIN_PASSWORD: "sample-password",
    NODE_API_KEY: "valid-node-api-key",
    API_KEY: "Valid-API-Key",
  };
  return Object.assign({}, envConfig, filename);
}
