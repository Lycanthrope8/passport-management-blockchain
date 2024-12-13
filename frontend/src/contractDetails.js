// contractDetails.js

export const contractAddress = "0xe78A0F7E598Cc8b0Bb87894B0F60dD2a88d6a8Ab"; // Replace with your deployed contract address
export const abi = [
  // ABI of your PassportRegistry contract
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_age",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_birthdate",
        type: "string",
      },
      {
        internalType: "string",
        name: "_country",
        type: "string",
      },
    ],
    name: "registerPassport",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_publicAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_age",
        type: "uint256",
      },
    ],
    name: "verifyPassport",
    outputs: [
      {
        internalType: "bool",
        name: "exists",
        type: "bool",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "birthdate",
        type: "string",
      },
      {
        internalType: "string",
        name: "country",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  // Add more functions if necessary
];
