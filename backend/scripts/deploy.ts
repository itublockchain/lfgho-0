import { ethers } from "hardhat";

async function main() {

  const Af = await ethers.getContractFactory("AccountFactory");
  const af = await Af.deploy();

  await af.deployed();

  console.log("Account Factory: " + af.address);

  const Ep = await ethers.getContractFactory("EntryPoint");
  const ep = await Ep.deploy();

  await ep.deployed();

  console.log("Entry Point: " + ep.address);

  const [signer0] = await ethers.getSigners();
  const address0 = await signer0.getAddress();

  const Erc20 = await ethers.getContractFactory("GHOToken");
  const erc20 = await Erc20.deploy();

  await erc20.deployed();

  console.log("ERC20: " + erc20.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
