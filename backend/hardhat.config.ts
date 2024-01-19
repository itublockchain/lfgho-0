import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  defaultNetwork: "sepolia",
  networks: {
    localhost: {
      url: "http://localhost:8545",
      chainId: 1337,
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/b33f1a8a155b4bb6aabfaef79cf5e5d6",
      chainId: 11155111,
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.23",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ]
  }
}
export default config;
