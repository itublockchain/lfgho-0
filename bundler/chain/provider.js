const ethers = require("ethers");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
const signer0 = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);

module.exports = {signer0, provider};