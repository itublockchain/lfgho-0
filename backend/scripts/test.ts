import { ethers } from "hardhat";
import dotenv from "dotenv";

dotenv.config();

const EP_ADDRESS = process.env.EP_ADDRESS!;
const ACCOUNT_ADDRESS = process.env.ACCOUNT_ADDRESS!;
const PM_ADDRESS = process.env.PM_ADDRESS!;
const ERC20_ADDRESS = process.env.ERC20_ADDRESS!;

async function main() {
  const [signer0] = await ethers.getSigners();
  const address0 = await signer0.getAddress();

  const account = await ethers.getContractAt("Account", ACCOUNT_ADDRESS);
  const entryPoint = await ethers.getContractAt("EntryPoint", EP_ADDRESS);

  const accountDeposit = await entryPoint.balanceOf(ACCOUNT_ADDRESS);

  const erc20 = await ethers.getContractAt("GHOToken", ERC20_ADDRESS);
  const paymasterTokenValue = await erc20.balanceOf(PM_ADDRESS);

  await erc20.mint(ACCOUNT_ADDRESS, ethers.utils.parseEther("100"));
  console.log("Account Token Value: " + (await erc20.balanceOf(ACCOUNT_ADDRESS)).toString());
  console.log("Paymaster Token Value: " + paymasterTokenValue.toString());

  // await entryPoint.depositTo(PM_ADDRESS, { value: ethers.utils.parseEther("100") })
  const pmDeposit = await entryPoint.balanceOf(PM_ADDRESS);

  console.log("Account Deposits: " + accountDeposit.toString());
  console.log("PM Deposits: " + pmDeposit.toString());
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
