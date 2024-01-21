import { ethers } from "ethers";
import data from "../../constants/data";
import {
  ENTRYPOINT_ABI,
  ACCOUNT_ABI,
  FACTORY_ABI,
  ERC20_ABI,
} from "../../constants/ABI";
import getUserOpHash from "../userOpHash";

export const createAccounts = async (
  address,
  useReadContract,
  writeContract,
  signMessage
) => {
  const address0 = address;

  const entryPoint = await ethers.getContractAt("EntryPoint", data.EP_ADDRESS);

  const sender = ethers.utils.getContractAddress({
    from: data.FACTORY_ADDRESS,
    nonce: data.FACTORY_NONCE,
  });

  const accountFactory = await ethers.utils.Interface(FACTORY_ABI);
  const account = await ethers.utils.Interface(ACCOUNT_ABI);
  const erc20 = await ethers.utils.Interface(ERC20_ABI);

  const initCode =
    FACTORY_ADDRESS +
    accountFactory.interface
      .encodeFunctionData("createAccount", [
        data.EP_ADDRESS,
        address0,
        "0x0bf3de8c5d3e8a2b34d2beeb17abfcebaf363a59",
        "0x779877A7B0D9E8603169DdbD7836e478b4624789",
      ])
      .slice(2);

  const mintCallData =
    ERC20_ADDRESS +
    erc20.interface
      .encodeFunctionData("mint", [sender, ethers.utils.parseEther("1")])
      .slice(2);

  const approveCallData =
    ERC20_ADDRESS +
    erc20.interface
      .encodeFunctionData("approve", [
        data.PM_ADDRESS,
        ethers.utils.parseEther("1"),
      ])
      .slice(2);

  const callCallData =
    ACCOUNT_ADDRESS +
    account.interface
      .encodeFunctionData("execute", [data.ERC20_ADDRESS, 0, approveCallData])
      .slice(2);

  await entryPoint.depositTo(sender, { value: ethers.utils.parseEther("0.1") });

  const initUserOp = {
    sender: sender,
    nonce: (await entryPoint.getNonce(sender, 0))._hex,
    initCode: initCode,
    callData: "0x",
    callGasLimit: ethers.utils.hexlify(200_000),
    verificationGasLimit: ethers.utils.hexlify(2_000_000),
    preVerificationGas: ethers.utils.hexlify(50_000),
    maxFeePerGas: ethers.utils.parseUnits("10", "gwei")._hex,
    maxPriorityFeePerGas: ethers.utils.parseUnits("5", "gwei")._hex,
    paymasterAndData: "0x",
    signature: "0x",
  };

  const mintUserOp = {
    sender: sender,
    nonce: "0x01", // (await entryPoint.getNonce(sender, 0))._hex
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
    sender: sender,
    nonce: "0x02", // (await entryPoint.getNonce(sender, 0))._hex,
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

  const userOpHash = getUserOpHash(initUserOp);
  const userOpSignature = await signMessage(userOpHash);

  initUserOp.signature = userOpSignature;

  const mintUserOpHash = getUserOpHash(mintUserOp);
  const mintUserOpSignature = await signMessage(mintUserOpHash);

  mintUserOp.signature = mintUserOpSignature;

  const approveUserOpHash = getUserOpHash(approveUserOp);
  const approveUserOpSignature = await signMessage(approveUserOpHash);

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
      txs: [initUserOp, mintUserOp, approveUserOp],
    }),
  })
    .then((res) => res.json().then((data) => console.log(data)))
    .catch((err) => console.log("Err: " + err));
};
