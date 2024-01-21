const ethers = require("ethers");
var express = require("express");
var router = express.Router();

require("dotenv").config();

const { PRIVATE_KEY } = process.env;

const abi = require("../chain/abi");
const provider = new ethers.providers.JsonRpcProvider("https://base-goerli.public.blastapi.io");
const signer0 = new ethers.Wallet(PRIVATE_KEY, provider);

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
    const entryPointAddress = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
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
