A simple Dapp example to illustrate the process of building a decentralized application.

## Pre-requisites:

Node, React, Truffle, MetaMask, Ganache

## Truffle Installation:

In the Terminal or Command Prompt, type the following command and press Enter:

`npm install -g truffle`

## Metamask Installation:

MetaMask is a popular browser extension that allows users to interact with the Ethereum blockchain and decentralized applications (DApps) directly from their web browsers.It serves as a digital wallet and provides a user-friendly interface for managing Ethereum accounts, sending and receiving Ether (ETH), and interacting with smart contracts.

To install MetaMask as a browser extension, follow these steps:

a. Open the Google Chrome web browser.

b. Go to the Chrome Web Store: https://chrome.google.com/webstore/category/extensions

c. In the search bar, type "MetaMask" and press Enter.

d. Click on the "MetaMask" extension from the search results.

e. Click the "Add to Chrome" button.

f. A pop-up will appear, asking for confirmation. Click "Add extension."

g. MetaMask will be added to your Chrome browser


## Setting up MetaMask:

After installing MetaMask, follow these steps to set it up:

a. Click on the MetaMask icon in the top-right corner of your browser window.

b. Click "Get Started" on the pop-up that appears.

c. You will be presented with two options: "Create a Wallet" or "Import Wallet." Choose the option that suits your needs.

d .If you select "Create a Wallet," you will be asked to create a password for your MetaMask account.

e .After creating a password, you will be shown a secret backup phrase (seed phrase). Write down the backup phrase on a piece of paper and keep it secure. This backup phrase is crucial for recovering your account if you lose access to your device.

f. Confirm the backup phrase by entering the words in the correct order.

g .Once your wallet is set up, you can use MetaMask to manage your Ethereum accounts, interact with DApps.

## Connect to Sepolia network and get initial Ethers

Tesnet like Sepolia, does not deal with actual money. To deploy and make transaction in ethereum testnet we will require the fake ether.

Sepolia Testnet: To connect to the Sepolia testnet, you can follow these steps:

a. Open MetaMask and select the Sepolia testnet from the network dropdown menu. You might need to click on your account icon to see the dropdown menu.

b. Once connected to Sepolia, you can obtain test Ether by using the Sepolia Ethereum faucet. Visit the Sepolia faucet website (https://sepolia.etherscan.io/) and follow their instructions to request test Ether for your MetaMask account.

## Build the contract:

To create a new contract, start by creating an empty project in your workspace and initialize it using truffle init:( I already created a project and ran this command)
`truffle init`

Once this operation is completed, you'll now have a project structure with the following items:

contracts/: Directory for Solidity contracts
migrations/: Directory for scriptable deployment files
test/: Directory for test files for testing your application and contracts
truffle-config.js: Truffle configuration file

## Deploy the smart contract to Sepolia or local network

To deploy a smart contract to a testnet or a local network, you can use tools like Truffle, which simplifies the deployment process. Below steps are for deploying a smart contract to both a testnet (Sepolia) and a local development network (using Ganache as an example).

Once you have test Ether and Truffle installed, follow these steps:

## Deploying to Sepolia Network (Testnet):

1. Modify truffle-config.js file, add the Sepolia network configuration, including the network ID, provider, and your wallet's mnemonic (or private key).
2. In the "migrations" folder add a migration script and name with a number prefix (e.g., "2_deploy_contract.js").
3. Run the migration command to deploy the contract to the Sepolia testnet:
    `truffle migrate --network sepolia`
4. Once the deployment is successful, you will see the contract address in the output.

##  Deploying to Local Network (Ganache):

1. Open Ganache and start your local blockchain. It will provide you with a list of accounts with test Ether.
2. Ensure you have a migration script ready as described in the previous section.
3. Run the migration command to deploy the contract to the local network:
    `truffle migrate --network development`
4. Once the deployment is successful, you will see the contract address in the output.

## Clone the Repo

This is a react app to interact with our HealthRecord contract.

`git clone https://github.com/indiranell/patient-health-record-dapp`

To use your own contract, update the `/src/contractConfig.js` with the contract address. 

## Run the application

1. Go to client folder
2. Run `npm start`
3. Server is available in `http://localhost:3000`
4. Enter the details in the input and click `AddPatient`
5. A MetaMask popup will be displayed with the account details as shown below
   ![metamask](https://github.com/indiranell/patient-health-record-dapp/assets/22164284/2af8aaaf-3b0c-4739-9160-a97b5ac0099d)
6. Click Next. You need to authorize and approve the MetaMask transaction. click Approve
    ![confirm](https://github.com/indiranell/patient-health-record-dapp/assets/22164284/32088f15-aacf-4f7b-bd40-cc4a50968de3)
7. Once approved, a new transaction is created and transaction hash is displayed on the UI
   ![transaction](https://github.com/indiranell/patient-health-record-dapp/assets/22164284/1eeb4888-7b43-4dbc-b5af-c0785daacec9)
8. Copy the transaction hash. Now verify this transaction in the testnet. Here the configured network is sepolia(https://sepolia.etherscan.io/), so verifying the transaction here
   ![trans-sepolia](https://github.com/indiranell/patient-health-record-dapp/assets/22164284/e5c5df6b-c66c-41b1-95a6-55159c75bed5)


## Testing smart contracts

It is important to test your smart-contract before deployment. I have covered few test scenarios in this blog - https://qxf2.com/blog/exploring-smart-contract-testing

To run the test use the command 

`truffle test --network development`
