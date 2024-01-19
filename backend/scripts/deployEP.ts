import { ethers } from "hardhat";

async function main() {

  const Lock = await ethers.getContractFactory("EntryPoint");
  const lock = await Lock.deploy();

  await lock.deployed();

  console.log(lock.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
