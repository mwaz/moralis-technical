# Moralis Playwright Tests and k6 load tests

This repository includes two sets of tests: k6 Load Tests and `Node`, `RPC`, and `GetNFTs` Playwright Tests for the Moralis platform. The k6 Load Tests focus on performance metrics and scalability using k6 for endpoints such as fetching NFTs and blockchain operations. On the other hand, the `Node`, `RPC`, and `GetWalletNFTs` tests utilize the Playwright framework to verify functionalities like node creation, RPC method executions, and NFT retrieval. For detailed setup instructions and test scenarios, refer to the respective README files:

1. [k6 Load Tests README](./k6-load-tests/README.md)

2. [Node, RPC, and GetWalletNFTs Tests README](./playwright-tests/README.md)

These README files provide comprehensive guides on installation, setup, configuration, and execution of tests for their respective frameworks.

## Known issues

1. Since the tier used for testing purposes was the free tier, running load tests multiple times might not be advisable since you will easily run out of the allocated API requests per day. 
2. [The Moralis Admin](https://admin.moralis.io) site uses Google Recaptcha and part of that means that automation is limited especially when performed as a blackbox tester. With that in mind, i was able to add a significant wait schedule especially on login and even with that it only works on the non-headless mode without triggering a recaptcha code on the playwright tests.
3. Due to the second issue mentioned above, it was not impossible to integrate a CI/CD tool like Github actions as all runs from a headless perspective are met with the Google recaptcha popup.