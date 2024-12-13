import Web3 from "web3";

// Initialize Web3
let web3;
let passportRegistry;
let currentAccount;

// Initialize contract and account
async function initializeContract() {
  try {
    if (window.ethereum) {
      // Create Web3 instance using MetaMask's provider
      web3 = new Web3(window.ethereum);

      // Request user accounts access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      currentAccount = accounts[0]; // Get the first account
      console.log("MetaMask is connected. Current Account:", currentAccount);

      // Check the network (Optional: Modify this to match your contract network)
      const networkId = await web3.eth.net.getId();
      console.log("Network ID:", networkId);

      // If contract address is different on each network, adjust accordingly
      const contractAddress = "0xe78A0F7E598Cc8b0Bb87894B0F60dD2a88d6a8Ab"; // Your deployed contract address
      const contractABI = [
        /* Your ABI Array */
      ]; // Your contract ABI array

      // Initialize the contract instance
      passportRegistry = new web3.eth.Contract(contractABI, contractAddress);
      console.log("Contract initialized:", passportRegistry);
    } else {
      console.error("Ethereum provider (MetaMask) not found");
    }
  } catch (error) {
    console.error("Error initializing contract:", error);
  }
}

// Register passport
async function registerPassport(id, name, age, birthdate, country) {
  try {
    if (!passportRegistry) {
      console.error("Contract is not initialized yet.");
      return;
    }
    await passportRegistry.methods
      .registerPassport(id, name, age, birthdate, country)
      .send({ from: currentAccount });
    console.log("Passport registered successfully!");
  } catch (error) {
    console.error("Error registering passport:", error);
  }
}

// Verify passport
async function verifyPassport(id, age) {
  try {
    if (!passportRegistry) {
      console.error("Contract is not initialized yet.");
      return;
    }
    const result = await passportRegistry.methods
      .verifyPassport(id, age)
      .call();
    console.log("Passport verified:", result);
  } catch (error) {
    console.error("Error verifying passport:", error);
  }
}

export {
  web3,
  passportRegistry,
  initializeContract,
  registerPassport,
  verifyPassport,
};
