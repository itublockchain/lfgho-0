import { ethers } from "hardhat";

async function main() {
    const ep = await ethers.getContractAt("EntryPoint", "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789");
    const tx = await ep.depositTo("0xb2c983E321012D6bA61954812288cE86720Aa0CA", { value: ethers.utils.parseEther("1") }).then(() => console.log("done"));

    console.log(tx);
    const depositInfo = await ep.getDepositInfo("0xb2c983E321012D6bA61954812288cE86720Aa0CA");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
