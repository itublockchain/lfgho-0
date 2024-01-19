import { ethers } from "hardhat";

const EP_ADDRESS = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
const ACCOUNT_ADDRESS = "0xc7eB28E5Cbb636Ee45A7FBf7b5Cb85f2ebCA7A1B";

async function main() {

  const account = await ethers.getContractAt("Account", ACCOUNT_ADDRESS);

  const count = await account.count();
  console.log(count.toString());
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
