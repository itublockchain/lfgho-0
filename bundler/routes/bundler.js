const ethers = require("ethers");
var express = require("express");
var router = express.Router();

const abi = require("../chain/abi");
const { signer0, provider } = require("../chain/provider");

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
  console.log(req.body);
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
    const entryPointAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
    const entryPoint = new ethers.Contract(
      entryPointAddress,
      entryPointInterface,
      signer0
    );

    console.log("Handling operations", userOps);

    const handleTx = await entryPoint.handleOps([userOps], signer0.address);
    const randomId = Buffer.from(ethers.utils.randomBytes(10)).toString("hex");

    console.log(`Handle transaction complete: ${handleTx.hash}`);

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
