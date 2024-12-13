import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { contractAddress, abi } from "./contractDetails"; // Import from contractDetails.js

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState("");
  const [passportRegistry, setPassportRegistry] = useState(null);

  useEffect(() => {
    // Initialize Web3
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        // Request user to connect their wallet
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } else {
        alert("Please install MetaMask!");
      }
    };

    initWeb3();
  }, []);

  useEffect(() => {
    if (web3) {
      // Initialize contract when web3 is available
      const initializeContract = () => {
        const contract = new web3.eth.Contract(abi, contractAddress); // Use the imported contractAddress and abi
        setPassportRegistry(contract);
      };

      initializeContract();
    }
  }, [web3]);

  const handleRegister = async () => {
    if (passportRegistry) {
      try {
        await passportRegistry.methods
          .registerPassport("John Doe", 30, "01/01/1994", "USA")
          .send({ from: account });

        alert("Passport Registered Successfully!");
      } catch (error) {
        alert("Error registering passport: " + error.message);
      }
    }
  };

  const handleVerify = async () => {
    if (passportRegistry) {
      try {
        const result = await passportRegistry.methods
          .verifyPassport(account, 30) // example usage, provide correct age or other criteria
          .call();

        if (result.exists) {
          alert(
            `Passport Found! Name: ${result.name}, Birthdate: ${result.birthdate}, Country: ${result.country}`
          );
        } else {
          alert("No passport found for this account.");
        }
      } catch (error) {
        alert("Error verifying passport: " + error.message);
      }
    }
  };

  return (
    <div>
      <h1>Passport Management</h1>
      <p>Account: {account}</p>
      <button onClick={handleRegister}>Register Passport</button>
      <button onClick={handleVerify}>Verify Passport</button>
    </div>
  );
}

export default App;
