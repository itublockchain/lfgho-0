import { ethers } from "hardhat";
import { getUserOpHash } from "../utils";
import dotenv from "dotenv";

dotenv.config();

const ERC20_ADDRESS = process.env.ERC20_ADDRESS!;
const EP_ADDRESS = process.env.EP_ADDRESS!;
const FACTORY_ADDRESS = process.env.AF_ADDRESS!;
const ACCOUNT_ADDRESS = process.env.ACCOUNT_ADDRESS!;
const PAYMASTER_ADDRESS = process.env.PM_ADDRESS!;

async function main() {
  const [signer0] = await ethers.getSigners();
  const address0 = await signer0.getAddress();

  const entryPoint = await ethers.getContractAt("EntryPoint", EP_ADDRESS);

  const erc20 = await ethers.getContractAt("GHOToken", ERC20_ADDRESS);

  console.log("Balance: ", (await erc20.balanceOf(ACCOUNT_ADDRESS)).toString());

  const erc20Factory = await ethers.getContractFactory("GHOToken");
  const account = await ethers.getContractFactory("Account");
  const approveCallData = erc20Factory.interface.encodeFunctionData("approve", [
    PAYMASTER_ADDRESS,
    ethers.utils.parseEther("1000"),
  ]);

  const callCallData = account.interface.encodeFunctionData("execute", [
    ERC20_ADDRESS,
    0,
    approveCallData,
  ]);

  const mintCallData = erc20Factory.interface.encodeFunctionData("mint", [
    ACCOUNT_ADDRESS,
    ethers.utils.parseEther("1"),
  ]);

  const mintUserOp = {
    sender: ACCOUNT_ADDRESS,
    nonce: "0x07",
    initCode: "0x",
    callData: mintCallData,
    callGasLimit: ethers.utils.hexlify(200_000),
    verificationGasLimit: ethers.utils.hexlify(1_000_000),
    preVerificationGas: ethers.utils.hexlify(50_000),
    maxFeePerGas: ethers.utils.parseUnits("10", "gwei")._hex,
    maxPriorityFeePerGas: ethers.utils.parseUnits("5", "gwei")._hex,
    paymasterAndData: "0x",
    signature: "0x",
  };

  const approveUserOp = {
    sender: ACCOUNT_ADDRESS,
    nonce: "0x08", 
    // (await entryPoint.getNonce(ACCOUNT_ADDRESS, 0))._hex,
    initCode: "0x",
    callData: callCallData,
    callGasLimit: ethers.utils.hexlify(200_000),
    verificationGasLimit: ethers.utils.hexlify(1_000_000),
    preVerificationGas: ethers.utils.hexlify(50_000),
    maxFeePerGas: ethers.utils.parseUnits("10", "gwei")._hex,
    maxPriorityFeePerGas: ethers.utils.parseUnits("5", "gwei")._hex,
    paymasterAndData: "0x",
    signature: "0x",
  };

  const approveUserOpHash = getUserOpHash(approveUserOp);
  approveUserOp.signature = await signer0.signMessage(
    ethers.utils.arrayify(approveUserOpHash)
  );

  const mintUserOpHash = getUserOpHash(mintUserOp);
  mintUserOp.signature = await signer0.signMessage(
    ethers.utils.arrayify(mintUserOpHash)
  );

  fetch("http://localhost:3000/bundler", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      txs: [mintUserOp, approveUserOp],
    }),
  })
    .then((res) => res.json().then((data) => console.log(data)))
    .catch((err) => console.log("Err: " + err));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
