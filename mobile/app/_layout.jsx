import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import "@walletconnect/react-native-compat";
import { WagmiConfig } from "wagmi";
import { mainnet, polygon, arbitrum } from "viem/chains";
import {
  createWeb3Modal,
  defaultWagmiConfig,
  Web3Modal,
} from "@web3modal/wagmi-react-native";

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "262c771eea4450d6fddf9d3cea40a369";

// 2. Create config
const metadata = {
  name: "GHOPPA",
  description:
    "Ghoppa is a wallet for GHO tokens, and it allows you to swap GHO for other tokens.",
  url: "https://itublockchain.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
  redirect: {
    native: "ghoppa://",
    universal: "itublockchain.com",
  },
};

const chains = [mainnet, polygon, arbitrum];

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({
  projectId,
  chains,
  wagmiConfig,
});

export default function RootLayout() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }} />
        <Web3Modal />
      </SafeAreaProvider>
    </WagmiConfig>
  );
}
