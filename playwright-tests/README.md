# Node, RPC, and GetWalletNFTs Functional, Non-functional & Automation Tests

This project contains functional and automation tests for both UI and API using the Playwright framework. The tests cover the following scenarios:
- **Node Operations**: Creating, deleting, viewing nodes, and verifying scenarios where a node cannot be created.
- **RPC Methods**: Executing `blockNumber`, `getBlockByNumber`, and `getTransactionByHash` methods on a node.
- **getWalletNFTs**: uses `getWalletNFTs` to get the NFTs from a specific wallet address.

## Prerequisites

- Node.js (>=14.x)
- npm (>=6.x)
- A Moralis admin account

## Setup

1. **Clone the repository:**
    ```sh
    git clone git@github.com:mwaz/moralis-technical.git
    cd moralis-technical
    ```

2. **Install dependencies:**
    ```sh
    cd playwright-tests
    npm install
    ```

3. **Create a Moralis account:**
    - Go to [Moralis Admin](https://admin.moralis.io/).
    - Create an account or log in if you already have one.

4. **Create a Node:**
    - Log in to the Moralis Admin UI.
    - Navigate to the Node section and create a new node.
    - Copy the Node API Key for your use. (This can be re-created, however the copied one is for verification purposes on a tool like Postman)

## Configuration

1. **Environment Variables:**
    Create a `.env` file in the root of the project and add the following variables:
    ```env
    MORALIS_ADMIN_EMAIL=<your_admin_email>
    MORALIS_ADMIN_PASSWORD=<your_admin_password>
    ```

## Running the Tests

1. **Execute all tests:**
    ```sh
    npm run test
    ```

2. **Execute RPC tests:**
    ```sh
    npm run test:rpc
    ```

3. **Execute get NFT tests:**
    ```sh
    npm run test:nft
    ```

4. **Execute Node tests:**
    ```sh
    npm run test:node
    ```


5. **Run specific file tests:**
    You can run specific tests by specifying the path to the test file. For example:
    ```sh
    npx playwright test tests/task-1/node/create-node.spec.ts

    ```
### Node Operations

- **Create Node**: Tests the creation of a new node through the UI.
- **Delete Node**: Tests the deletion of an existing node through the UI.
- **View Node**: Tests viewing the details of a node.
- **Node Creation Failures**: Verifies scenarios where a node cannot be created due to various reasons (e.g. lack of the network or the protocol).

### RPC Methods

- **blockNumber**: Test fetching the current block number.
- **getBlockByNumber**: Test retrieving a block by its number.
- **getTransactionByHash**: Test fetching a transaction by its hash.

### Get NFTs

- **getWalletNFTs**: Test fetching the NFTs in a given wallet.

## Test Files

- **tests/task-1/node/create-node.spec.ts**: Contains tests for node operations.
- **tests/task-1/rpc/rpc.spec.ts**: Contains tests for RPC methods.
 **tests/task-2/get-nfts.spec.ts**: Contains tests for get NFTS both functional and non-functional.

## Development

1. **Add New Tests:**
    - Create a new test file in the `tests` directory.
    - Use the Playwright framework to write your tests.
    - Ensure that your tests are self-contained and follow the existing naming conventions.

2. **Run Linter:**
    ```sh
    npm run lint
    ```

## Contributing

- Fork the repository.
- Create a new branch for your feature or bugfix.
- Write your code and tests.
- Open a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](https://choosealicense.com/licenses/mit/) file for details.