# Node and RPC Functional & Automation Tests

This project contains functional and automation tests for both UI and API using the Playwright framework. The tests cover the following scenarios:
- **Node Operations**: Creating, deleting, viewing nodes, and verifying scenarios where a node cannot be created.
- **RPC Methods**: Executing `blockNumber`, `getBlockByNumber`, and `getTransactionByHash` methods on a node.

## Prerequisites

- Node.js (>=14.x)
- npm (>=6.x)
- A Moralis admin account

## Setup

1. **Clone the repository:**
    ```sh
    git clone <repository_url>
    cd <repository_name>
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Create a Moralis account:**
    - Go to [Moralis Admin](https://admin.moralis.io/).
    - Create an account or log in if you already have one.

4. **Create a Node:**
    - Log in to the Moralis Admin UI.
    - Navigate to the Node section and create a new node.
    - Copy the Node URL for use in the tests.

## Configuration

1. **Environment Variables:**
    Create a `.env` file in the root of the project and add the following variables:
    ```env
    MORALIS_NODE_URL=<your_node_url>
    MORALIS_ADMIN_EMAIL=<your_admin_email>
    MORALIS_ADMIN_PASSWORD=<your_admin_password>
    ```

## Running the Tests

1. **Execute all tests:**
    ```sh
    npm test
    ```

2. **Run specific tests:**
    You can run specific tests by specifying the path to the test file. For example:
    ```sh
    npx playwright test tests/nodeOperations.test.js
    npx playwright test tests/rpcMethods.test.js
    ```

## Test Coverage

### Node Operations

- **Create Node**: Tests the creation of a new node through the UI.
- **Delete Node**: Tests the deletion of an existing node through the UI.
- **View Node**: Tests viewing the details of a node.
- **Node Creation Failures**: Verifies scenarios where a node cannot be created due to various reasons (e.g., invalid inputs, insufficient permissions).

### RPC Methods

- **blockNumber**: Test fetching the current block number.
- **getBlockByNumber**: Test retrieving a block by its number.
- **getTransactionByHash**: Test fetching a transaction by its hash.

## Test Files

- **tests/node/create-node.spec.ts**: Contains tests for node operations.
- **tests/rpc/rpc.spec.ts**: Contains tests for RPC methods.

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

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


