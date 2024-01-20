const ethers = require("ethers");
var express = require("express");
var router = express.Router();

const abi = require("../chain/abi");
const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
const signer0 = new ethers.Wallet("ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);

const USEROP_REQUIRED_FIELDS = [
  "sender",
  "nonce",
  "initCode",
  "callData",
  "callGasLimit",
  "verificationGasLimit",
  "preVerificationGas",
  "maxFeePerGas",
  "maxPriorityFeePerGas",
  "paymasterAndData",
  "signature",
];

router.post("/", async function (req, res, next) {
  try {
    if (req.body?.txs == null) {
      return res.status(400).send({
        status: false,
        error: "Missing field txs",
      });
    }

    for (const txIdx in req.body.txs) {
      const tx = req.body.txs[txIdx];
      for (const field of USEROP_REQUIRED_FIELDS) {
        if (tx[field] == undefined) {
          return res.status(400).send({
            status: false,
            error: `Missing field ${field} on tx #${txIdx}`,
          });
        }
      }
    }

    const userOps = req.body.txs;

    const entryPointInterface = new ethers.utils.Interface(abi);
    const entryPointAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    const entryPoint = new ethers.Contract(
      entryPointAddress,
      entryPointInterface,
      signer0
    );

    console.log("Handling operations", userOps);

    
    await entryPoint.handleOps(userOps, signer0.address, {
      gasLimit: 5000000,
    });
    const randomId = Buffer.from(ethers.utils.randomBytes(10)).toString("hex");

    // console.log(`Handle transaction complete: ${handleTx.hash}`);

    res.send({
      status: true,
      jobId: randomId,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      status: false,
      error: e.message,
    });
  }
});

module.exports = router;
