import { ethers } from "hardhat";
import dotenv from "dotenv";

dotenv.config();

const FACTORY_ADDRESSES = {
    mumbai: "0xa7B2Ec6a9bdA160c1D0984bbc955A3ea4Cd7565e",
    goerli: "0xA4ab71b07eD6181231DbC353FA8303aE846a2cdf",
    sepolia: "0xA4ab71b07eD6181231DbC353FA8303aE846a2cdf",
    scroll: "0xA4ab71b07eD6181231DbC353FA8303aE846a2cdf"
}


const ERC20_ADDRESS = process.env.ERC20_ADDRESS!;
const EP_ADDRESS = process.env.EP_ADDRESS!;
const ACCOUNT_ADDRESS = process.env.ACCOUNT_ADDRESS!;

async function main() {
//   const Af = await ethers.getContractFactory("AccountFactory");
//   const af = await Af.deploy();

//   await af.deployed();

//   console.log("Account Factory: " + af.address);

  const accountFactory = await ethers.getContractAt(
    "AccountFactory",
    "0x7Fe2976b4F5D06310963F4dAeB3A39e814fD41Ca"
  );
  const tx = await accountFactory.createAccount(
    "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
    "0xa2e5306F55872af862B0fbf44a89484955a6BeDe",
    "0x0000000000000000000000000000000000000000000000000000000000000000"
  );

  await tx.wait();
  console.log("Tx Hash: " + tx.hash);
  console.log("Tx Receipt: " + tx);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
