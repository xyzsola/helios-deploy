# Helios Smart Contract Deployment

This repository contains scripts for deploying smart contracts to the Helios network.

## Description

This project uses Hardhat to manage and deploy smart contracts. There are two main scripts:
- `deploy.js`: Deploys `AutoReporter.sol`.
- `chronos.js`: Deploys the Chronos smart contract.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 18.x or higher)
- [npm](https://www.npmjs.com/)

## Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/xyzsola/helios-deploy
    cd helios-deploy
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env` file in the project's root directory and add the following variables. This file is used to securely store your private key and RPC URL.

    ```env
    # RPC URL for the Helios Testnet node
    RPC_URL="https://rpc.helioschain.io/"

    # Private key of the wallet to be used for deployment
    PRIVATE_KEY="YOUR_PRIVATE_KEY"
    ```
    > **Important**: Replace `"YOUR_PRIVATE_KEY"` with your actual private key. Never share your private key with anyone.

## Usage

After installation and configuration are complete, you can deploy the smart contracts using the available scripts.

### Deploying `CounterContract`

To deploy `CounterContract.sol`, run the following command:

```bash
npm run deploy:contract
```

This script will log the address of the successfully deployed smart contract in `deploy-log.json` and display it in the console.

### Deploying `Chronos`

To deploy the Chronos smart contract, run the following command:

```bash
npm run deploy:chronos
```

## License

This project is licensed under the [MIT License](LICENSE).
