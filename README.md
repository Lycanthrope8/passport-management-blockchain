# Passport Management Blockchain

This project is a blockchain-based application to securely manage travel passport data using Ethereum. It leverages the power of blockchain technology to ensure that passport information is stored and verified in a decentralized and tamper-proof manner.

The application allows users to register and verify their passport information using their public Ethereum address (via MetaMask).

## Features

* **Register Passport** : Users can register their passport details including name, age, birthdate, and country. The passport is tied to the user’s public Ethereum address (from MetaMask).
* **Verify Passport** : Users can verify whether they have a registered passport based on their public Ethereum address and age.
* **Predefined Users Access** (Optional): There will be some predefined users who can read passport data for any public address.

## Table of Contents

* [Technologies Used](https://chatgpt.com/c/675c81f8-c724-8011-9d03-3be2ce509b1d#technologies-used)
* [Installation](https://chatgpt.com/c/675c81f8-c724-8011-9d03-3be2ce509b1d#installation)
* [How It Works](https://chatgpt.com/c/675c81f8-c724-8011-9d03-3be2ce509b1d#how-it-works)
* [Usage](https://chatgpt.com/c/675c81f8-c724-8011-9d03-3be2ce509b1d#usage)
* [Smart Contract Details](https://chatgpt.com/c/675c81f8-c724-8011-9d03-3be2ce509b1d#smart-contract-details)
* [Ganache CLI Setup](https://chatgpt.com/c/675c81f8-c724-8011-9d03-3be2ce509b1d#ganache-cli-setup)
* [Contributing](https://chatgpt.com/c/675c81f8-c724-8011-9d03-3be2ce509b1d#contributing)
* [License](https://chatgpt.com/c/675c81f8-c724-8011-9d03-3be2ce509b1d#license)

## Technologies Used

* **Ethereum** : The blockchain platform used for the application.
* **Solidity** : The programming language for writing the smart contract.
* **Web3.js** : A JavaScript library used to interact with the Ethereum blockchain from a web application.
* **React** : Front-end library for building the user interface.
* **MetaMask** : A browser extension that acts as a bridge to interact with the Ethereum blockchain.
* **Ganache CLI** : A personal Ethereum blockchain for development purposes, used for testing and deploying contracts locally.

## Installation

Follow these steps to set up the application locally:

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/passport-management-blockchain.git
cd passport-management-blockchain
```

### 2. Install dependencies

In the root directory, run the following command to install all necessary dependencies:

```bash
npm install
```

This will install the required libraries such as React, Web3.js, and others specified in `package.json`.

### 3. Setup MetaMask

* Install the MetaMask extension in your browser (if not already installed).
* Create a new wallet or import an existing one.
* Switch to the **Ganache** network (or Rinkeby/Sepolia if you are using a testnet).

### 4. Setup Ganache CLI (Optional for local blockchain development)

If you want to use **Ganache CLI** to run a local Ethereum blockchain, follow these steps:

1. **Install Ganache CLI** :
   To install Ganache CLI globally, run the following command:

```bash
   npm install -g ganache-cli
```

1. **Start Ganache CLI** :
   Start the Ganache CLI by running the following command in your terminal:

```bash
   ganache-cli
```

   This will start a local Ethereum blockchain with a predefined set of accounts and private keys, each with a balance of 100 ETH for testing purposes.

   By default, Ganache CLI will listen on port `8545`.

1. **Update the Application to Connect to Ganache CLI** :
   In your `App.js` or relevant Web3 configuration file, update the Web3 provider to point to the local Ganache CLI network:

```javascript
   const web3 = new Web3('http://127.0.0.1:8545');  // Local Ganache CLI URL
```

   Ensure that you're using the correct RPC URL for Ganache CLI (`http://127.0.0.1:8545` by default).

1. **Deploy the Smart Contract** :
   Once Ganache is running, you can deploy your smart contract to the local blockchain using a framework like **Truffle** or  **Hardhat** . Both frameworks make it easy to interact with Ganache and deploy smart contracts.

* **Truffle** : You can deploy contracts to Ganache using the `truffle migrate` command.
* **Hardhat** : Hardhat also provides a local network option that can be connected to Ganache.

### 5. Run the Application

Start the development server by running:

```bash
npm start
```

The app will open in your browser at [http://localhost:3000](http://localhost:3000/).

## How It Works

The application interacts with the Ethereum blockchain to handle passport registration and verification. The workflow is as follows:

1. **Connect Wallet** : The user connects their MetaMask wallet to the application, which enables interaction with the Ethereum network.
2. **Register Passport** : Users can register their passport information (name, age, birthdate, and country). This information is stored in the blockchain against the user's public address.
3. **Verify Passport** : Users can verify their passport information by providing their Ethereum address and age. The application checks the blockchain to see if the user's passport is registered.
4. **Access Control** : By default, only the user who registered the passport can view their passport data. Predefined users (if implemented) will have special permission to read any user's passport data using their public address.

## Usage

Once the app is running, follow these steps to use the application:

### 1. **Register Passport**

* Click the "Register Passport" button after connecting your MetaMask wallet.
* Enter your details (e.g., name, age, birthdate, country).
* Your passport will be registered on the Ethereum blockchain and tied to your MetaMask public address.

### 2. **Verify Passport**

* Click the "Verify Passport" button.
* Enter your public Ethereum address and age.
* The app will check if the passport exists for the given address and return the user's passport details if found.

## Smart Contract Details

The smart contract is written in **Solidity** and deployed on the Ethereum test network. It contains the following main features:

### Functions:

1. **registerPassport** : Registers a new passport using the user's public Ethereum address. It takes the following parameters:

* `name` (string)
* `age` (uint)
* `birthdate` (string)
* `country` (string)

1. **verifyPassport** : Verifies whether a passport exists for a given public address and age. It returns:

* `exists` (bool): Whether the passport exists for the given address.
* `name` (string): The name of the passport holder.
* `birthdate` (string): The birthdate of the passport holder.
* `country` (string): The country of the passport holder.

### Sample Contract:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PassportRegistry {
    struct Passport {
        string name;
        uint age;
        string birthdate;
        string country;
    }

    mapping(address => Passport) public passports;
    mapping(address => bool) public isRegistered;

    function registerPassport(string memory name, uint age, string memory birthdate, string memory country) public {
        require(!isRegistered[msg.sender], "Passport already registered.");
        passports[msg.sender] = Passport(name, age, birthdate, country);
        isRegistered[msg.sender] = true;
    }

    function verifyPassport(address userAddress, uint age) public view returns (bool exists, string memory name, string memory birthdate, string memory country) {
        if (isRegistered[userAddress] && passports[userAddress].age == age) {
            Passport memory passport = passports[userAddress];
            return (true, passport.name, passport.birthdate, passport.country);
        }
        return (false, "", "", "");
    }
}
```

### Deployment

Deploy the smart contract using **Remix IDE** or **Truffle** to a test network such as **Sepolia** or  **Rinkeby** . After deployment, replace `contractAddress` and `abi` in `contractDetails.js` with the actual contract address and ABI.

## Contributing

We welcome contributions! If you would like to contribute to this project, feel free to fork the repository, make your changes, and create a pull request.

### Steps for Contribution:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -am 'Add feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](https://chatgpt.com/c/LICENSE) file for details.
