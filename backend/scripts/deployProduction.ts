import { ethers } from "hardhat";
import dotenv from "dotenv";

dotenv.config();

const FACTORY_ADDRESSES = {
    mumbai: "0xa7B2Ec6a9bdA160c1D0984bbc955A3ea4Cd7565e",
    goerli: "0xA4ab71b07eD6181231DbC353FA8303aE846a2cdf",
    sepolia: "0xA4ab71b07eD6181231DbC353FA8303aE846a2cdf",
    scroll: "0xA4ab71b07eD6181231DbC353FA8303aE846a2cdf",
    baseGoerli: "0xA4ab71b07eD6181231DbC353FA8303aE846a2cdf",

    sepoliaRouter: "0x0bf3de8c5d3e8a2b34d2beeb17abfcebaf363a59",
    sepoliaLink: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
}

async function main() {
    const Af = await ethers.getContractFactory("AccountFactory");
    const af = await Af.deploy();

    await af.deployed();
    console.log("Account Factory: " + af.address);

    // const Erc20 = await ethers.getContractFactory("GHOToken");
    // const erc20 = await Erc20.deploy();

    // await erc20.deployed();
    // console.log("ERC20: " + erc20.address);

    // const Pm = await ethers.getContractFactory("Paymaster");
    // const pm = await Pm.deploy(erc20.address);

    // await pm.deployed();
    // console.log("Paymaster: " + pm.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
