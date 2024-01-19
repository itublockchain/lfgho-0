import { ethers } from "hardhat";

async function main() {

  const Af = await ethers.getContractFactory("AccountFactory");
  const af = await Af.deploy();

  await af.deployed();

  console.log(af.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
