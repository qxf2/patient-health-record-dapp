A simple dapp example to illustrate the process of building a decentralized application

## Pre-requisites:

Node

React

Truffle

MetaMask

Ganache

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

b. Once connected to Sepolia, you can obtain test Ether by using the Rinkeby Ethereum faucet. Visit the Sepolia faucet website (https://sepolia.etherscan.io/) and follow their instructions to request test Ether for your MetaMask account.


## Deploy the smart contract to Sepolia or local network

To deploy a smart contract to a testnet or a local network, you can use tools like Truffle, which simplifies the deployment process. Below steps are for deploying a smart contract to both a testnet (specifically, Sepolia) and a local development network (using Ganache as an example).

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

Verify your Contract:
