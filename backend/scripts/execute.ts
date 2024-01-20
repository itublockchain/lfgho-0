import { Bytes, BytesLike } from "ethers";
import { ethers } from "hardhat";

import getUserOpHash from "../utils/userOpHash";
import dotenv from "dotenv";

dotenv.config();

type UserOperation = {
  sender: string;
  nonce: string;
  initCode: BytesLike;
  callData: BytesLike;
  callGasLimit: string;
  verificationGasLimit: string;
  preVerificationGas: string;
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
  paymasterAndData: BytesLike;
  signature: BytesLike;
};

const FACTORY_NONCE = 1;
const FACTORY_ADDRESS = process.env.AF_ADDRESS!;
// const EP_ADDRESS = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
const EP_ADDRESS = process.env.EP_ADDRESS!;
const PM_ADDRESS = process.env.PM_ADDRESS!;
const ERC20_ADDRESS = process.env.ERC20_ADDRESS!;
const ACCOUNT_ADDRESS = process.env.ACCOUNT_ADDRESS!;

async function main() {
  const [signer0] = await ethers.getSigners();
  const address0 = await signer0.getAddress();
  // const signer0 = new ethers.Wallet(process.env.PRIVATE_KEY!);
  // const address0 = await signer0.getAddress();

  const entryPoint = await ethers.getContractAt("EntryPoint", EP_ADDRESS);

  const sender = ethers.utils.getContractAddress({
    from: FACTORY_ADDRESS,
    nonce: FACTORY_NONCE,
  });

  const accountFactory = await ethers.getContractFactory("AccountFactory");
  const account = await ethers.getContractFactory("Account");
  const erc20 = await ethers.getContractFactory("GHOToken");

  const initCode =
    FACTORY_ADDRESS +
    accountFactory.interface
      .encodeFunctionData("createAccount", [EP_ADDRESS, address0])
      .slice(2);

  const mintCallData =
    ERC20_ADDRESS +
    erc20.interface
      .encodeFunctionData("mint", [sender, ethers.utils.parseEther("1")])
      .slice(2);

  const approveCallData =
    ERC20_ADDRESS +
    erc20.interface
      .encodeFunctionData("approve", [PM_ADDRESS, ethers.utils.parseEther("1")])
      .slice(2);

  const callCallData =
    ACCOUNT_ADDRESS +
    account.interface
      .encodeFunctionData("execute", [ERC20_ADDRESS, 0, approveCallData])
      .slice(2);

  // await entryPoint.depositTo(sender, { value: ethers.utils.parseEther("1") });
  console.log(
    "Balance: ",
    (await ethers.provider.getBalance(sender)).toString()
  );
  console.log("sender: ", sender);

  // const initUserOp: UserOperation = {
  //   sender: sender,
  //   nonce: (await entryPoint.getNonce(sender, 0))._hex,
  //   initCode: initCode,
  //   callData: "0x",
  //   callGasLimit: ethers.utils.hexlify(200_000),
  //   verificationGasLimit: ethers.utils.hexlify(2_000_000),
  //   preVerificationGas: ethers.utils.hexlify(50_000),
  //   maxFeePerGas: ethers.utils.parseUnits("10", "gwei")._hex,
  //   maxPriorityFeePerGas: ethers.utils.parseUnits("5", "gwei")._hex,
  //   paymasterAndData: "0x",
  //   signature: "0x",
  // };

  const mintUserOp: UserOperation = {
    sender: sender,
    nonce: "0x09", // (await entryPoint.getNonce(sender, 0))._hex
    initCode: "0x",
    callData: mintCallData,
    callGasLimit: ethers.utils.hexlify(200_000),
    verificationGasLimit: ethers.utils.hexlify(1_000_000),
    preVerificationGas: ethers.utils.hexlify(50_000),
    maxFeePerGas: ethers.utils.parseUnits("10", "gwei")._hex,
    maxPriorityFeePerGas: ethers.utils.parseUnits("5", "gwei")._hex,
    paymasterAndData: PM_ADDRESS,
    signature: "0x",
  };

  const approveUserOp: UserOperation = {
    sender: sender,
    nonce: (await entryPoint.getNonce(sender, 0))._hex,
    initCode: "0x",
    callData: callCallData,
    callGasLimit: ethers.utils.hexlify(200_000),
    verificationGasLimit: ethers.utils.hexlify(1_000_000),
    preVerificationGas: ethers.utils.hexlify(50_000),
    maxFeePerGas: ethers.utils.parseUnits("10", "gwei")._hex,
    maxPriorityFeePerGas: ethers.utils.parseUnits("5", "gwei")._hex,
    paymasterAndData: PM_ADDRESS,
    signature: "0x",
  };

  // const userOpHash = getUserOpHash(initUserOp);
  // const userOpSignature = await signer0.signMessage(userOpHash);

  // initUserOp.signature = userOpSignature;

  const mintUserOpHash = getUserOpHash(mintUserOp);
  const mintUserOpSignature = await signer0.signMessage(mintUserOpHash);

  mintUserOp.signature = mintUserOpSignature;

  const approveUserOpHash = getUserOpHash(approveUserOp);
  const approveUserOpSignature = await signer0.signMessage(approveUserOpHash);

  approveUserOp.signature = approveUserOpSignature;

  // console.log("initUserOp: ", initUserOp);
  console.log("mintUserOp: ", mintUserOp);
  console.log("approveUserOp: ", approveUserOp);

  fetch("http://localhost:3000/bundler", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      txs: [
        // initUserOp,
        // mintUserOp,
        approveUserOp
      ],
    }),
  })
    .then((res) => res.json().then((data) => console.log(data)))
    .catch((err) => console.log("Err: " + err));

  // const tx = await entryPoint.handleOps([userOp], address0, {
  //   gasLimit: 30000000,
  // });
  // const receipt = await tx.wait();
  // console.log(receipt);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
