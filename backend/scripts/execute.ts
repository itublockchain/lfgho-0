import { ethers } from "hardhat";

const FACTORY_NONCE = 1;
const FACTORY_ADDRESS = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";
// const EP_ADDRESS = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
const EP_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

async function main() {
  const [signer0] = await ethers.getSigners();
  const address0 = await signer0.getAddress();
  // const signer0 = new ethers.Wallet(process.env.PRIVATE_KEY!);
  // const address0 = await signer0.getAddress();

  const entryPoint = await ethers.getContractAt("EntryPoint", EP_ADDRESS);

  const sender = await ethers.utils.getContractAddress({
    from: FACTORY_ADDRESS,
    nonce: FACTORY_NONCE,
  });

  const accountFactory = await ethers.getContractFactory("AccountFactory");
  const account = await ethers.getContractFactory("Account");

  const initCode =
    FACTORY_ADDRESS +
    accountFactory.interface
      .encodeFunctionData("createAccount", [address0])
      .slice(2);

  const callData = account.interface.encodeFunctionData("increment");

  await entryPoint.depositTo(sender, { value: ethers.utils.parseEther("100") });
  console.log("sender: ", sender);

  const userOp = {
    sender: sender,
    nonce: await entryPoint.getNonce(sender, 0),
    initCode: "0x",
    callData: callData,
    callGasLimit: 200_000,
    verificationGasLimit: 200_000,
    preVerificationGas: 50_000,
    maxFeePerGas: ethers.utils.parseUnits("10", "gwei"),
    maxPriorityFeePerGas: ethers.utils.parseUnits("5", "gwei"),
    paymasterAndData: "0x",
    signature: "0x",
  };

  fetch("http://localhost:3000/bundler", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      txs: [userOp]
    }),
  })
    .then((res) => res.json().then((data) => console.log(data)))
    .catch((err) => console.log("Err: " + err));

  // const tx = await entryPoint.handleOps([userOp], address0, {
  //   gasLimit: 5000000,
  // });
  // const receipt = await tx.wait();
  // console.log(receipt);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
