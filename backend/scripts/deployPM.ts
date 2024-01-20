import { ethers } from "hardhat";
import dotenv from "dotenv";

dotenv.config();

const ERC20_ADDRESS = process.env.ERC20_ADDRESS!;
const EP_ADDRESS = process.env.EP_ADDRESS!;
const ACCOUNT_ADDRESS = process.env.ACCOUNT_ADDRESS!;

async function main() {
  const Pm = await ethers.getContractFactory("Paymaster");
  const pm = await Pm.deploy(ERC20_ADDRESS);

  await pm.deployed();

  console.log(pm.address);

  const ep = await ethers.getContractAt("EntryPoint", EP_ADDRESS)
  ep.depositTo(pm.address, { value: ethers.utils.parseEther("100") }).then(() => console.log("done"));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
